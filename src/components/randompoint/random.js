import { useState, useEffect } from "react";

export default function RandomPointModal() {
  const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태
  const [points, setPoints] = useState(null); // 랜덤 포인트
  const [timer, setTimer] = useState(3600); // 타이머: 1시간 (초 단위)

  useEffect(() => {
    // 로컬 스토리지에서 마지막으로 모달을 본 시간을 가져옴
    const lastOpenedTime = localStorage.getItem("lastModalTime");
    const currentTime = Math.floor(Date.now() / 1000);

    if (lastOpenedTime) {
      const timeDifference = currentTime - parseInt(lastOpenedTime, 10);
      if (timeDifference >= 3600) {
        // 1시간이 지났다면 모달 열기
        setIsOpen(true); 
      } else {
        // 남은 시간 계산
        setTimer(3600 - timeDifference);
      }
    } else {
      // 처음 방문한 경우 모달 열기
      setIsOpen(true); 
    }
  }, []);

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
    localStorage.setItem("lastModalTime", currentTime.toString());
  };

  const handleRandomPoint = () => {
    const randomPoints = [500, 1000, 1500];
    const selectedPoints = randomPoints[Math.floor(Math.random() * randomPoints.length)];
    setPoints(selectedPoints);
    handleCloseModal();
    setTimer(3600); // 타이머 초기화
  };

  return (
    <div>
      <button onClick={handleOpenModal} disabled={timer > 0} className="open-modal-btn">
        랜덤 포인트 받기
      </button>

      {timer > 0 && (
        <p className="timer-text">
          다음 기회까지 남은 시간:{" "}
          <span className="time">
            {Math.floor(timer / 60)}분 {timer % 60}초
          </span>
        </p>
      )}

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">랜덤포인트</h2>
            <p className="modal-description">랜덤 상자를 열어 포인트를 얻어보세요!</p>
            <button onClick={handleRandomPoint} className="modal-open-btn">
              🎁 상자 열기
            </button>
            <button onClick={handleCloseModal} className="modal-close-btn">
              ✖
            </button>
          </div>
        </div>
      )}

      {points && <p className="points-text">축하합니다! {points} 포인트를 얻으셨습니다!</p>}
    </div>
  );
}
