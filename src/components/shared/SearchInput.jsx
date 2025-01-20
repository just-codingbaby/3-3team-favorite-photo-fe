import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchInput({
  placeholder = '검색', // 기본 placeholder
  onKeyPress = () => {}, // 기본 Enter 키 핸들러 (빈 함수)
  onChange = () => {}, // 기본 입력값 변경 핸들러 (빈 함수)
  onClick = () => {}, // 기본 클릭 핸들러 (빈 함수),
  value,
}) {
  return (
    <div className="flex w-full gap-1 border">
      {/* 검색 입력 필드 */}
      <Input
        className="h-[45px] border-none"
        type="search"
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        onChange={onChange}
        value={value}
      />
      {/* 검색 버튼 */}
      <Button
        type="submit"
        className="my-auto"
        variant="ghost"
        size="icon"
        onClick={onClick}
      >
        <Search size="24" />
      </Button>
    </div>
  );
}