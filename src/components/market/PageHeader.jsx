'use client';

import { SlidersHorizontal } from 'lucide-react';

import { FILTER_LIST } from '@/constants/market';

import { SellPhotoCardButton } from '@/components/market/SellPhotoCardButton';
import SearchInput from '@/components/shared/SearchInput';
import SortBtn from '@/components/shared/SortBtn';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PageHeader({ sortOptionKey, setSortOptionKey }) {
  return (
    <section>
      <div className="hidden py-10 tb:block lt:py-[60px]">
        <div className="flex justify-between border-b-2 border-gray-100 pb-5">
          <h1 className="font-baskin text-5xl lt:text-[62px]">마켓플레이스</h1>
          <SellPhotoCardButton />
        </div>

        <div className="grid grid-flow-col gap-1 py-5">
          <div className="grid grid-flow-col gap-1">
            <SearchInput />
            <div className="flex items-center gap-2">
              {FILTER_LIST.map((selectBox) => {
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
            <SortBtn {...{ sortOptionKey, setSortOptionKey }} />
          </div>
        </div>
      </div>

      {/* 모바일일떄 */}
      <div className="bott tb:hidden">
        <div className="flex flex-col py-5">
          <SearchInput />
          <hr className="my-[15px]" />
          <div className="flex justify-between">
            <Button variant="outline" size="icon">
              <SlidersHorizontal />
            </Button>
            <SortBtn {...{ sortOptionKey, setSortOptionKey }} />
          </div>
        </div>
        <SellPhotoCardButton classNames="fixed z-50 h-[55px] bottom-0 left-0 w-full" />
      </div>
    </section>
  );
}