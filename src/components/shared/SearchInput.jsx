import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchInput() {
  return (
    <div className="flex gap-1 border w-full">
      <Input className="border-none h-[45px]" type="search" placeholder="검색"/>
      <Button className="my-auto" variant="ghost" size="icon" type="submit">
        <Search size="24" />
      </Button>
    </div>
  );
}