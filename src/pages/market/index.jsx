import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery
} from '@tanstack/react-query';
import PageHeader from '@/components/market/PageHeader';
import { ProductCard } from '@/components/market/ProductCard';
import Link from 'next/link';
import { useState } from 'react';
import { SORT_OPTS } from "@/constants/martket";


async function getCards(query) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/shop/cards?' + SORT_OPTS.get(query.sortOptionKey).value);
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function MarketPage({ dehydratedState }) {
  const [ page, setPage ] = useState(1);
  const [ search, setSearch ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ sortOptionKey, setSortOptionKey ] = useState('LATEST');

  const {data, isLoading, isError} = useQuery({
    queryKey: [ 'cards', page, search, filter, sortOptionKey ],
    queryFn: () => getCards({sortOptionKey}),
  });

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ';

  return (
    <HydrationBoundary state={dehydratedState}>
      <article className=" tb:container mx-auto px-[15px] tb:px-5">
        <PageHeader {...{sortOptionKey, setSortOptionKey}}/>
        <section>
          <div className="grid grid-cols-2 gap-[5px] tb:gap-5 lt:grid-cols-3 lt:gap-20">
            {data?.cards?.map((card) => (
              <Link
                href={`/market/${card.id}`}
                key={card.id}
                className="block"
                aria-label={`${card.name} 카드 상세보기`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ProductCard cardProps={card} />
              </Link>
            ))}
          </div>
        </section>
      </article>
    </HydrationBoundary>
  );
}