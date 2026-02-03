import styles from './LoadingSkeleton.module.css';

interface LoadingSkeletonProps {
    type: 'card' | 'hero' | 'row';
    count?: number;
}

export default function LoadingSkeleton({ type, count = 1 }: LoadingSkeletonProps) {
    if (type === 'hero') {
        return (
            <div className={styles.heroSkeleton}>
                <div className={styles.heroContent}>
                    <div className={`${styles.skeletonBadge} skeleton`}></div>
                    <div className={`${styles.skeletonTitle} skeleton`}></div>
                    <div className={`${styles.skeletonMeta} skeleton`}></div>
                    <div className={`${styles.skeletonDesc} skeleton`}></div>
                    <div className={styles.skeletonActions}>
                        <div className={`${styles.skeletonBtn} skeleton`}></div>
                        <div className={`${styles.skeletonBtn} skeleton`}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'row') {
        return (
            <div className={styles.rowSkeleton}>
                <div className={`${styles.skeletonRowTitle} skeleton`}></div>
                <div className={styles.skeletonCards}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={styles.cardSkeleton}>
                            <div className={`${styles.skeletonImage} skeleton`}></div>
                            <div className={styles.skeletonInfo}>
                                <div className={`${styles.skeletonCardTitle} skeleton`}></div>
                                <div className={`${styles.skeletonCardMeta} skeleton`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cardsGrid}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={styles.cardSkeleton}>
                    <div className={`${styles.skeletonImage} skeleton`}></div>
                    <div className={styles.skeletonInfo}>
                        <div className={`${styles.skeletonCardTitle} skeleton`}></div>
                        <div className={`${styles.skeletonCardMeta} skeleton`}></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
