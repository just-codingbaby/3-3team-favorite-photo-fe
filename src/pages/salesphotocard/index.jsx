import tail from "@/styles/tailwindcss";
import Buyer, { Btn } from "@/components/buyer";
import { Gradetitle } from "@/components/buyer";
import ModalStandard from "@/components/modal";
import { useState } from "react";
import { BorderBtn } from "@/components/modal";

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

  const [example, setExample] = useState({
    title: "우리집 앞마당",
    rating: "LEGENDARY",
    buyphoto: 2,
  });

  const su = `[${example.rating} | ${example.title}] ${example.buyphoto}장 구매에 성공했습니다!`;

  return (
    <div>
      {/* <ModalStandard
        modalbox="w-[560px] h-[352px] bg-[#161616]"
        modaltitle="포토카드 구매"
        modaltext={`[${example.rating} | ${example.title}] ${example.buyphoto}장을 구매하시겠습니까?`}
        rating={example.rating}
        title={example.title}
        modaltextClass="text-customGrey01 "
              btn={
          <Btn
            btname="구매하기"
            width="w-[170px]"
            height="h-[60px]"
            ma="mt-[60px] mb-[60px]"
            fontsize="text-lg"
          />
        }
      /> */}
      <ModalStandard
        modalbox="relative w-[660px] h-[452px] bg-[#161616] border border-white"
        // closeposition="top-[30px] right-[30px] w-8 h-8`"
        closeposition="top-0 right-0 w-8 h-8`"
        modaltitle={
          <>
            <span className="text-white font-baskin text-[46px] font-bold">
              구매{" "}
            </span>
            <span className="text-customMain font-baskin text-[46px] font-bold">
              성공
            </span>
          </>
        }
        modaltext={su}
        rating={example.rating}
        title={example.title}
        modaltextClass="text-white font-bold text-xl"
        btn={<BorderBtn text="마이갤러리에서 확인하기" ma="mt-[60px]" />}
      />
      <div className={`${header} text-white`}>헤더야</div>
      <div className={`mx-56 mb-[2000px] border border-customBlue`}>
        <div className={`${marketlogo}  `}>마켓플레이스</div>
        <h2 className={`${titles} ${afborder} text-white`}>{example.title}</h2>
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
