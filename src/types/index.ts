// Content Item interface for list/grid display
export interface ContentItem {
    id: string;
    title: string;
    poster: string;
    rating: string;
    year: string;
    type: 'movie' | 'tv';
    detailPath: string;
    genre: string;
    description?: string;
    country?: string;
}

// API Response for list endpoints
export interface ContentListResponse {
    success: boolean;
    category?: string;
    items: ContentItem[];
    page: number;
    hasMore: boolean;
}

// Cast member
export interface CastMember {
    name: string;
    character: string;
    avatar: string;
}

// Episode
export interface Episode {
    id: string;
    episodeNumber: number;
    title: string;
    thumbnail?: string;
    duration?: number;
    playerUrl?: string;
}

// Season
export interface Season {
    seasonNumber: number;
    episodes: Episode[];
}

// Detail Content
export interface ContentDetail {
    id: string;
    title: string;
    poster: string;
    rating: string;
    year: string;
    type: 'movie' | 'tv';
    genre: string;
    description: string;
    duration?: number;
    releaseDate?: string;
    country?: string;
    subtitles?: string;
    detailPath: string;
    cast: CastMember[];
    seasons: Season[];
    totalSeasons: number;
    trailerUrl?: string;
    playerUrl?: string;
}

// API Response for detail endpoint
export interface ContentDetailResponse {
    success: boolean;
    data: ContentDetail;
}

// Category type
export type CategoryType =
    | 'trending'
    | 'indonesian-movies'
    | 'indonesian-drama'
    | 'kdrama'
    | 'short-tv'
    | 'anime'
    | 'adult-comedy'
    | 'western-tv'
    | 'indo-dub';

// Category info for display
export interface CategoryInfo {
    id: CategoryType;
    title: string;
    icon?: string;
}
