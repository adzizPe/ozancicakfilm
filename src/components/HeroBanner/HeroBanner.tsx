'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroBanner.module.css';
import { ContentItem } from '@/types';

interface HeroBannerProps {
    items: ContentItem[];
}

export default function HeroBanner({ items }: HeroBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const featuredItems = items.slice(0, 5);

    useEffect(() => {
        if (featuredItems.length <= 1) return;

        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
                setIsAnimating(false);
            }, 500);
        }, 6000);

        return () => clearInterval(interval);
    }, [featuredItems.length]);

    const goToSlide = (index: number) => {
        if (index === currentIndex) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsAnimating(false);
        }, 300);
    };

    if (featuredItems.length === 0) return null;

    const currentItem = featuredItems[currentIndex];

    return (
        <section className={styles.hero}>
            {/* Background Image */}
            <div className={`${styles.backdrop} ${isAnimating ? styles.fadeOut : ''}`}>
                <Image
                    src={currentItem.poster}
                    alt={currentItem.title}
                    fill
                    priority
                    className={styles.backdropImg}
                    sizes="100vw"
                />
                <div className={styles.gradientOverlay}></div>
                <div className={styles.sideGradient}></div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={`${styles.info} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
                    {/* Type Badge */}
                    <div className={styles.badges}>
                        <span className={styles.typeBadge}>
                            {currentItem.type === 'movie' ? '🎬 Film' : '📺 Series'}
                        </span>
                        <span className={styles.yearBadge}>{currentItem.year}</span>
                    </div>

                    {/* Title */}
                    <h1 className={styles.title}>{currentItem.title}</h1>

                    {/* Meta Info */}
                    <div className={styles.meta}>
                        <span className={styles.rating}>
                            ⭐ {currentItem.rating}
                        </span>
                        <span className={styles.genre}>{currentItem.genre}</span>
                    </div>

                    {/* Description */}
                    {currentItem.description && (
                        <p className={styles.description}>{currentItem.description}</p>
                    )}

                    {/* Actions */}
                    <div className={styles.actions}>
                        <Link href={`/detail/${currentItem.detailPath}`} className={styles.playBtn}>
                            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Tonton Sekarang
                        </Link>
                        <Link href={`/detail/${currentItem.detailPath}`} className={styles.infoBtn}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            Info Detail
                        </Link>
                    </div>
                </div>

                {/* Dots Navigation */}
                {featuredItems.length > 1 && (
                    <div className={styles.dots}>
                        {featuredItems.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
