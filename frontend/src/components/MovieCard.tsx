import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    createStyles,
    rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        maxWidth: '442px',
        marginBottom: theme.spacing.md,
    },
    section: {
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
        textAlign: 'left',
        gap: 0
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));


interface MovieCardProps {
    poster: string;
    title: string;
    ratings: Rating[];
    plot: string;
}

interface Rating {
    Source: string;
    Value: string;
}


export function MovieCard({ poster, title, plot, ratings }: MovieCardProps) {
    const { classes } = useStyles();

    const reviews = ratings.map((rating) => {
        if (rating.Source === "Internet Movie Database") {
            return (
                <Badge key={rating.Source} color="violet">
                    imdB: {rating.Value}
                </Badge>
            )
        }

        if (rating.Source === "Rotten Tomatoes") {
            return (
                <Badge key={rating.Source} color="grape">
                    RT: {rating.Value}
                </Badge>
            )
        }

        if (rating.Source === "Metacritic") {
            return (
                <Badge key={rating.Source} color="blue">
                    MC: {rating.Value}
                </Badge>
            )
        }
    });

    return (
        // Add a style to make the maxheight of  30vh
        <Card withBorder radius="md" p="md" className={classes.card} >
            <Card.Section>
                <Image src={poster} alt={title} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group position="apart">
                    <Text fz="lg" fw={500}>
                        {title}
                    </Text>
                    <div>
                        {reviews}
                    </div>
                </Group>
                <Text fz="sm" mt="xs">
                    {plot}
                </Text>
            </Card.Section>
        </Card>
    );
}