import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDetail, getCategory } from '@/lib/api';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import ContentRow from '@/components/ContentRow/ContentRow';
import LoadingSkeleton from '@/components/LoadingSkeleton/LoadingSkeleton';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const response = await getDetail(slug);

    if (!response?.success) {
        return { title: 'Not Found - ZanStream' };
    }

    const { data } = response;

    return {
        title: `${data.title} (${data.year}) - ZanStream`,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            images: [data.poster],
            type: 'video.movie',
        },
    };
}

export default async function DetailPage({ params }: PageProps) {
    const { slug } = await params;
    const response = await getDetail(slug);

    if (!response?.success || !response.data) {
        notFound();
    }

    const { data } = response;

    // Get related content
    const relatedCategory = data.type === 'movie' ? 'indonesian-movies' : 'kdrama';
    const relatedData = await getCategory(relatedCategory, 1);

    // Format duration
    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}j ${minutes}m`;
        }
        return `${minutes}m`;
    };

    return (
        <div className={styles.page}>
            {/* Backdrop */}
            <div className={styles.backdrop}>
                <Image
                    src={data.poster}
                    alt={data.title}
                    fill
                    priority
                    className={styles.backdropImg}
                    sizes="100vw"
                />
                <div className={styles.overlay}></div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.container}>
                    {/* Left: Poster */}
                    <div className={styles.posterWrapper}>
                        <Image
                            src={data.poster}
                            alt={data.title}
                            fill
                            priority
                            className={styles.poster}
                            sizes="(max-width: 768px) 50vw, 300px"
                        />
                    </div>

                    {/* Right: Info */}
                    <div className={styles.info}>
                        {/* Badges */}
                        <div className={styles.badges}>
                            <span className={styles.typeBadge}>
                                {data.type === 'movie' ? '🎬 Film' : '📺 Series'}
                            </span>
                            <span className={styles.yearBadge}>{data.year}</span>
                            {data.country && (
                                <span className={styles.countryBadge}>{data.country}</span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className={styles.title}>{data.title}</h1>

                        {/* Meta */}
                        <div className={styles.meta}>
                            <span className={styles.rating}>⭐ {data.rating}</span>
                            {data.duration && data.duration > 0 && (
                                <span className={styles.duration}>🕐 {formatDuration(data.duration)}</span>
                            )}
                            {data.releaseDate && (
                                <span className={styles.releaseDate}>📅 {data.releaseDate}</span>
                            )}
                        </div>

                        {/* Genres */}
                        <div className={styles.genres}>
                            {data.genre.split(',').map((genre, i) => (
                                <span key={i} className={styles.genre}>{genre.trim()}</span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className={styles.description}>{data.description}</p>

                        {/* Subtitles */}
                        {data.subtitles && (
                            <div className={styles.subtitles}>
                                <span className={styles.label}>Subtitle:</span>
                                <span>{data.subtitles.split(',').slice(0, 5).join(', ')}</span>
                                {data.subtitles.split(',').length > 5 && (
                                    <span className={styles.more}>+{data.subtitles.split(',').length - 5} lainnya</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Video Player */}
                {data.playerUrl && (
                    <section className={styles.playerSection}>
                        <h2 className={styles.sectionTitle}>🎬 Tonton Sekarang</h2>
                        <VideoPlayer playerUrl={data.playerUrl} title={data.title} />
                    </section>
                )}

                {/* Cast */}
                {data.cast && data.cast.length > 0 && (
                    <section className={styles.castSection}>
                        <h2 className={styles.sectionTitle}>🎭 Pemeran</h2>
                        <div className={styles.castGrid}>
                            {data.cast.slice(0, 10).map((member, i) => (
                                <div key={i} className={styles.castCard}>
                                    <div className={styles.castAvatar}>
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            fill
                                            className={styles.castImg}
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className={styles.castInfo}>
                                        <span className={styles.castName}>{member.name}</span>
                                        <span className={styles.castCharacter}>{member.character}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Seasons & Episodes for TV Series */}
                {data.type === 'tv' && data.seasons && data.seasons.length > 0 && (
                    <section className={styles.episodesSection}>
                        <h2 className={styles.sectionTitle}>📺 Episode</h2>
                        {data.seasons.map((season, seasonIndex) => (
                            <div key={seasonIndex} className={styles.season}>
                                <h3 className={styles.seasonTitle}>Season {season.seasonNumber}</h3>
                                <div className={styles.episodeGrid}>
                                    {season.episodes.map((episode, epIndex) => (
                                        <div key={epIndex} className={styles.episodeCard}>
                                            <div className={styles.episodeNumber}>EP {episode.episodeNumber}</div>
                                            <div className={styles.episodeInfo}>
                                                <span className={styles.episodeTitle}>{episode.title || `Episode ${episode.episodeNumber}`}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Related Content */}
                {relatedData.items.length > 0 && (
                    <Suspense fallback={<LoadingSkeleton type="row" />}>
                        <ContentRow
                            title="🎬 Mungkin Kamu Suka"
                            items={relatedData.items.filter(item => item.detailPath !== slug).slice(0, 10)}
                            showViewAll={false}
                        />
                    </Suspense>
                )}
            </div>
        </div>
    );
}
