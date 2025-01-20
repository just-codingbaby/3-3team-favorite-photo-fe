import { useRouter } from "next/router";
import tail from "@/styles/tailwindcss";
import { Title } from "@/components/shared/Title";
import SecondaryButton from "@/components/shared/SecondaryButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ModalWrapper from "@/components/market/cardDetail/ModalWrapper";

export function ModalExchangeDetail({
  onClose,
  xBtn,
  children,
  title,
  onClick,
}) {
  const router = useRouter();
  const { flexstanderd } = tail;

  return (
    <div>
      <ModalWrapper
        className="!bg-opacity-0"
        modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
        onClose={xBtn}
      >
        <Title
          location="포토카드 교환하기"
          title={title}
          className="mb-[20px]"
        />
        <div className={`mt-[20px] flex justify-between`}>
          {children}
          {/* <Ex className={`h-[600px] w-[440px] border border-white`} /> */}
          <div className={`flex w-full max-w-[440px] flex-col`}>
            <h3 className="mb-[10px] text-xl font-bold">교환 제시 내용</h3>
            <div>
              <textarea
                className="h-[120px] w-full border border-white bg-transparent px-5 py-5 text-[16px] font-light"
                placeholder="내용을 입력해 주세요"
              />
            </div>
            <div className={` ${flexstanderd} mt-[60px] justify-between`}>
              <SecondaryButton
                label="취소하기"
                width="210px"
                height="60px"
                textSize="lg"
                handleClick={onClose}
              />
              <PrimaryButton
                label="교환하기"
                width="210px"
                height="60px"
                textSize="lg"
                handleClick={onClick}
              />
            </div>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default ModalExchangeDetail;
