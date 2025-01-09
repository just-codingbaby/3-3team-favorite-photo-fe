import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/market/PageHeader";
import { ProductCard } from "@/components/market/ProductCard";

export default function MarketPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/shop/cards`);
      return await response.json();
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
            {data.map((card) => (
              <ProductCard key={card.id} cardProps={card} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}