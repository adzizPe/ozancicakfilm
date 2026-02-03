import { Suspense } from 'react';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import ContentRow from '@/components/ContentRow/ContentRow';
import LoadingSkeleton from '@/components/LoadingSkeleton/LoadingSkeleton';
import { getCategory, searchContent } from '@/lib/api';
import { CategoryType, ContentItem } from '@/types';

// Switch to dynamic rendering to avoid build timeouts due to many API calls
export const dynamic = 'force-dynamic';

async function getHomeData() {
  const categories: { id: CategoryType; title: string }[] = [
    { id: 'trending', title: 'Trending Sekarang' },
    { id: 'indonesian-movies', title: 'Film Indonesia' },
    { id: 'kdrama', title: 'K-Drama Terbaru' },
    { id: 'anime', title: 'Anime' },
    { id: 'indonesian-drama', title: 'Drama Indonesia' },
    { id: 'short-tv', title: 'Short TV' },
    { id: 'western-tv', title: 'Western TV' },
    { id: 'adult-comedy', title: 'Canda Dewasa' },
    { id: 'indo-dub', title: 'Indo Dub' },
  ];

  const results = await Promise.all(
    categories.map(async (cat) => ({
      category: cat,
      data: await getCategory(cat.id, 1)
    }))
  );

  return results;
}

// Fetch featured content by search to fill up categories
async function getBonusContent() {
  // Define queries per category target
  const indoQueries = [
    'mens rea', 'pandji', 'cursed', 'believe', 'gak nyangka', 'tenung',
    'assalamu', 'kiblat', 'jodoh', 'la tahzan', 'jumbo', 'perang kota',
    'panji', 'leak', 'doti', 'lyora', 'rego nyowo', 'lupa daratan', 'aip'
  ];

  const otherQueries = [
    'horror', 'action', 'marvel', 'thriller', 'romance', 'korea'
  ];

  const [indoResults, otherResults] = await Promise.all([
    Promise.all(indoQueries.map(q => searchContent(q))),
    Promise.all(otherQueries.map(q => searchContent(q)))
  ]);

  const indoItems = Array.from(new Map(indoResults.flatMap(r => r.items).map(i => [i.id, i])).values());
  const otherItems = Array.from(new Map(otherResults.flatMap(r => r.items).map(i => [i.id, i])).values());

  return { indoItems, otherItems };
}

export default async function HomePage() {
  const [homeDataResults, { indoItems, otherItems }] = await Promise.all([
    getHomeData(),
    getBonusContent()
  ]);

  // Distribute bonus items into categories
  const enrichedHomeData = homeDataResults.map(({ category, data }) => {
    let extraItems: ContentItem[] = [];

    // Logic to distribute items to relevant categories
    if (category.id === 'indonesian-movies') {
      // Add ALL items from Indonesian queries specifically
      extraItems = indoItems.filter(item => item.type === 'movie');
    } else if (category.id === 'adult-comedy') {
      // Add comedy related stuff
      extraItems = indoItems.filter(item =>
        item.genre?.toLowerCase().includes('komedi')
      );
    } else if (category.id === 'trending') {
      // Add Action, Horror, Marvel to Trending
      extraItems = otherItems.filter(item =>
        item.genre?.toLowerCase().includes('kengerian') || // Horror
        item.genre?.toLowerCase().includes('tindakan') || // Action
        item.genre?.toLowerCase().includes('cerita menegangkan') || // Thriller
        item.title.toLowerCase().includes('marvel')
      );
    } else if (category.id === 'kdrama') {
      // Add Korean content
      extraItems = otherItems.filter(item =>
        item.country?.toLowerCase() === 'korea' ||
        item.country?.toLowerCase().includes('south korea') ||
        item.genre?.toLowerCase().includes('drama') && item.title.toLowerCase().match(/[가-힣]/) // Fallback check
      );
    }

    // Merge and remove duplicates in that category
    const currentIds = new Set(data.items.map(i => i.id));
    const newItems = extraItems.filter(i => !currentIds.has(i.id));

    return {
      category,
      data: {
        ...data,
        items: [...newItems, ...data.items] // Put new items at FRONT
      }
    };
  });

  const trendingData = enrichedHomeData.find(d => d.category.id === 'trending');

  return (
    <div>
      {/* Hero Banner */}
      <Suspense fallback={<LoadingSkeleton type="hero" />}>
        {trendingData && trendingData.data.items.length > 0 && (
          <HeroBanner items={trendingData.data.items} />
        )}
      </Suspense>

      {/* Content Rows */}
      <section style={{ paddingTop: '2rem' }}>
        {enrichedHomeData.map(({ category, data }) => (
          <Suspense key={category.id} fallback={<LoadingSkeleton type="row" />}>
            {data.items.length > 0 && (
              <ContentRow
                title={category.title}
                items={data.items}
                category={category.id}
              />
            )}
          </Suspense>
        ))}
      </section>
    </div>
  );
}
