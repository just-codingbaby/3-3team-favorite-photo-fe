import Image from 'next/image';

import SecondaryButton from '@/components/shared/SecondaryButton';

export default function Success() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-9">
      {/* <button className="relative top-[-110px] right-[-300px]">
        <Image src="/images/type=close.png" width={24} height={24} />
      </button> */}{' '}
      {/* 버튼이 필요한가? */}
      <h1 className="font-baskin text-[46px] font-normal leading-[47px]">
        포토카드 생성 <span className="text-customMain">성공</span>
      </h1>
      <p className="text-xl font-bold leading-7">포토카드 생성에 성공했습니다!</p>
      <SecondaryButton
        label={'마이갤러리에서 확인하기'}
        className={'h-[60px] w-[440px] border-white'}
      />
    </div>
  );
}
