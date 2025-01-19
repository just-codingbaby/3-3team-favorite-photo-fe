'use client';

import { cn } from '@/lib/utils';
import { RefreshCw, SlidersHorizontal } from 'lucide-react';

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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FILTER_LIST } from '@/constants/market'


export function BottomSheet() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-[20px] border-none px-0">
          <SheetHeader>
            <SheetTitle className="text-center">필터</SheetTitle>
            <SheetDescription>
              <Tabs defaultValue={FILTER_LIST[0].category} className="grid">
                <TabsList className="grid grid-cols-3 text-gray-400">
                  { FILTER_LIST.map((filter) => (
                    <TabsTrigger key={filter.category} value={filter.category}>
                      {filter.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {
                  FILTER_LIST.map((filter) => (
                    <TabsContent key={filter.category}  value={filter.category} className="pb-18">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <div className='px-8 flex w-full'>
                              <TableCell className='flex-1'>{filter.label}</TableCell>
                              <TableCell className='text-right tabular-nums flex-none'>{filter.category}</TableCell>
                            </div>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                  ))
                }
              </Tabs>
            </SheetDescription>
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