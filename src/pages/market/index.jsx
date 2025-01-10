import {dehydrate, HydrationBoundary, QueryClient, useQuery,} from '@tanstack/react-query'

import PageHeader from '@/components/market/PageHeader';
import {ProductCard} from '@/components/market/ProductCard';
import Link from 'next/link';
import {error} from "next/dist/build/output/log";

async function getCards() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/shop/cards');
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['cards'],
    queryFn: getCards
  })
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
export default function MarketPage({ dehydratedState }) {
  // const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const { data, isPending, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  })

  if (isPending) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <HydrationBoundary state={dehydratedState}>
      <article className=" tb:container mx-auto px-[15px] tb:px-5">
        <PageHeader />
        <section>
          <div className="grid grid-cols-2 gap-[5px] tb:gap-5 lt:grid-cols-3 lt:gap-20">
            {data?.cards?.map((card) => (
              <Link
                href={`/market/${card.id}`}
                key={card.id}
                className="block"
                aria-label={`${card.name} 카드 상세보기`}
                onClick={(e) => {e.stopPropagation()}}
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