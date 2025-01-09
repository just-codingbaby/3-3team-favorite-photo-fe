import tail from "@/styles/tailwindcss";
import { useState } from "react";
import { useRouter } from "next/router";
import Buyer, { Btn, Gradetitle } from "@/components/buyer";
import { ExchangeDetail, ModalExchange, Ex } from "@/components/modal";
import PageHeader, { DetailPheader } from "@/components/market/PageHeader";

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
  const { flexcenter, pointtext, flexstanderd, btnabsol } = tail;
  const router = useRouter();
  const { name } = router.query;

  const [example, setExample] = useState({
    // title: "우리집 앞마당",
    rating: "LEGENDARY",
    buyphoto: 2,
  });

  const [isModal, setIsModal] = useState(false);
  const [isExchangeModal, setIsExchangeModal] = useState(false);

  const openModal = () => setIsModal(true);
  const closeModal = () => {
    setIsModal(false);
    setIsExchangeModal(false);
  };

  const openExchangeModal = () => {
    setIsExchangeModal(true);
  };
  //example.title
  return (
    <div>
      {/* <ModalExchange
        modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
        children=""
        //  onClick={}
        onClose={closeModal}
      >
        <Title
          location="포토카드 교환하기"
          title="How Far I’ll Go"
          className="mb-[20px]"
        />
        <div className={`flex justify-between mt-[20px]`}>
          <Ex className={`w-[440px] h-[600px] border border-white`} />
          <div className={`max-w-[440px] w-full flex flex-col`}>
            <h3 className="text-xl font-bold mb-[10px]">교환 제시 내용</h3>
            <div>
              <input
                className="border border-white w-full h-[120px] px-5
                py-5 bg-transparent text-[16px] font-light"
                placeholder="내용을 입력해 주세요"
              />
            </div>
            <div className={` ${flexstanderd} justify-between mt-[60px]`}>
              <BorderBtn
                href="#"
                btnstyle={` w-[210px] h-[60px] text-white`}
                onClose={closeModal}
              >
                취소하기
              </BorderBtn>
              <Btn className={` w-[210px] h-[60px] text-[#0F0F0F] `}>
                교환하기
              </Btn>
            </div>
          </div>
        </div>
      </ModalExchange> */}
      <div className={`max-w-[1480px] w-full mx-auto tablet:max-w-[704px]`}>
        <Title location="마켓플레이스" title={name} />
        <div className={`flex justify-between mt-[60px] tablet:mt-[40px]`}>
          <div
            className={`relative w-full max-w-[960px]  h-[720px] tablet:max-w-[342px] tablet:h-[256px] overflow-hidden`}
          >
            <img
              src="/images/type=sample_img1.png"
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
          <Title title="교환 희망 정보" className="mt-[120px] w-full" />
          <Btn
            className="w-[440px] h-[60px] mt-[120px] text-lg "
            absolute={btnabsol}
            onClick={openModal}
          >
            포토카드 교환하기
          </Btn>
          {isModal && (
            <ModalExchange
              modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
              onClose={closeModal} // 모달 닫기 함수 전달
            >
              {" "}
              <Title
                location="마이갤러리"
                title="포토카드 교환하기"
                className="mb-[20px]"
              />
              <div className={``}>
                <DetailPheader />
                <div className={`${flexstanderd} justify-between`}>
                  <Ex
                    onClick={openExchangeModal}
                    className={`w-[440px] h-[600px] mt-[40px] border border-white`}
                  />
                  {isExchangeModal && <ExchangeDetail onClose={closeModal} />}
                  <Ex
                    className={`w-[440px] h-[600px] mt-[40px] border border-white`}
                  />
                </div>
              </div>
            </ModalExchange>
          )}
        </div>
        <p className={`text-white mt-[60px] ${pointtext}`}>
          푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.
          나중에 뚫어야할 부분임
        </p>
        <Gradetitle
          rating="RARE"
          type="풍경"
          className="mt-[20px] mb-[180px]"
        />
      </div>
    </div>
  );
}
