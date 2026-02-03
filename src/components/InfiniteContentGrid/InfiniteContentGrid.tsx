'use client';

import { useState } from 'react';
import { ContentItem, CategoryType } from '@/types';
import ContentGrid from '@/components/ContentGrid/ContentGrid';
import { loadMoreContent } from '@/app/actions';
import styles from './InfiniteContentGrid.module.css';

interface InfiniteContentGridProps {
    initialItems: ContentItem[];
    category: CategoryType;
}

export default function InfiniteContentGrid({ initialItems, category }: InfiniteContentGridProps) {
    const [items, setItems] = useState<ContentItem[]>(initialItems);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const nextPage = page + 1;
            const res = await loadMoreContent(category, nextPage);

            if (res && res.items.length > 0) {
                setItems((prev) => [...prev, ...res.items]);
                setPage(nextPage);
                setHasMore(res.hasMore !== false); // Default to true if hasMore is not explicitly false
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load more:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <ContentGrid items={items} />

            {hasMore && (
                <div className={styles.loadMoreWrapper}>
                    <button
                        onClick={handleLoadMore}
                        className={styles.loadMoreBtn}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className={styles.spinner}></div>
                                Memuat...
                            </>
                        ) : (
                            'Muat Lebih Banyak'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
