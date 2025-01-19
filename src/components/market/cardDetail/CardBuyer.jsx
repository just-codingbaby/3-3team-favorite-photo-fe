import { useEffect, useState } from 'react';

import instance from '@/lib/axios';
import tail from '@/styles/tailwindcss';
import Link from 'next/link';
import { useRouter } from 'next/router';

import DetailGradeTitle from '@/components/market/cardDetail/DetailGradeTitle';
import DetailPrice from '@/components/market/cardDetail/DetailPrice';
import DetailQunatityBtn from '@/components/market/cardDetail/DetailQunatityBtn';
import DetailRemaining from '@/components/market/cardDetail/DetailRemaining';
import { DetailPheader } from '@/components/market/PageHeader';
import { Title } from '@/components/shared/Title';

import ModalStandard, { Ex, ExchangeDetail, ExchangeList, ModalExchange } from '../../modal';
import PrimaryButton from '../../shared/PrimaryButton';
import { ProductCard } from '../ProductCard';

async function exchangeListApi(body) {
  if (!body) return;

  try {
    const response = await instance.post(`/api/v1/cards/detail/exchange/list`, body);
    return await response.data;
  } catch (e) {
    console.error('error', e);
  }
}

const initModal = {
  standard: false,
  buy: false,
  exchange: false,
  exchange2: false,
  cancel: false,
};
async function exchangeApi(body) {
  try {
    const res = await instance.post('/api/v1/cards/detail/exchange', body);
    return await res.data;
  } catch (e) {
    console.error(e);
  }
}
// 제일 큰 틀
export default function CardBuyer({ cardDetailData, myCardList, owner }) {
  const { pointtext, flexstanderd, contentborder } = tail;
  const router = useRouter();
  const [info, setInfo] = useState({
    remaining: 5, // 잔여, 구매수량 / 이것도 나중에 수정해야할 듯
    buy: 0, // 사는거
  });
  const [dc, setDc] = useState({
    name: '',
    price: 0,
    grade: '',
    genre: '',
    imgUrl: '',
    owner: { nickName: '' },
    remainingQuantity: 0,
    totalQuantity: 0,
  }); //detailCard
  const [exchanges, setEx] = useState(null);
  useEffect(() => {
    exchangeListApi({ requesterId: owner.id, targetCardId: cardDetailData.id }).then((res) => {
      setEx(res);
    });
  }, []);
  const ClickBuyphoto = (updateFn) => {
    setInfo((prev) => ({
      ...prev, // 이전 상태 복사
      buy: updateFn(prev.buy), // buy 값만 업데이트
    }));
  };

  const [example, setExample] = useState({
    rating: 'LEGENDARY',
    title: '포토카드',
  });
  const [openModal, setOpenModal] = useState(initModal);

  const CloseModal = () => {
    setOpenModal(initModal);
  };

  const handleButtonClick = (e) => {
    if (e === '구매하기') {
      // 구매 성공 시 페이지 이동
      router.push({
        pathname: '/ModalPage',
        query: {
          type: '구매', // 동작 타입
          rating: cardDetailData.grade, // 레벨
          title: cardDetailData.name, // 제목
          quantity: info.buy, // 장 수
          id: cardDetailData.id, // id
        },
      }); // 구매 성공 페이지로 이동
    } else {
      console.log('동작 없음');
    }
  };
  console.log(exchanges);
  return (
    <div className={`mx-auto mb-[180px] w-full max-w-[1480px] tablet:max-w-[704px]`}>
      <p>CardId: {router.query.id}</p>
      <Title location="마켓플레이스" title={cardDetailData?.name} />
      <div className={`flex justify-between tablet:mt-[40px]`}>
        <div
          className={`relative h-[720px] w-full max-w-[960px] overflow-hidden tablet:h-[256px] tablet:max-w-[342px]`}
        >
          <img
            src={cardDetailData.imgUrl}
            className={`absolute h-[720px] w-[960px] object-cover tablet:h-[256px] tablet:w-[342px]`}
          />
        </div>
        <div className={`flex max-w-[440px] flex-col gap-[30px] tablet:max-w-[342px]`}>
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
              buyphoto={info.buy}
              totalphoto={cardDetailData.totalQuantity}
            />
          </div>
          <div className={`${contentborder}`}></div>
          <div className={`flex flex-col gap-[20px]`}>
            <DetailQunatityBtn
              buyphoto={info.buy}
              ClickBuyphoto={ClickBuyphoto}
              totalQuantity={cardDetailData.totalQuantity}
            />
            <DetailPrice price={cardDetailData.price * info.buy}>({info.buy}장)</DetailPrice>
          </div>

          <PrimaryButton
            label="포토카드 구매하기"
            width="w-full"
            height="80px"
            handleClick={() => {
              if (info.buy === 0) return alert('0장 이상으로 선택해주세요');
              setOpenModal({ ...openModal, standard: true });
            }}
          />
        </div>
      </div>
      {openModal.standard && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="포토카드 구매"
          modaltext={`[${cardDetailData.grade} | ${cardDetailData.name}] ${info.buy}장을 구매하시겠습니까?`}
          onClose={CloseModal}
        >
          <PrimaryButton
            label="구매하기"
            width="170px"
            height="60px"
            className="mb-[60px] mt-[60px]"
            handleClick={() => handleButtonClick('구매하기')}
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
            className="absolute bottom-[80px] right-0"
            handleClick={() => setOpenModal({ ...openModal, exchange: true })}
          />
        </Title>
      </div>
      {openModal.exchange && (
        <>
          <ModalExchange
            modalbox="max-w-[1160px] w-full h-[1000px] z-10000"
            onClose={() => setOpenModal(initModal)}
          >
            <Title location="마이갤러리" title="포토카드 교환하기" className="mb-[20px]" />
            <div className={``}>
              <DetailPheader />
              <div
                className={`flex h-[600px] flex-wrap justify-between gap-[30px] overflow-y-scroll pt-[40px]`}
              >
                {myCardList.map((card, index) => {
                  const ob = {
                    ...card,
                    owner,
                  };
                  return (
                    <Link
                      key={card.name + index}
                      className="w-[48%]"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal({ ...openModal, exchange2: true });
                        setDc(ob);
                      }}
                    >
                      <ProductCard cardProps={ob} />
                    </Link>
                  );
                })}
                {openModal.exchange2 && (
                  <ExchangeDetail
                    xBtn={() => setOpenModal(initModal)}
                    onClose={() => setOpenModal({ ...openModal, exchange2: false })}
                    title={dc.name}
                    onClick={() => {
                      exchangeApi({
                        requesterId: dc.ownerId,
                        targetCardId: cardDetailData.id,
                        offeredCardId: dc.id,
                      }).then((res) => {
                        if (res)
                          router.push({
                            pathname: '/ModalPage',
                            query: {
                              type: '교환', // 동작 타입

                              id: cardDetailData.id, // id
                            },
                          }); // 구매 성공 페이지로 이동;
                      });
                    }}
                  >
                    <div className="w-[440px]">
                      <ProductCard cardProps={dc} />
                    </div>
                  </ExchangeDetail>
                )}
              </div>
            </div>
          </ModalExchange>
        </>
      )}
      <p className={`text-white ${pointtext}`}>{cardDetailData.description}</p>
      <DetailGradeTitle
        rating={cardDetailData.grade}
        type={cardDetailData.genre}
        className={`mt-[20px] ${!!exchanges ? 'mb-[120px]' : null}`}
      />
      {openModal.cancel && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="교환 제시 취소"
          modaltext={`[${example.rating} | ${example.title}] 교환 제시를 취소하시겠습니까?`}
          onClose={() => handleCloseModal('cancel')}
        >
          <PrimaryButton
            label="취소하기"
            width="170px"
            height="60px"
            textSize="lg"
            className="mb-[60px] mt-[60px]"
            handleClick={() => handleCloseModal('cancel')}
          />
        </ModalStandard>
      )}
      {!!exchanges?.offeredCards?.length ? (
        <div>
          {exchanges?.offeredCards?.map((v) => {
            console.log(v);
            return <ProductCard cardProps={v} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
