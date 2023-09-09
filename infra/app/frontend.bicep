param name string
param location string = resourceGroup().location
param tags object = {}

param identityName string
param containerRegistryName string
param containerAppsEnvironmentName string
param applicationInsightsName string
param apiUrls array
param exists bool

resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: identityName
  location: location
}

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2022-02-01-preview' existing = {
  name: containerRegistryName
}

resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2023-04-01-preview' existing = {
  name: containerAppsEnvironmentName
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

resource acrPullRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: containerRegistry
  name: guid(subscription().id, resourceGroup().id, identity.id, 'acrPullRole')
  properties: {
    roleDefinitionId:  subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')
    principalType: 'ServicePrincipal'
    principalId: identity.properties.principalId
  }
}

module fetchLatestImage '../lib/fetch-container-image.bicep' = {
  name: '${name}-fetch-image'
  params: {
    exists: exists
    name: name
  }
}

resource app 'Microsoft.App/containerApps@2023-04-01-preview' = {
  name: name
  location: location
  tags: union(tags, {'azd-service-name':  'frontend' })
  dependsOn: [ acrPullRole ]
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: { '${identity.id}': {} }
  }
  properties: {
    managedEnvironmentId: containerAppsEnvironment.id
    configuration: {
      ingress:  {
        external: true
        targetPort:5173
        transport: 'auto'
        customDomains: [
          {
            name: 'cinest.xyz'
            certificateId: managedCertificate.id
            bindingType: 'SniEnabled'
          }
        ]
      }
      registries: [
        {
          server: '${containerRegistryName}.azurecr.io'
          identity: identity.id
        }
      ]
      secrets: [
      ]
    }
    template: {
      containers: [
        {
          image: fetchLatestImage.outputs.?containers[?0].?image ?? 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          name: 'main'
          env: [
            {
              name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
              value: applicationInsights.properties.ConnectionString
            }
            {
              name: 'API_BASE_URL'
              value: apiUrls[0]
            }
            {
              name: 'PORT'
              value: '8080'
            }
          ]
          resources: {
            cpu: json('1.0')
            memory: '2.0Gi'
          }
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 10
      }
    }
  }
}

resource managedCertificate 'Microsoft.App/managedEnvironments/managedCertificates@2022-11-01-preview' existing = {
  name: 'cinest.xyz-cae-yuej-230909041906'
  parent: containerAppsEnvironment
}

output defaultDomain string = containerAppsEnvironment.properties.defaultDomain
output name string = app.name
output uri string = 'https://${app.properties.configuration.ingress.fqdn}'
output id string = app.id
