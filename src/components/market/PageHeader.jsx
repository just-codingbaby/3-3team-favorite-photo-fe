import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "@/components/shared/SearchInput";
import SortBtn from "@/components/shared/SortBtn";

const FILTER_LIST = [
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
            <SearchInput />
            <div className="flex gap-2">
              {FILTER_LIST.map((selectBox) => {
                console.log(selectBox);
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
            <SortBtn />
          </div>
        </div>
      </div>
      {/* 모바일일떄 */}
      <div className="tb:hidden">
        <div className="flex flex-col py-5">
          <SearchInput />
          <hr className="my-[15px]" />
          <div className="flex justify-between">
            <Button variant="outline" size="icon">
              <SlidersHorizontal />
            </Button>
            <SortBtn />
          </div>
        </div>
      </div>
    </section>
  );
}

export const DetailPheader = () => {
  return (
    <div className="grid grid-flow-col gap-1">
      <SearchInput />
      <div className="flex gap-2">
        {FILTER_LIST.map((selectBox, index) => {
          // console.log(selectBox);
          if (index === FILTER_LIST.length - 1) return null;
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
  );
};
