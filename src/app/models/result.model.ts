export interface OMDBResult {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

export interface OMDBResponse {
    Search: OMDBResult[];
    totalResults: string;
}

export interface RARBGResult {
    filename: string;
    category: string;
    download: string;
}

export interface RARBGResponse {
    torrent_results: RARBGResult[];
}

export interface RARBGToken {
    token: string;
}
