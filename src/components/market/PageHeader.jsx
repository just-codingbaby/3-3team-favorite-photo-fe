'use client';

import { useMemo } from 'react';

import { useForm } from 'react-hook-form';

import { FILTER_LIST } from '@/constants/market';

import { BottomSheet } from '@/components/market/BottomSheet';
import { SellPhotoCardButton } from '@/components/market/SellPhotoCardButton';
import SearchInput from '@/components/shared/SearchInput';
import SelectButton from '@/components/shared/SelectButton';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PageHeader({ sortOptionKey, setSortOptionKey, search, setSearch }) {
  const form = useForm({
    defaultValues: {
      search: '',
      filter: '',
      sort: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  const filterListKeys = Array.from(FILTER_LIST.keys());
  return (
    <section>
      <div className="hidden py-10 tb:block lt:py-[60px]">
        <div className="flex justify-between border-b-2 border-gray-100 pb-5">
          <h1 className="font-baskin text-5xl lt:text-[62px]">마켓플레이스</h1>
          <SellPhotoCardButton />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-flow-col gap-1 py-5">
            <div className="grid grid-flow-col gap-1">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SearchInput {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <div className="flex items-center gap-2">
                {useMemo(
                  () =>
                    filterListKeys.map((key) => (
                      <Select key={key}>
                        <SelectTrigger className="w-[120px] border-none">
                          <SelectValue placeholder={FILTER_LIST.get(key).label} />
                        </SelectTrigger>
                        <SelectContent>
                          {FILTER_LIST.get(key).options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )),
                  [filterListKeys],
                )}
              </div>
            </div>
            <div className="ml-auto">
              <SelectButton sortOptionKey={sortOptionKey} setSortOptionKey={setSortOptionKey} />
            </div>
          </form>
        </Form>
      </div>

      {/* 모바일일떄 */}
      <div className="tb:hidden">
        <div className="flex flex-col py-5">
          <SearchInput />
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