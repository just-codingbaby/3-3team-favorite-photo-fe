import { useForm } from 'react-hook-form';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchInput2({ search, setSearch }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: search,
    },
  });
  const searchForm = register('search');
  const onSubmit = (data) => setSearch(data.search);
  return (
    <form className="flex w-full gap-1 border" onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="h-[45px] border-none"
        type="search"
        ref={searchForm.ref}
        name={searchForm.name}
        onChange={searchForm.onChange}
        onBlur={searchForm.onBlur}
      />
      <Button type="submit" className="my-auto" variant="ghost" size="icon">
        <Search size="24" />
      </Button>
    </form>
  );
}
