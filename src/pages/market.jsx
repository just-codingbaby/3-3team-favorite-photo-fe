import PageHeader from "@/components/market/PageHeader";
import { BaseCard } from "../components/market/BaseCard";

export default function MarketPage() {
  return (
    <main>
      <header className="bg-gray-500 lt:h-[80px] tb:h-[70px] h-[60px] text-white text-center flex items-center justify-center">
        헤더(임시)
      </header>
      <article className="container mx-auto px-[15px] tb:px-5">
        <PageHeader />
        <section>
          <div className="grid grid-cols-2 gap-[5px] tb:gap-5 lt:grid-cols-3 lt:gap-20">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
              <BaseCard key={item} props={idx} />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
