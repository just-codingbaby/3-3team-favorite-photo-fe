'use client';

import { SlidersHorizontal } from 'lucide-react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function BottomSheet() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-[20px] border-none bg-[#1B1B1B]">
          <SheetHeader>
            <SheetTitle className="text-center">필터</SheetTitle>
            <SheetDescription>
              <Tabs defaultValue="account" className="grid">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="grade">등급</TabsTrigger>
                  <TabsTrigger value="genre">장르</TabsTrigger>
                  <TabsTrigger value="status">매진여부</TabsTrigger>
                </TabsList>
                <TabsContent value="grade">Make changes to your account here.</TabsContent>
                <TabsContent value="genre">Change your password here.</TabsContent>
                <TabsContent value="status">Chaasdff.</TabsContent>
              </Tabs>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="place-items-center gap-3">
            <div className="flex-[0.3]">
              <Button variant="ghost" className="h-[55px] w-full">
                dfa
              </Button>
            </div>
            <SheetClose className="flex-[0.7]" asChild>
              <Button className="h-[55px]" type="submit">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}