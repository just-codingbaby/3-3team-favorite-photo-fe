import tail from "@/styles/tailwindcss";
import Buyer, { Btn } from "@/components/buyer";
import { Gradetitle } from "@/components/buyer";
import ModalStandard from "@/components/modal";
import { useState } from "react";

export default function Salesphotocard({ rating, type, color, ma, buyphoto }) {
  const {
    header,
    marketlogo,
    titles,
    afborder,
    pointtext,
    flexstanderd,
    btnabsol,
  } = tail;

  const [title, setTitle] = useState("우리집 앞마당");
  return (
    <div>
      {/* <ModalStandard rating="LEGENDARY" title={title} /> */}
      <div className={`${header} text-white`}>헤더야</div>
      <div className={`mx-56 mb-[2000px] border border-customBlue`}>
        <div className={`${marketlogo}  `}>마켓플레이스</div>
        <h2 className={`${titles} ${afborder} text-white`}>{title}</h2>
        <div className={`flex gap-[80px] mt-[60px]`}>
          <img
            src="images/type=sample_img1.png"
            className={`w-[960px] h-[720px]`}
          />
          <Buyer
            nickname="미쓰손"
            content="우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. "
            price="4"
            buyphoto="2"
            totalphoto="5"
          />
        </div>
        <div className={`${flexstanderd} relative`}>
          <h2 className={`${titles} ${afborder} text-white mt-[120px] w-full`}>
            교환 희망 정보
          </h2>
          <Btn
            btname="포토카드 교환하기"
            width="w-[440px]"
            height="h-[60px]"
            ma="mt-[120px]"
            fontsize="text-lg"
            absolute={btnabsol}
          />
        </div>
        <p className={`text-white mt-[60px] ${pointtext}`}>
          푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.
          나중에 뚫어야할 부분임
        </p>
        <Gradetitle rating="RARE" type="풍경" mt="mt-[20px]" />
      </div>
    </div>
  );
}
