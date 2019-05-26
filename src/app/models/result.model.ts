export interface OMDBResult {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

export interface FullOMDBResult {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings?: (RatingsEntity)[] | null;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface RatingsEntity {
    Source: string;
    Value: string;
}


export interface OMDBResponse {
    Search: OMDBResult[];
    totalResults: string;
}

export interface RARBGResult {
    title: string;
    category: string;
    download: string;
    seeders: number;
    leechers: number;
    size: number;
    pubdate: string;
    episode_info: EpisodeInfo;
    ranked: number;
    info_page: string;
  }
export interface EpisodeInfo {
    imdb: string;
    tvrage: string;
    tvdb: string;
    themoviedb: string;
    airdate: string;
    epnum: string;
    seasonnum: string;
    title: string;
  }

export interface RARBGResponse {
    torrent_results: RARBGResult[];
}

export interface RARBGToken {
    token: string;
}
