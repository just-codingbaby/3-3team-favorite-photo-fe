import tail from "@/styles/tailwindcss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Buyer, { Gradetitle } from "@/components/buyer";
import ModalStandard, {
  ExchangeDetail,
  ModalExchange,
  ExchangeList,
  Ex,
} from "@/components/modal";
import PageHeader, { DetailPheader } from "@/components/market/PageHeader";
import PrimaryButton from "@/components/shared/PrimaryButton";

//Ex컴포넌트 부분 다 갈아끼워야 함

export default function Salesphotocard() {
  const { pointtext, flexstanderd, btnabsol } = tail;
  const router = useRouter();
  const { name } = router.query;

  const [example, setExample] = useState({
    title: "우리집 앞마당",
    rating: "LEGENDARY",
    // buyphoto: 2,
  });

  const initModal = {
    standard: false,
    exchange: false,
    cancel: false,
  };

  const [openModal, setOpenModal] = useState({
    standard: false,
    exchange: false,
    cancel: false,
  });

  const CloseModal = () => {
    setOpenModal(initModal);
  };

  const handleCloseModal = (modalType) => {
    setOpenModal((prev) => ({
      ...prev,
      [modalType]: false, // 전달받은 모달 타입을 닫음
    }));
    console.log(`${modalType} 모달이 닫혔습니다.`);
  };

  //example.title
  return (
    <div>
      <div className={`max-w-[1480px] w-full mx-auto tablet:max-w-[704px]`}>
        <Title location="마켓플레이스" title={example.title} />
        <div className={`flex justify-between tablet:mt-[40px]`}>
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
            totalphoto="5"
          />
        </div>
        <div className={`${flexstanderd} relative`}>
          <Title title="교환 희망 정보" className="mt-[120px] w-full">
            <PrimaryButton
              label="포토카드 교환하기"
              width="440px"
              height="60px"
              textSize="lg"
              className="absolute right-0 bottom-[80px]"
              handleClick={() => setOpenModal({ ...openModal, standard: true })}
            />
          </Title>
          {openModal.standard && (
            <ModalExchange
              modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
              // onClose={CloseModal}
              // onClose={() => setOpenModal({ ...openModal, standard: false })}
              // onClose={(e) => console.log(e.target)}
              onClose={() => handleCloseModal("standard")}
            >
              <Title
                location="마이갤러리"
                title="포토카드 교환하기"
                className="mb-[20px]"
              />
              <div className={``}>
                <DetailPheader />
                <div className={`${flexstanderd} justify-between`}>
                  {/* 이 부분 갈아끼워야 함 */}
                  <Ex
                    handleClick={() =>
                      setOpenModal({ ...openModal, exchange: true })
                    }
                    className={`w-[440px] h-[600px] mt-[40px] border border-white`}
                  />
                  {openModal.exchange && (
                    <ExchangeDetail
                      // onClose={() => handleCloseModal("exchange")}
                      onClose={() =>
                        setOpenModal({ ...openModal, exchange: false })
                      }
                    />
                  )}
                  <Ex
                    className={`w-[440px] h-[600px] mt-[40px] border border-white`}
                  />
                </div>
              </div>
            </ModalExchange>
          )}
        </div>
        <p className={`text-white ${pointtext}`}>
          푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.
          나중에 뚫어야할 부분임
        </p>
        <Gradetitle
          rating="RARE"
          type="풍경"
          className="mt-[20px] mb-[180px]"
        />
        {/* 실험중 */}
        <ExchangeList
          onClick={() => setOpenModal({ ...openModal, cancel: true })}
        />
        {openModal.cancel && (
          <ModalStandard
            modalbox="w-[560px] h-[352px] bg-[#161616]"
            modaltitle="교환 제시 취소"
            modaltext={`[${example.rating} | ${example.title}] 교환 제시를 취소하시겠습니까?`}
            onClose={() => handleCloseModal("cancel")}
          >
            <PrimaryButton
              label="취소하기"
              width="170px"
              height="60px"
              textSize="lg"
              className="mt-[60px] mb-[60px]"
              handleClick={() => handleCloseModal("cancel")}
            />
          </ModalStandard>
        )}
      </div>
    </div>
  );
}
