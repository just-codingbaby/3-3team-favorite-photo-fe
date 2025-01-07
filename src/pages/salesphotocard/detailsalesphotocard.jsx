import tail from "@/styles/tailwindcss";
import Buyer, { Btn } from "@/components/buyer";
import { Gradetitle } from "@/components/buyer";
import { useState } from "react";
import { ModalExchange } from "@/components/modal";

export function Title({ location, title, className }) {
  const { marketlogo, titles, afborder } = tail;
  return (
    <div className={`${className}`}>
      <div className={`${marketlogo}`}>{location}</div>
      <h2 className={`${titles} ${afborder} text-white`}>{title}</h2>
    </div>
  );
}

export default function Salesphotocard() {
  const { header, titles, afborder, pointtext, flexstanderd, btnabsol } = tail;

  const [example, setExample] = useState({
    title: "우리집 앞마당",
    rating: "LEGENDARY",
    buyphoto: 2,
  });

  const [Modal, setModal] = useState(false);

  function Modalhandle() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }

  return (
    <div>
      <div className={`${header} text-white`}>헤더야</div>
      <div
        className={`max-w-[1480px] w-full mx-auto tablet:max-w-[704px] border border-customBlue`}
      >
        <Title location="마켓플레이스" title={example.title} />
        <div className={`flex justify-between mt-[60px] tablet:mt-[40px]`}>
          <div
            className={`relative w-full max-w-[960px]  h-[720px] tablet:max-w-[342px] tablet:h-[256px] overflow-hidden`}
          >
            <img
              src="images/type=sample_img1.png"
              className={`w-[960px] h-[720px] tablet:w-[342px] tablet:h-[256px] absolute object-cover`}
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
            className="w-[440px] h-[60px] mt-[120px] text-lg"
            absolute={btnabsol}
            onClick={Modalhandle}
          />
          {Modal && (
            <ModalExchange
              modalbox="max-w-[1160px] w-full h-[1000px]"
              onClose={handleCloseModal} // 모달 닫기 함수 전달
            ></ModalExchange>
          )}
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
