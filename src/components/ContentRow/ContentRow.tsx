'use client';

import { useRef } from 'react';
import Link from 'next/link';
import styles from './ContentRow.module.css';
import ContentCard from '@/components/ContentCard/ContentCard';
import { ContentItem, CategoryType } from '@/types';

interface ContentRowProps {
    title: string;
    items: ContentItem[];
    category?: CategoryType;
    showViewAll?: boolean;
}

export default function ContentRow({ title, items, category, showViewAll = true }: ContentRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const scrollAmount = rowRef.current.clientWidth * 0.8;
            rowRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (items.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {showViewAll && category && (
                    <Link href={`/category/${category}`} className={styles.viewAll}>
                        Lihat Semua
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </Link>
                )}
            </div>

            <div className={styles.rowWrapper}>
                <button
                    className={`${styles.scrollBtn} ${styles.scrollLeft}`}
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div ref={rowRef} className={`${styles.row} hide-scrollbar`}>
                    {items.map((item, index) => (
                        <div key={item.id} className={styles.cardWrapper}>
                            <ContentCard item={item} priority={index < 4} />
                        </div>
                    ))}
                </div>

                <button
                    className={`${styles.scrollBtn} ${styles.scrollRight}`}
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
