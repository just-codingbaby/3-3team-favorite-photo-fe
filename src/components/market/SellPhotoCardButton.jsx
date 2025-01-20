import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

export function SellPhotoCardButton({ classNames }) {
  return (
    <Button className={cn('flex w-[342px] justify-center p-4 font-bold lt:w-[440px]', classNames)}>
      나의 포토카드 판매하기
    </Button>
  );
}
