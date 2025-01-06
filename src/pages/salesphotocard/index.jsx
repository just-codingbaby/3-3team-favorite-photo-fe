import tail from "@/styles/tailwindcss";
import Buyer, { Btn } from "@/components/buyer";
import { Gradetitle } from "@/components/buyer";
import ModalStandard from "@/components/modal";
import { useState } from "react";

export default function Salesphotocard() {
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
  const [modalTextSate, setModalTextState] = useState(true);
  const str = `[${example.rating} | ${example.title}] ${example.buyphoto}장 구매에 성공했습니다!`;

  return (
    <div>
      {/* <ModalStandard
        modalbox="relative w-[660px] h-[452px] bg-[#161616] border border-white"
        closeposition="top-0 right-0 w-8 h-8`"
        rating={example.rating}
      >
        <ModalContent
          text="구매"
          state={modalTextSate}
          btnText="마이갤러리 확인하기"
          href="/test/test"
        >
          {str}
        </ModalContent>
      </ModalStandard> */}

      <div className={`${header} text-white`}>헤더야</div>
      <div
        className={`max-w-[1480px] mx-auto mb-[2000px] border border-customBlue`}
      >
        <div className={`${marketlogo}  `}>마켓플레이스</div>
        <h2 className={`${titles} ${afborder} text-white`}>{example.title}</h2>
        <div className={`flex justify-between mt-[60px]`}>
          <div
            className="imgBox"
            style={{
              position: "relative",
              maxWidth: 960,
              width: "100%",
              height: 720,
              overflow: "hidden",
            }}
          >
            <img
              src="images/type=sample_img1.png"
              className={`w-[960px] h-[720px]`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          </div>
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
