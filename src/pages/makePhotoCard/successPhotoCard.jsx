import SecondaryButton from "@/components/shared/SecondaryButton";
import Image from "next/image";

export default function SuccessPhotoCard() {
  return (
    <div className="absolute flex flex-col items-center gap-5 justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* <button className="relative top-[-110px] right-[-300px]">
        <Image src="/images/type=close.png" width={24} height={24} />
      </button> */}                                                             {/* 버튼이 필요한가? */}
      <h1 className="font-normal font-baskin text-[46px] leading-[47px]">
        포토카드 생성 <span className="text-customMain">성공</span>
      </h1>
      <p className="font-bold text-xl leading-7">포토카드 생성에 성공했습니다!</p>
      <SecondaryButton
        label={"마이갤러리에서 확인하기"}
        className={"border-white w-[440px] h-[60px]"}
      />
    </div>
  );
}
