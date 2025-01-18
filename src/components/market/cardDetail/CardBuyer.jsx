import tail from "@/styles/tailwindcss";
import {useState} from "react";
import {useRouter} from "next/router";
import ModalStandard, {Ex, ExchangeDetail, ModalExchange} from "../../modal";
import PrimaryButton from "../../shared/PrimaryButton";
import DetailPrice from "@/components/market/cardDetail/DetailPrice";
import DetailRemaining from "@/components/market/cardDetail/DetailRemaining";
import DetailQunatityBtn
  from "@/components/market/cardDetail/DetailQunatityBtn";
import DetailGradeTitle from "@/components/market/cardDetail/DetailGradeTitle";
import {Title} from "@/components/shared/Title";
import {DetailPheader} from "@/components/market/PageHeader";

const initModal = {
  standard: false,
  buy: false,
  cancel: false,
  initModal: false,
};

// 제일 큰 틀
export default function CardBuyer({cardDetailData, cardExchangeDataList}) {
  const {pointtext, flexstanderd, contentborder} = tail;

  const router = useRouter();
  const [modalTextSate, setModalTextSate] = useState(true); // 구매 성공, 실패 모달 보려고한거
  const [info, setInfo] = useState({
    point: 4, // 가격: P / 백엔드에서 자료 가져오면 여기랑 연결
    remaining: 5, // 잔여, 구매수량 / 이것도 나중에 수정해야할 듯
    buy: 2, // 사는거
  });

  // 숫자  - 5 + 이 부분 돌리려고 만든거임 다시 확인해보셈
  const ClickBuyphoto = (updateFn) => {
    setInfo((prev) => ({
      ...prev, // 이전 상태 복사
      buy: updateFn(prev.buy), // buy 값만 업데이트
    }));
  };

  const [example, setExample] = useState({
    rating: "LEGENDARY",
    title: "포토카드",
  });
  const [openModal, setOpenModal] = useState(initModal);

  const str = `[${example.rating} | ${example.title}] ${info.buy}장 구매에 성공했습니다!`;

  function ModalStandardOpen() {
    if (example.buyphoto >= 1) {
      setModalType("standard");
    } else {
      alert("수량을 선택하시오");
    }
  }

  const CloseModal = () => {
    setOpenModal(initModal);
  };

  //실험
  const handleButtonClick = (e) => {
    if (e === "구매하기") {
      // 구매 성공 시 페이지 이동
      router.push({
        pathname: "/ModalPage",
        query: {
          type: "구매", // 동작 타입
          rating: "LEGENDARY", // 레벨
          title: "우리집 앞마당", // 제목
          quantity: 2, // 장 수
        },
      }); // 구매 성공 페이지로 이동
    } else {
      console.log("동작 없음");
    }
  };

  console.log(cardExchangeDataList)

  return (
    <div className={`max-w-[1480px] w-full mx-auto tablet:max-w-[704px]`}>
      <p>CardId: {router.query.id}</p>
      <Title location="마켓플레이스" title={cardDetailData?.name}/>
      <div className={`flex justify-between tablet:mt-[40px]`}>
        <div
          className={`relative w-full max-w-[960px]  h-[720px] tablet:max-w-[342px] tablet:h-[256px] overflow-hidden`}
        >
          <img
            src={cardDetailData.imgUrl}
            className={`w-[960px] h-[720px] tablet:w-[342px] tablet:h-[256px] absolute object-cover`}
          />
        </div>
        <div
          className={`flex flex-col gap-[30px] max-w-[440px] tablet:max-w-[342px]`}
        >
          <div className={`${flexstanderd} justify-between`}>
            <DetailGradeTitle
              rating={cardDetailData.grade}
              type={cardDetailData.genre}
              nickname={cardDetailData.owner?.nickName}
              className="tablet:text-lg"
              titleborder={`tablet:h-[18px] mx-[10px]`}
            />
          </div>
          <div className={`${contentborder}`}></div>
          <p className={`text-white`}>{cardDetailData.content}</p>
          <div className={`${contentborder}`}></div>
          <div className={`flex flex-col gap-[10px]`}>
            <DetailPrice
              price={cardDetailData.price}
              titletext="tablet:text-lg"
              pricetext="tablet:text-xl"
            />
            <DetailRemaining
              titletext="tablet:text-lg"
              buytext="tablet:text-xl"
              remaintext="tablet:text-xl"
              buyphoto={cardDetailData.remainingQuantity}
              totalphoto={cardDetailData.totalQuantity}
            />
          </div>
          <div className={`${contentborder}`}></div>
          <div className={`flex flex-col gap-[20px] `}>
            <DetailQunatityBtn buyphoto={cardDetailData.remainingQuantity}
                               ClickBuyphoto={ClickBuyphoto}/>
            <DetailPrice
              price={cardDetailData.price * cardDetailData.remainingQuantity}> ({info.buy}장)</DetailPrice>
          </div>

          <PrimaryButton
            label="포토카드 구매하기"
            width="w-full"
            height="80px"
            handleClick={() => setOpenModal({...openModal, standard: true})}
          />
        </div>
      </div>
      {openModal.standard && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="포토카드 구매"
          modaltext={`[${example.rating} | ${example.title}] ${info.buy}장을 구매하시겠습니까?`}
          onClose={CloseModal}
        >
          <PrimaryButton
            label="구매하기"
            width="170px"
            height="60px"
            className=" mt-[60px] mb-[60px]"
            // handleClick={() => setOpenModal({ ...openModal, buy: true })}
            // handleClick={() => router.push("/ModalPage")}
            handleClick={() => handleButtonClick("구매하기")}
          />
        </ModalStandard>
      )}


      <div className={`${flexstanderd} relative`}>
        <Title title="교환 희망 정보" className="mt-[120px] w-full">
          <PrimaryButton
            label="포토카드 교환하기"
            width="440px"
            height="60px"
            textSize="lg"
            className="absolute right-0 bottom-[80px]"
            handleClick={() => setOpenModal({...openModal, exchange: true})}
          />
        </Title>
      </div>
      {openModal.exchange && (
        <ModalExchange
          modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
          onClose={() => handleCloseModal("exchange")}
        >
          <Title
            location="마이갤러리"
            title="포토카드 교환하기"
            className="mb-[20px]"
          />
          <div className={``}>
            <DetailPheader/>
            <div className={`${flexstanderd} justify-between`}>
              {/* 이 부분 갈아끼워야 함 */}
              <Ex
                handleClick={() =>
                  setOpenModal({...openModal, exchange: true})
                }
                className={`w-[440px] h-[600px] mt-[40px] border border-white`}
              />
              {openModal.exchange && (
                <ExchangeDetail
                  // onClose={() => handleCloseModal("exchange")}
                  onClose={() =>
                    setOpenModal({...openModal, exchange: false})
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


      <p className={`text-white ${pointtext}`}>
        {cardDetailData.description}
      </p>
      <DetailGradeTitle
        rating={cardDetailData.grade}
        type={cardDetailData.genre}
        className="mt-[20px] mb-[180px]"
      />


      {/*<ExchangeList*/}
      {/*  onClick={() => setOpenModal({...openModal, cancel: true})}*/}
      {/*/>*/}
      {/*{cardExchangeDataList.length > 0 ? cardExchangeDataList?.map((row) => (*/}
      {/*  <ProductCard cardProps={row}/>*/}
      {/*)) : <></>}*/}
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
  );
}
