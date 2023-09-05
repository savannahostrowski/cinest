export interface Movie {
    id: string;
    title: string;
    plot: string;
    genre: string;
    poster: string;
    year: string;
    runtime: string;
    rating: Rating[];
    cast: string;
}

export interface Rating {
    Source: string;
    Value: string;
}
