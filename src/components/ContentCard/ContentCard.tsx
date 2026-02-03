import Link from 'next/link';
import Image from 'next/image';
import styles from './ContentCard.module.css';
import { ContentItem } from '@/types';

interface ContentCardProps {
    item: ContentItem;
    priority?: boolean;
}

export default function ContentCard({ item, priority = false }: ContentCardProps) {
    return (
        <Link href={`/detail/${item.detailPath}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={item.poster}
                    alt={item.title}
                    className={styles.image}
                    loading={priority ? "eager" : "lazy"}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <div className={styles.overlay}>
                    <div className={styles.playButton}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Rating Badge */}
                <div className={styles.ratingBadge}>
                    ⭐ {item.rating}
                </div>

                {/* Type Badge */}
                <div className={styles.typeBadge}>
                    {item.type === 'movie' ? '🎬' : '📺'}
                </div>
            </div>

            <div className={styles.info}>
                <h3 className={styles.title}>{item.title}</h3>
                <div className={styles.meta}>
                    <span className={styles.year}>{item.year}</span>
                    <span className={styles.genre}>{item.genre?.split(',')[0]}</span>
                </div>
            </div>
        </Link>
    );
}
