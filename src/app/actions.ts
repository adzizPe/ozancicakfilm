'use server';

import { getCategory } from '@/lib/api';
import { CategoryType } from '@/types';

export async function loadMoreContent(category: CategoryType, page: number) {
    try {
        const data = await getCategory(category, page);
        return data;
    } catch (error) {
        console.error('Error loading more content:', error);
        return null;
    }
}
