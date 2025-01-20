import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthProvider";
import instance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import CardBuyer from "@/components/market/cardDetail/CardBuyer";
import CardSeller from "@/components/market/cardDetail/CardSeller";

export default function Page({}) {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const [myCardList, setMyCardList] = useState([]);
  const { data: card, isLoading } = useQuery({
    queryKey: ["card", id],
    queryFn: () => getCardDetail(id),
  });

  const getCardDetail = async (id) => {
    if (!id) return;
    try {
      const response = await instance.get(`/api/v1/cards/detail/${id}`);
      return await response.data;
    } catch (e) {
      console.error("error", e);
    }
  };

  const getMyCardList = async (userId) => {
    if (!userId) return;

    try {
      const response = await instance
        .get(`/api/v1/cards/detail/mycard/${userId}`)
        .then((res) => {
          console.log(res);
          setMyCardList(res.data);
        });
    } catch (e) {
      console.error("error", e);
    }
  };

  useEffect(() => {
    getMyCardList(user?.id);
  }, [user]);

  if (!user) return null;

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  console.log(card);

  return (
    <>
      {user?.id === card.ownerId ? (
        <CardSeller cardDetail={card} />
      ) : (
        <CardBuyer cardDetail={card} myCardList={myCardList} />
      )}
    </>
  );
}
