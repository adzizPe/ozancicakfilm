import { Suspense } from 'react';
import { Metadata } from 'next';
import { searchContent } from '@/lib/api';
import ContentGrid from '@/components/ContentGrid/ContentGrid';
import LoadingSkeleton from '@/components/LoadingSkeleton/LoadingSkeleton';
import styles from './page.module.css';

interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: q ? `Hasil pencarian "${q}" - ZanStream` : 'Pencarian - ZanStream',
        description: q ? `Hasil pencarian untuk "${q}" di ZanStream` : 'Cari film dan series favoritmu di ZanStream',
    };
}

async function SearchResults({ query }: { query: string }) {
    const data = await searchContent(query);

    return (
        <div className={styles.results}>
            {data.items.length > 0 ? (
                <>
                    <p className={styles.resultCount}>
                        Ditemukan <strong>{data.items.length}</strong> hasil untuk &quot;{query}&quot;
                    </p>
                    <ContentGrid items={data.items} />
                </>
            ) : (
                <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>🔍</div>
                    <h2>Tidak ditemukan hasil</h2>
                    <p>Tidak ada konten yang cocok dengan &quot;{query}&quot;</p>
                    <p className={styles.tips}>Tips: Coba kata kunci yang berbeda atau lebih umum</p>
                </div>
            )}
        </div>
    );
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q: query } = await searchParams;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {query ? `Hasil Pencarian` : 'Pencarian'}
                </h1>
                {query && (
                    <p className={styles.query}>untuk &quot;{query}&quot;</p>
                )}
            </div>

            {query ? (
                <Suspense fallback={<LoadingSkeleton type="card" count={8} />}>
                    <SearchResults query={query} />
                </Suspense>
            ) : (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>🎬</div>
                    <h2>Cari Film & Series</h2>
                    <p>Gunakan search bar di atas untuk mencari konten favoritmu</p>
                </div>
            )}
        </div>
    );
}
