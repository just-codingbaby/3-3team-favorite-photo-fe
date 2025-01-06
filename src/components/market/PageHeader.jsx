import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function PageHeader() {
  return (
    <section>
      <div className="tb:block lt:py-[60px] hidden py-10">
        <div className="flex justify-between pb-5 border-b-2">
          <h1 className="font-baskin lt:text-[62px] text-5xl">마켓플레이스</h1>
          <Button className="bg-customMain w-[342px] p-4 font-bold lt:w-[440px] flex justify-center items-center">
            나의 포토카드 판매하기
          </Button>
        </div>
        <div className="flex justify-between py-5">
          <div className="flex gap-[30px]">
            <label className="flex gap-1 border-white border">
              <Input
                className="border-0 focus-visible:outline-none focus-visible:ring-inset bg-none"
                type="search"
                placeholder="검색"
                name="search"
                aria-label="검색"
              />
              <Button variant="ghost" size="icon" type="submit">
                <Search size="24" />
              </Button>
            </label>
            <span className="flex *:border *:border-black ">
              <select name="rating">
                <option value="">등급</option>
                <option value="common">COMMON</option>
                <option value="rare">RARE</option>
                <option value="super-rare">SUPER RARE</option>
                <option value="legendary">LEGENDARY</option>
              </select>
              <select name="genre">
                <option>장르</option>
                <option>풍경</option>
                <option>인물</option>
                <option>사물</option>
              </select>
              <select name="status">
                <option>매진여부</option>
                <option>판매 중</option>
                <option>판매 완료</option>
              </select>
            </span>
          </div>
          <div className="contents">
            <select name="order">
              <option>최신 순</option>
              <option>오래된 순</option>
              <option>높은 가격순</option>
              <option selected>낮은 가격순</option>
            </select>
          </div>
        </div>
      </div>
      {/* 모바일일떄 */}
      <div className="tb:hidden">
        <div className="flex flex-col py-5">
          <div className="">
            <input
              className="flex-1 w-full px-5 py-3 border border-black"
              type="search"
              placeholder="검색"
            />
          </div>
          <hr className="my-[15px]" />
          <div className="flex justify-between">
            <button className="tb:hidden aspect-square w-[35px] bg-slate-400">
              =
            </button>
            <select name="order">
              <option>최신 순</option>
              <option>오래된 순</option>
              <option>높은 가격순</option>
              <option selected>낮은 가격순</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
