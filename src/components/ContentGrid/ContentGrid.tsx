import styles from './ContentGrid.module.css';
import ContentCard from '@/components/ContentCard/ContentCard';
import { ContentItem } from '@/types';

interface ContentGridProps {
    items: ContentItem[];
}

export default function ContentGrid({ items }: ContentGridProps) {
    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>🎬</div>
                <h3>Tidak ada konten ditemukan</h3>
                <p>Coba kata kunci lain atau jelajahi kategori lainnya</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {items.map((item, index) => (
                <ContentCard key={item.id} item={item} priority={index < 8} />
            ))}
        </div>
    );
}
