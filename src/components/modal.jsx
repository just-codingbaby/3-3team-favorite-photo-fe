import { useMemo, useState } from "react";

import tail from "@/styles/tailwindcss";
import { useRouter } from "next/router";

import { Title } from "@/components/shared/Title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PrimaryButton from "./shared/PrimaryButton";
import SearchInput from "./shared/SearchInput";
import SecondaryButton from "./shared/SecondaryButton";
import { FILTER_LIST } from "@/constants/market";
import SelectButton from "@/components/shared/SelectButton";

export function CloseBtn({ position, onClose }) {
  const closeBtn = `absolute top-1/2 left-1/2 w-6 h-[2px] bg-customGrey01 transform -translate-x-1/2 -translate-y-1/2`;
  return (
    <button
      className={`absolute ${position} cursor-pointer border-[1px] border-transparent bg-transparent`}
      onClick={onClose}
    >
      <span class={`${closeBtn} rotate-45`}></span>
      <span class={`${closeBtn} -rotate-45`}></span>
    </button>
  );
}

// export function BorderBtn({ children, btnstyle, href, onClick, onClose }) {
//   const { flexcenter } = tail;
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       onClose={onClose}
//       className={`${flexcenter} ${btnstyle} bg-transparent border border-white`}
//     >
//       <span className={`text-lg text-white font-medium`}>{children}</span>
//     </Link>
//   );
// }

// 포토카드 구매 모달, 교환 제시 취소 (처음 나오는 기본 모달)
export function ModalStandard({
  modalbox,
  modaltitle,
  modaltext,
  closeposition,
  onClick,
  onClose,
  children,
}) {
  const { dimbg, flexcenter, stitle } = tail;

  return (
    <div className={`${dimbg} bg-opacity-80`}>
      <div className={`${modalbox} ${flexcenter} relative flex-col`}>
        <h3 className={`${stitle} mt-[80px] font-sans text-white`}>
          {modaltitle}
        </h3>
        <span className={`mt-[40px] text-[16px] font-normal text-white`}>
          {modaltext}
        </span>
        <CloseBtn
          position={`${closeposition} top-[46px] right-[46px]`}
          onClose={onClose}
        />
        {children}
      </div>
    </div>
  );
}

// ㄷEx 빼고 넣고 하려고 만든건데 다시 한 번 생각해봐야 할 듯
export function ExchangeList({ onClick, onClose }) {
  const [isEx, setIsEx] = useState(true); // 상태 관리

  return (
    <div>
      <Title title="내가 제시한 교환 목록" className="mt-[120px] w-full" />
      {isEx && (
        <Ex
          className={`mt-[40px] h-[600px] w-[440px] border border-white`}
          // onClose={onClose}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <SecondaryButton
            label="취소하기"
            width="210px"
            height="60px"
            textSize="lg"
            handleClick={onClick}
          />
        </Ex>
      )}
    </div>
  );
}

// 임시로 만든거 여기에 지연님 포토카드 컴포넌트 넣을꺼임
export function Ex({ className, handleClick, children }) {
  const { flexcenter } = tail;
  return (
    <div
      className={`${className} ${flexcenter} flex-col`}
      onClick={handleClick}
    >
      <div>img</div>
      <div>text</div>
      {children}
    </div>
  );
}

export const DetailPheader = ({ sortOptionKey, setSortOptionKey }) => {
  const filterListKeys = Array.from(FILTER_LIST.keys()).filter(
    (row) => row !== "status"
  );
  return (
    <div className="grid grid-flow-col gap-1">
      <SearchInput />
      <div className="flex gap-2">
        {useMemo(
          () =>
            filterListKeys.map((key) => (
              <Select key={key}>
                <SelectTrigger className="w-[120px] border-none">
                  <SelectValue placeholder={FILTER_LIST.get(key).label} />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_LIST.get(key).options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )),
          [filterListKeys]
        )}
      </div>
    </div>
  );
};
