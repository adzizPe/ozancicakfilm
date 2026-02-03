import { ContentListResponse, ContentDetailResponse, CategoryType } from '@/types';

const API_BASE_URL = 'https://zeldvorik.ru/apiv3/api.php';

// Fetch content by category
export async function getCategory(category: CategoryType, page: number = 1): Promise<ContentListResponse> {
    try {
        console.log(`Fetching category: ${category}, page: ${page}`);
        const res = await fetch(`${API_BASE_URL}?action=${category}&page=${page}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            console.error(`Fetch failed for ${category}: ${res.status} ${res.statusText}`);
            throw new Error(`Failed to fetch ${category}`);
        }

        const data = await res.json();
        console.log(`Success fetch ${category}: found ${data.items?.length || 0} items`);
        return data;
    } catch (error) {
        console.error(`Error fetching ${category}:`, error);
        return { success: false, items: [], page: 1, hasMore: false };
    }
}

// Fetch trending content
export async function getTrending(page: number = 1): Promise<ContentListResponse> {
    return getCategory('trending', page);
}

// Search content
export async function searchContent(query: string): Promise<ContentListResponse> {
    try {
        const res = await fetch(`${API_BASE_URL}?action=search&q=${encodeURIComponent(query)}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error('Search failed');
        }

        return res.json();
    } catch (error) {
        console.error('Search error:', error);
        return { success: false, items: [], page: 1, hasMore: false };
    }
}

// Fetch content detail
export async function getDetail(detailPath: string): Promise<ContentDetailResponse | null> {
    try {
        const res = await fetch(`${API_BASE_URL}?action=detail&detailPath=${encodeURIComponent(detailPath)}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch detail');
        }

        return res.json();
    } catch (error) {
        console.error('Detail fetch error:', error);
        return null;
    }
}

// Categories data
export const CATEGORIES: { id: CategoryType; title: string }[] = [
    { id: 'trending', title: 'Trending' },
    { id: 'indonesian-movies', title: 'Film Indonesia' },
    { id: 'indonesian-drama', title: 'Drama Indonesia' },
    { id: 'kdrama', title: 'K-Drama' },
    { id: 'anime', title: 'Anime' },
    { id: 'short-tv', title: 'Short TV' },
    { id: 'adult-comedy', title: 'Canda Dewasa' },
    { id: 'western-tv', title: 'Western TV' },
    { id: 'indo-dub', title: 'Indo Dub' },
];

// Get category title
export function getCategoryTitle(category: CategoryType): string {
    const cat = CATEGORIES.find(c => c.id === category);
    return cat?.title || category;
}
