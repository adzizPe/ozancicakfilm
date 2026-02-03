import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategory, getCategoryTitle, CATEGORIES } from '@/lib/api';
import { CategoryType } from '@/types';
import InfiniteContentGrid from '@/components/InfiniteContentGrid/InfiniteContentGrid';
import LoadingSkeleton from '@/components/LoadingSkeleton/LoadingSkeleton';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ category: string }>;
}

const validCategories = CATEGORIES.map(c => c.id);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const title = getCategoryTitle(category as CategoryType);

    return {
        title: `${title} - ZanStream`,
        description: `Koleksi ${title} terbaik dan terbaru di ZanStream. Nonton sekarang!`,
    };
}

// Force dynamic rendering to handle slow API and avoid build timeouts
export const dynamic = 'force-dynamic';


async function CategoryContent({ category }: { category: CategoryType }) {
    const data = await getCategory(category, 1);

    return <InfiniteContentGrid initialItems={data.items} category={category} />;
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;

    // Validate category
    if (!validCategories.includes(category as CategoryType)) {
        notFound();
    }

    const categoryType = category as CategoryType;
    const title = getCategoryTitle(categoryType);

    // Get category icon
    const icons: Record<CategoryType, string> = {
        'trending': '🔥',
        'indonesian-movies': '🇮🇩',
        'indonesian-drama': '🎭',
        'kdrama': '🇰🇷',
        'anime': '🎌',
        'short-tv': '📱',
        'adult-comedy': '😂',
        'western-tv': '🌍',
        'indo-dub': '🎙️',
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.icon}>{icons[categoryType]}</span>
                    {title}
                </h1>
                <p className={styles.subtitle}>
                    Koleksi {title} terbaik dan terbaru untukmu
                </p>
            </div>

            <Suspense fallback={<LoadingSkeleton type="card" count={12} />}>
                <CategoryContent category={categoryType} />
            </Suspense>
        </div>
    );
}
