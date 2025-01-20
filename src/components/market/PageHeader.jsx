'use client';

import { FILTER_LIST } from '@/constants/market';

import { BottomSheet } from '@/components/market/BottomSheet';
import { SellPhotoCardButton } from '@/components/market/SellPhotoCardButton';
import SearchInput2 from '@/components/shared/SearchInput2';
import SelectButton from '@/components/shared/SelectButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PageHeader({
  sortOptionKey,
  setSortOptionKey,
  search,
  setSearch,
  filter,
  setFilter,
}) {
  const filterListKeys = Array.from(FILTER_LIST.keys());
  return (
    <section>
      <div className="hidden py-10 tb:block lt:py-[60px]">
        <div className="flex justify-between border-b-2 border-gray-100 pb-5">
          <h1 className="font-baskin text-5xl lt:text-[62px]">마켓플레이스</h1>
          <SellPhotoCardButton />
        </div>
        <div className="grid grid-flow-col gap-1 py-5">
          <div className="grid grid-flow-col gap-1">
            <SearchInput2 search={search} setSearch={setSearch} />
            <div className="flex items-center gap-2">
              {filterListKeys.map((filterName) => (
                <Select
                  key={filterName}
                  value={filter.filterValue}
                  onValueChange={(value) =>
                    setFilter((prev) => ({ ...prev, filterName, filterValue: value }))
                  }
                >
                  <SelectTrigger className="w-[120px] border-none">
                    <SelectValue
                      placeholder={FILTER_LIST.get(filterName).label}
                      value={FILTER_LIST.get(filterName).value}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {FILTER_LIST.get(filterName).options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>
          <div className="ml-auto">
            <SelectButton sortOptionKey={sortOptionKey} setSortOptionKey={setSortOptionKey} />
          </div>
        </div>
      </div>

      {/* 모바일일떄 */}
      <div className="tb:hidden">
        <div className="flex flex-col py-5">
          <SearchInput2 search={search} setSearch={setSearch} />
          <hr className="my-[15px]" />
          <div className="flex justify-between">
            <BottomSheet />
            <SelectButton sortOptionKey={sortOptionKey} setSortOptionKey={setSortOptionKey} />
          </div>
        </div>
        <SellPhotoCardButton classNames="fixed bottom-0 left-0 z-50 h-[55px] w-full" />
      </div>
    </section>
  );
}