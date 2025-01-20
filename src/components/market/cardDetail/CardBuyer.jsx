import { useState } from 'react';

import { useAuth } from '@/contexts/AuthProvider';
import instance from '@/lib/axios';
import fallbackImg from '@/public/images/card/img_default-temp.webp';
import soldOutImg from '@/public/images/type=soldout.png';
import tail from '@/styles/tailwindcss';
import Image from 'next/image';
import { useRouter } from 'next/router';

import DetailGradeTitle from '@/components/market/cardDetail/DetailGradeTitle';
import DetailPrice from '@/components/market/cardDetail/DetailPrice';
import DetailQunatityBtn from '@/components/market/cardDetail/DetailQunatityBtn';
import DetailRemaining from '@/components/market/cardDetail/DetailRemaining';
import ModalExchange from '@/components/market/cardDetail/ModalExchange';
import { Title } from '@/components/shared/Title';

import { ModalStandard } from '../../modal';
import PrimaryButton from '../../shared/PrimaryButton';
import { ProductCard } from '../ProductCard';

const initModal = {
  purchase: false,
  purchaseWarn: false,
  exchange: false,
  cancel: false,
};

// 제일 큰 틀
export default function CardBuyer({ cardDetail, myCardList }) {
  const { pointtext, flexstanderd, contentborder } = tail;

  const router = useRouter();
  const { user: owner } = useAuth();

  const [buyCardQuantity, setBuyCardQuantity] = useState(0);
  const [isValidImgUrl, setIsValidImgUrl] = useState(true);
  const [openModal, setOpenModal] = useState(initModal);

  const handleCloseModal = () => {
    setOpenModal(initModal);
  };

  const handlePurchaseButtonClick = async () => {
    try {
      const body = {
        cardId: cardDetail.id,
        quantity: buyCardQuantity,
        userId: owner.id,
      };

      await instance.post('/api/v1/cards/detail/purchase', body).then((res) => {
        console.log(res);
        router.replace({
          pathname: '/result',
          query: {
            type: 'purchase',
            rating: cardDetail.grade,
            title: cardDetail.name,
            quantity: buyCardQuantity,
          },
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleExchangeButtonClick = async (body) => {
    try {
      const res = await instance.post('/api/v1/cards/detail/exchange', body).then((res) => {
        router.replace({
          pathname: '/result',
          query: {
            type: 'exchange',
            rating: cardDetail.grade,
            title: cardDetail.name,
            quantity: cardDetail.remainingQuantity,
          },
        });
      });

      // return await res.data;
    } catch (e) {
      console.error(e);
    }
  };

  console.log('cardDetail', cardDetail);

  return (
    <div className={`mx-auto mb-[180px] w-full max-w-[1480px] tablet:max-w-[704px]`}>
      <Title location="마켓플레이스" title={cardDetail?.name} />
      <div className={`flex justify-between tablet:mt-[40px]`}>
        <div
          className={`relative h-[720px] w-full max-w-[960px] overflow-hidden tablet:h-[256px] tablet:max-w-[342px]`}
        >
          <Image
            src={isValidImgUrl ? cardDetail.imgUrl : fallbackImg}
            alt={'cardImg'}
            onError={() => setIsValidImgUrl(false)}
            fill
            className={`absolute h-[720px] w-[960px] object-cover tablet:h-[256px] tablet:w-[342px]`}
            sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"
          />
          {cardDetail.remainingQuantity < 1 && (
            <Image
              className="absolute inset-0 bg-black bg-opacity-50 object-contain object-center"
              src={soldOutImg}
              alt={name}
              fill
              sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"
            />
          )}
        </div>
        <div className={`flex w-full max-w-[440px] flex-col gap-[30px] tablet:max-w-[342px]`}>
          <div className={`${flexstanderd} justify-between`}>
            {console.log('cardDetail', cardDetail)}
            <DetailGradeTitle
              rating={cardDetail.grade}
              type={cardDetail.genre}
              nickname={cardDetail.owner?.nickName}
              className="tablet:text-lg"
              titleborder={`tablet:h-[18px] mx-[10px]`}
            />
          </div>
          <div className={`${contentborder}`}></div>
          <p className={`text-white`}>{cardDetail.description}</p>
          <div className={`${contentborder}`}></div>
          <div className={`flex flex-col gap-[10px]`}>
            <DetailPrice
              price={cardDetail.price}
              titletext="tablet:text-lg"
              pricetext="tablet:text-xl"
            />
            <DetailRemaining
              titletext="tablet:text-lg"
              buytext="tablet:text-xl"
              remaintext="tablet:text-xl"
              remainPhoto={cardDetail.remainingQuantity}
              totalphoto={cardDetail.totalQuantity}
            />
          </div>
          <div className={`${contentborder}`}></div>
          <div className={`flex flex-col gap-[20px]`}>
            <DetailQunatityBtn
              buyphoto={buyCardQuantity}
              clickBuyPhoto={(updateFn) => setBuyCardQuantity((prevState) => updateFn(prevState))}
              totalQuantity={cardDetail.totalQuantity}
            />
            <DetailPrice price={cardDetail.price * buyCardQuantity}>
              ({buyCardQuantity}장)
            </DetailPrice>
          </div>

          <PrimaryButton
            label="포토카드 구매하기"
            width="w-full"
            height="80px"
            handleClick={() => {
              if (buyCardQuantity === 0) {
                setOpenModal({ ...openModal, purchaseWarn: true });
                return;
              }

              setOpenModal({ ...openModal, purchase: true });
            }}
          />
        </div>
      </div>
      {openModal.purchaseWarn && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="경고!"
          modaltext={'0장 이상으로 선택해주세요'}
          onClose={handleCloseModal}
        >
          <PrimaryButton
            label="확인"
            width="170px"
            height="60px"
            className="mb-[60px] mt-[60px]"
            handleClick={() => handleCloseModal()}
          />
        </ModalStandard>
      )}
      {openModal.purchase && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="포토카드 구매"
          modaltext={`[${cardDetail.grade} | ${cardDetail.name}] ${buyCardQuantity}장을 구매하시겠습니까?`}
          onClose={handleCloseModal}
        >
          <PrimaryButton
            label="구매하기"
            width="170px"
            height="60px"
            className="mb-[60px] mt-[60px]"
            handleClick={() => handlePurchaseButtonClick()}
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
        <ModalExchange
          initModal={initModal}
          openModal={openModal}
          setOpenModal={setOpenModal}
          cardDetail={cardDetail}
          myCardList={myCardList}
          saveExchange={handleExchangeButtonClick}
        />
      )}

      <p className={`text-white ${pointtext}`}>{cardDetail.description}</p>
      <DetailGradeTitle
        rating={cardDetail.grade}
        type={cardDetail.genre}
        className={`mt-[20px] ${cardDetail?.exchangesTarget.length > 0 ? 'mb-[120px]' : null}`}
      />
      {openModal.cancel && (
        <ModalStandard
          modalbox="w-[560px] h-[352px] bg-[#161616]"
          modaltitle="교환 제시 취소"
          modaltext={`[${example.rating} | ${example.title}] 교환 제시를 취소하시겠습니까?`}
          onClose={() => handleCloseModal()}
        >
          <PrimaryButton
            label="취소하기"
            width="170px"
            height="60px"
            textSize="lg"
            className="mb-[60px] mt-[60px]"
            handleClick={() => handleCloseModal()}
          />
        </ModalStandard>
      )}

      {/* {cardDetail?.exchangesTarget.length > 0 ? (
        <div>
          <Title title="내가 제시한 교환 목록" className="mt-[120px] w-full" />
          {cardDetail?.exchangesTarget.map((v) => (
            <ProductCard key={v.name} cardProps={{ ...v.offeredCard, owner: owner }} />
          ))}
        </div>
      ) : null} */}
      {cardDetail?.exchangesTarget.length > 0 ? (
        <div>
          <Title title="내가 제시한 교환 목록" className="mt-[120px] w-full" />
          {cardDetail?.exchangesTarget.map((v) => {
            return <ProductCard key={v.name} cardProps={{ ...v, owner: owner }} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
