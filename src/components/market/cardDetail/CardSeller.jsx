import tail from '@/styles/tailwindcss';
import Image from 'next/image';
import { useRouter } from 'next/router';

import DetailGradeTitle from '@/components/market/cardDetail/DetailGradeTitle';
import DetailPrice from '@/components/market/cardDetail/DetailPrice';
import DetailRemaining from '@/components/market/cardDetail/DetailRemaining';
import { ProductCard } from '@/components/market/ProductCard';
import PrimaryButton from '@/components/shared/PrimaryButton';
import SecondaryButton from '@/components/shared/SecondaryButton';
import { Title } from '@/components/shared/Title';

function CardSeller({ cardDetail }) {
  const { pointtext, flexstanderd, btnabsol, contentborder } = tail;

  const router = useRouter();

  return (
    <div className={`mx-auto w-full max-w-[1480px] tablet:max-w-[704px]`}>
      <Title location="마켓플레이스" title={cardDetail?.name} />
      <div className={`mb-[120px] flex justify-between tablet:mt-[40px]`}>
        <div
          className={`relative h-[720px] w-full max-w-[960px] overflow-hidden tablet:h-[256px] tablet:max-w-[342px]`}
        >
          <Image
            src={cardDetail.imgUrl}
            alt="Description of the image"
            fill
            className={`absolute h-[720px] w-[960px] object-cover tablet:h-[256px] tablet:w-[342px]`}
            sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"
          />
        </div>
        <div className={`flex max-w-[440px] flex-col gap-[30px] tablet:max-w-[342px]`}>
          <div className={`${flexstanderd} justify-between`}>
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
              buyphoto={cardDetail.remainingQuantity}
              totalphoto={cardDetail.totalQuantity}
            />
          </div>
          {/* 이하 스타일 임의로 인라인 처리 할테니 수정하셈 to수정*/}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottom: '1px solid white',
              paddingBottom: '10px',
            }}
          >
            <Image src={'/images/type=exchange.png'} alt={'교환아이콘'} width={28} height={28} />
            <span style={{ fontSize: '28px', fontWeight: '700', marginLeft: '10px' }}>
              교환 희망 정보
            </span>
            {/*  언더바 */}
          </div>
          <div style={{ borderBottom: '1px solid grey', paddingBottom: '30px' }}>
            {/* 교환 요청이 온 카드의 그레이드, 장르 */}
            <DetailGradeTitle
              rating={cardDetail.grade}
              type={cardDetail.genre}
              // nickname={cardData.owner?.nickName}
              className="tablet:text-lg"
              titleborder={`tablet:h-[18px] mx-[10px]`}
            />
            {/*언더바*/}
          </div>
          <p className={`text-white`} style={{ paddingBottom: '50px' }}>
            {cardDetail.description}
          </p>
          <PrimaryButton
            label="수정하기"
            width="w-full"
            height="80px"
            handleClick={() => setOpenModal({ ...openModal, standard: true })}
          />
          <SecondaryButton
            label="판매 내리기"
            width="w-full"
            height="80px"
            handleClick={() => setOpenModal({ ...openModal, standard: true })}
          />
        </div>
      </div>
      {cardDetail?.exchangesTarget.length > 0 ? (
        cardDetail?.exchangesTarget.map((row) => (
          <div className={`${flexstanderd} relative`}>
            <Title key={row.id} title="교환 제시 목록" className="mt-[120px] w-full" />
            <ProductCard key={row.id} cardProps={{ ...row.offeredCard, owner: '123' }} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default CardSeller;
