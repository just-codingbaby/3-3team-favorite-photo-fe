'use client';

import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

export function PageResetButton() {
  const router = useRouter();
  return (
    <Button variant="link" onClick={() => router.reload()} aria-label="검색 조건 초기화">
      검색 초기화
    </Button>
  );
}