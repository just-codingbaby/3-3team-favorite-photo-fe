import { useRouter } from "next/router";
import { useState } from "react";
import CardBuyer from "@/components/market/cardDetail/CardBuyer";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/axios";
import { useAuth } from "@/contexts/AuthProvider";
import CardSeller from "@/components/market/cardDetail/CardSeller";

const initModal = {
  standard: false,
  exchange: false,
  cancel: false,
};

async function detailApi(id) {
  if (!id) {
    return;
  }
  try {
    const response = await instance.get(`/api/v1/shop/cards/${id}`);
    return await response.data;
  } catch (e) {
    console.error("error", e);
  }
}

export default function Page({}) {
  const router = useRouter();
  const { user } = useAuth();
  console.log("==============user", user);

  const { id } = router.query;
  console.log("==============id", id);

  const [openModal, setOpenModal] = useState(initModal);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   setData(detailApi(2).then((res) => setData(res)));
  // }, []);

  const { data: card, isLoading } = useQuery({
    queryKey: ["card", id],
    queryFn: () => detailApi(id),
  });

  console.log("===============card", card);

  const handleCloseModal = (modalType) => {
    setOpenModal((prev) => ({
      ...prev,
      [modalType]: false, // 전달받은 모달 타입을 닫음
    }));
    console.log(`${modalType} 모달이 닫혔습니다.`);
  };

  const cardDetailData = card?.cardData ?? {};
  const cardExchangeDataList = card?.cardExchangeDataList ?? [];

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  console.log(user?.id === cardDetailData.ownerId);

  return (
    <>
      {user?.id === cardDetailData.ownerId ? (
        <CardSeller
          cardDetailData={cardDetailData}
          cardExchangeDataList={cardExchangeDataList}
        />
      ) : (
        <CardBuyer
          cardDetailData={cardDetailData}
          cardExchangeDataList={cardExchangeDataList}
        />
      )}
    </>
  );
}
