import { useEffect, useState } from 'react';

export default function RandomPointModal() {
  const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태
  const [points, setPoints] = useState(null); // 랜덤 포인트
  const [timer, setTimer] = useState(3600); // 타이머: 1시간 (초 단위)

  // 초기 설정: 마지막 모달 오픈 시간 확인
  useEffect(() => {
    const lastOpenedTime = localStorage.getItem('lastModalTime');
    const currentTime = Math.floor(Date.now() / 1000);

    if (lastOpenedTime) {
      const timeDifference = currentTime - parseInt(lastOpenedTime, 10);
      if (timeDifference >= 3600) {
        setIsOpen(true); // 1시간이 지났다면 모달 열기
      } else {
        setTimer(3600 - timeDifference); // 남은 시간 계산
      }
    } else {
      setIsOpen(true); // 처음 방문한 경우 모달 열기
    }
  }, []);

  // 타이머 업데이트.
  useEffect(() => {
    if (timer > 0 && !isOpen) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isOpen]);

  const handleOpenModal = () => {
    if (timer === 0) {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    const currentTime = Math.floor(Date.now() / 1000);
    localStorage.setItem('lastModalTime', currentTime.toString());
  };

  const handleRandomPoint = (boxId) => {
    const randomPoints = [500, 1000, 1500];
    const selectedPoints = randomPoints[Math.floor(Math.random() * randomPoints.length)];
    setPoints(selectedPoints);
    console.log(`🎁 선택한 상자 ID: ${boxId}, 지급된 포인트: ${selectedPoints}`);
    handleCloseModal();
    setTimer(3600); // 타이머 초기화
  };

  return (
    <div className="relative">
      {/* 모달 열기 버튼 */}
      <button
        onClick={handleOpenModal}
        disabled={timer > 0}
        className="rounded bg-yellow-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        랜덤 포인트 받기
      </button>

      {/* 타이머 표시 */}
      {timer > 0 && (
        <p className="mt-4 text-gray-200">
          다음 기회까지 남은 시간:{' '}
          <span className="font-bold">
            {Math.floor(timer / 60)}분 {timer % 60}초
          </span>
        </p>
      )}

      {/* 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative h-[646px] w-[1034px] rounded-md bg-gray-800 p-6 text-white shadow-lg">
            <h2 className="mb-4 text-center text-4xl font-bold">랜덤포인트</h2>
            <p className="mb-8 text-center text-lg">랜덤 상자를 열어 포인트를 얻어보세요!</p>

            {/* 선물 상자 버튼 */}
            <div className="flex justify-center space-x-8">
              {/* 상자 1 */}
              <button onClick={() => handleRandomPoint(1)} className="h-[191px] w-[246px]">
                <img
                  src="/images/bluepointbox.png"
                  alt="선물 상자 1"
                  className="h-full w-full object-contain"
                />
              </button>

              {/* 상자 2 */}
              <button onClick={() => handleRandomPoint(2)} className="h-[191px] w-[246px]">
                <img
                  src="/images/purplepointbox.png"
                  alt="선물 상자 2"
                  className="h-full w-full object-contain"
                />
              </button>

              {/* 상자 3 */}
              <button onClick={() => handleRandomPoint(3)} className="h-[191px] w-[246px]">
                <img
                  src="/images/redpointbox.png"
                  alt="선물 상자 3"
                  className="h-full w-full object-contain"
                />
              </button>
            </div>

            {/* 모달 닫기 버튼 */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* 포인트 결과 */}
      {points && <p className="mt-4 text-green-400">축하합니다! {points} 포인트를 얻으셨습니다!</p>}
    </div>
  );
}
