import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/market/PageHeader";
import { ProductCard } from "@/components/market/ProductCard";
import Router, { useRouter } from "next/router";
import Link from "next/link";

export default function MarketPage() {
  const router = useRouter();

  const API_URL = "https://three-3team-favorite-photo-be.onrender.com";
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/shop/cards`);
      const data = await response.json();
      console.log(data);
      return data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      {/* <header className="bg-gray-500 lt:h-[80px] tb:h-[70px] h-[60px] text-white text-center flex items-center justify-center">
        헤더(임시)
      </header> */}
      <article className="container mx-auto px-[15px] tb:px-5">
        <PageHeader />
        <section>
          <div className="grid grid-cols-2 gap-[5px] tb:gap-5 lt:grid-cols-3 lt:gap-20">
            {data.map((card) => {
              console.log(card); // 여기서 card를 콘솔에 출력합니다.
              return (
                // <Link
                //   key={card.id}
                //   href={{
                //     pathname: `/buyphoto`,
                //     query: {
                //       id: card.id,
                //       name: card.name,
                //     },
                //   }}
                // >
                // </Link>
                <ProductCard key={card.id} cardProps={card} />
              );
            })}
          </div>
        </section>
      </article>
    </>
  );
}
