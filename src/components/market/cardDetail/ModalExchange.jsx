import { DetailPheader } from "@/components/modal";
import { Title } from "@/components/shared/Title";
import Link from "next/link";
import { ProductCard } from "@/components/market/ProductCard";
import { useAuth } from "@/contexts/AuthProvider";
import { useState } from "react";
import ModalWrapper from "@/components/market/cardDetail/ModalWrapper";
import ModalExchangeDetail from "@/components/market/cardDetail/ModalExchangeDetail";

function ModalExchange({
  className,
  initModal,
  openModal,
  setOpenModal,
  cardDetail,
  myCardList,
  saveExchange,
}) {
  const { user: owner } = useAuth();
  const [clickedCardDetail, setClickedCardDetail] = useState({});

  return (
    <ModalWrapper className={className} onClose={() => setOpenModal(initModal)}>
      <Title
        location="마이갤러리"
        title="포토카드 교환하기"
        className="mb-[20px]"
      />
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
                  setClickedCardDetail(ob);
                }}
              >
                <ProductCard cardProps={ob} />
              </Link>
            );
          })}
          {openModal.exchange2 && (
            <ModalExchangeDetail
              xBtn={() => setOpenModal(initModal)}
              onClose={() => setOpenModal({ ...openModal, exchange2: false })}
              title={cardDetail.name}
              onClick={() =>
                saveExchange({
                  requesterId: owner.id,
                  targetCardId: cardDetail.id,
                  offeredCardId: clickedCardDetail.id,
                })
              }
            >
              <div className="w-[440px]">
                <ProductCard
                  cardProps={{ ...clickedCardDetail, owner: owner }}
                />
              </div>
            </ModalExchangeDetail>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ModalExchange;
