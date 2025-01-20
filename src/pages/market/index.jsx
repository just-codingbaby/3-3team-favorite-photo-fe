import { Fragment, useEffect, useState } from 'react';

import { dehydrate, HydrationBoundary, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import { SORT_OPTS } from '@/constants/market';

import PageHeader from '@/components/market/PageHeader';
import { ProductCard } from '@/components/market/ProductCard';
import { Button } from '@/components/ui/button';

const PAGE_LIMIT = 6;

async function fetchCards(pageParam, sortOptionKey = 'LATEST') {
  const query = new URLSearchParams({ page: pageParam, limit: PAGE_LIMIT });
  const sortQuery = SORT_OPTS.get(sortOptionKey).value;
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/api/v1/shop/cards?' + query.toString()+`&${sortQuery}`,
    );
    if (!response.ok) {
      console.error(response.status)
    }
    return response.json();
  } catch (e) {
    if (e instanceof TypeError) {
      console.error('네트워크 오류 발생:', e);
      throw new Error('네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.');
    }
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam = 1 }) => fetchCards(pageParam),
    initialPageParam: 1,
  });
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default function MarketPage({ dehydratedState }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sortOptionKey, setSortOptionKey] = useState('LATEST');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['cards', sortOptionKey],
    queryFn: ({ pageParam = 1 }) => fetchCards(pageParam, sortOptionKey),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length === PAGE_LIMIT ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    console.log(sortOptionKey);
  }, [sortOptionKey]);

  if (status === 'pending') {
    return (
      <div className="grid h-dvh w-full place-items-center">
        <div className="container grid place-items-center gap-2 text-center">
          <Loader2 className="animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') return <div>Error fetching posts</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <article className="mx-auto px-[15px] pb-20 tb:container tb:px-5">
        <PageHeader
          setSortOptionKey={setSortOptionKey}
          sortOptionKey={sortOptionKey}
          setSearch={setSearch}
          search={search}
          setFilter={setFilter}
          filter={filter}
        />
        <section>
          {
            <div className="grid grid-cols-2 gap-[5px] tb:gap-5 lt:grid-cols-3 lt:gap-20">
              {data.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.map((card) => (
                    <Link
                      href={`/market/${card.id}`}
                      key={card.id}
                      className="block"
                      aria-label={`${card.name} 카드 상세보기`}
                    >
                      <ProductCard cardProps={card} />
                    </Link>
                  ))}
                </Fragment>
              ))}
              <Button
                variant="outline"
                className="col-span-2 my-6 lt:col-span-1 lt:col-start-2"
                onClick={() => fetchNextPage()}
                aria-busy={isFetchingNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <p>Loading more...</p>
                  </>
                ) : hasNextPage ? (
                  <p>Load More</p>
                ) : (
                  <p>Nothing more to load</p>
                )}
              </Button>
            </div>
          }
        </section>
      </article>
    </HydrationBoundary>
  );
}