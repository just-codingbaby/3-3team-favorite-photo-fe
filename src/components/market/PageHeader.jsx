import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FILLTER_LIST = [
  {
    label: "등급",
    category: "rate",
    options: [
      {
        value: "common",
        label: "COMMON",
      },
      {
        value: "rare",
        label: "RARE",
      },
      {
        value: "superRare",
        label: "SUPER RARE",
      },
      {
        value: "legendary",
        label: "LEGENDARY",
      },
    ],
  },
  {
    label: "장르",
    category: "genre",
    options: [
      {
        value: "landscape",
        label: "풍경",
      },
      {
        value: "people",
        label: "인물",
      },
      {
        value: "object",
        label: "사물",
      },
    ],
  },
  {
    label: "매진 여부",
    category: "status",
    options: [
      {
        value: "onSale",
        label: "판매 중",
      },
      {
        value: "soldOut",
        label: "판매 완료",
      },
    ],
  },
];

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
        <div className="py-5 grid grid-flow-col gap-1">
          <div className="grid grid-flow-col gap-1">
            <label className="flex gap-1 border w-full">
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

            <div className="flex gap-2">
              {FILLTER_LIST.map((selectBox) => {
                return (
                  <Select key={selectBox.category}>
                    <SelectTrigger className="w-[120px] border-none">
                      <SelectValue placeholder={selectBox.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectBox.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              })}
            </div>
          </div>

          <div className="ml-auto">
            <Select>
              <SelectTrigger className="border w-[180px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신 순</SelectItem>
                <SelectItem value="oldest">오래된 순</SelectItem>
                <SelectItem value="highPrice">높은 가격순</SelectItem>
                <SelectItem value="lowPrice">낮은 가격순</SelectItem>
              </SelectContent>
            </Select>
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
