import DetailGradeTitle from "@/components/market/cardDetail/DetailGradeTitle";
import DetailPrice from "@/components/market/cardDetail/DetailPrice";
import tail from "@/styles/tailwindcss";
import DetailRemaining from "@/components/market/cardDetail/DetailRemaining";
import PrimaryButton from "@/components/shared/PrimaryButton";
import SecondaryButton from "@/components/shared/SecondaryButton";
import {Title} from "@/components/shared/Title";
import {useRouter} from "next/router";
import {ProductCard} from "@/components/market/ProductCard";

function CardSeller({cardDetailData, cardExchangeDataList}) {
  const {pointtext, flexstanderd, btnabsol, contentborder} = tail;

  const router = useRouter()

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
          <p className={`text-white`}>{cardDetailData.description}</p>
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
          {/* 이하 스타일 임의로 인라인 처리 할테니 수정하셈 to수정*/}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottom: '1px solid white'
          }}>
            <img src={'/images/type=down.png'} alt={'교환아이콘'}/>
            <span style={{fontSize: '28px', fontWeight: '700'}}>교환 희망 정보</span>
            {/*  언더바 */}
          </div>
          <div style={{borderBottom: '1px solid grey', paddingBottom: '30px'}}>
            {/* 교환 요청이 온 카드의 그레이드, 장르 */}
            <DetailGradeTitle
              rating={cardDetailData.grade}
              type={cardDetailData.genre}
              // nickname={cardData.owner?.nickName}
              className="tablet:text-lg"
              titleborder={`tablet:h-[18px] mx-[10px]`}
            />
            {/*언더바*/}
          </div>
          <p className={`text-white`}
             style={{paddingBottom: '50px'}}>{cardDetailData.description}</p>
          <PrimaryButton
            label="수정하기"
            width="w-full"
            height="80px"
            handleClick={() => setOpenModal({...openModal, standard: true})}
          />
          <SecondaryButton
            label="판매 내리기"
            width="w-full"
            height="80px"
            handleClick={() => setOpenModal({...openModal, standard: true})}
          />
        </div>
      </div>
      <div className={`${flexstanderd} relative`}>
        <Title title="교환 제시 목록" className="mt-[120px] w-full"/>
      </div>
      <div>
        {cardExchangeDataList.length > 0 ? cardExchangeDataList?.map((row) => (
          <ProductCard cardProps={row}/>
        )) : <></>}
      </div>
    </div>
  );
};

export default CardSeller;