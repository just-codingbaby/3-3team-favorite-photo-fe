'use client';

import { RefreshCw, SlidersHorizontal } from 'lucide-react';

import { FilterTabs } from '@/components/market/FilterTabs';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function BottomSheet() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="min-w-[375px] rounded-t-[20px] border-none px-0">
          <SheetHeader>
            <SheetTitle className="text-center">필터</SheetTitle>
            <SheetDescription aria-describedby={undefined}></SheetDescription>
            <FilterTabs />
          </SheetHeader>
          <SheetFooter className="place-items-center gap-3 px-4">
            <div className="h-[55px] w-[55px] place-content-center text-center">
              <Button variant="ghost" className="h-full w-full">
                <RefreshCw style={{ width: '1.5rem', height: '1.5rem' }} />
              </Button>
            </div>
            <SheetClose className="flex-1" asChild>
              <Button className="h-[55px] text-base font-bold" type="submit">
                개 포토보기
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
