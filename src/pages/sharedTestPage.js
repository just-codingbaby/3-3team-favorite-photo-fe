import Header from '@/components/shared/Header';

export default function SharedTestPage() {
  return (
    <div className="bg-gray-600 w-full h-[2000px]">
      <Header />
      <div className="relative top-20">
        공통 컴포넌트 테스트 페이지입니다.
      </div>
    </div>
  )
}