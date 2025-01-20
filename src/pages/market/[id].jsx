import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthProvider';
import instance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import { useRouter } from 'next/router';

import CardBuyer from '@/components/market/cardDetail/CardBuyer';
import CardSeller from '@/components/market/cardDetail/CardSeller';

const initModal = {
  standard: false,
  exchange: false,
  cancel: false,
};

async function detailApi(id) {
  if (!id) return;
  try {
    const response = await instance.get(`/api/v1/cards/detail/${id}`);
    return await response.data;
  } catch (e) {
    console.error('error', e);
  }
}

async function myCardApi(userId) {
  if (!userId) return;

  try {
    const response = await instance.get(`/api/v1/cards/detail/mycard/${userId}`);
    return await response.data;
  } catch (e) {
    console.error('error', e);
  }
}

export default function Page({}) {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const [myCard, setMc] = useState([]);
  const { data: card, isLoading } = useQuery({
    queryKey: ['card', id],
    queryFn: () => detailApi(id),
  });

  useEffect(() => {
    myCardApi(user?.id).then((res) => {
      setMc(res);
    });
  }, [user]);

  const cardExchangeDataList = [];
  if (!user) return null;

  card?.exchangesTarget.map((v, i) => {
    cardExchangeDataList.push({ ...v.offeredCard, owner: card.exchangerNickName[i] });
  });
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      {user?.id === card.ownerId ? (
        <CardSeller cardDetailData={card} cardExchangeDataList={cardExchangeDataList} />
      ) : (
        <CardBuyer cardDetailData={card} myCardList={myCard} owner={user} />
      )}
    </>
  );
}
