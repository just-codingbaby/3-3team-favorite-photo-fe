import axios from "axios";

const handleRandomPoint = async (boxNumber) => {
  try {
    const response = await fetch("/api/claim-points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: 1 }), // userId는 현재 유저의 ID로 변경
    });

    if (response.ok) {
      const data = await response.json();
      setPoints(data.earnedPoints); // 받은 포인트를 상태로 저장
      alert(`축하합니다! ${data.earnedPoints} 포인트를 얻으셨습니다.`);
    } else {
      const errorData = await response.json();
      if (errorData.remainingTime) {
        alert(
          `아직 뽑을 수 없습니다. 남은 시간: ${Math.floor(
            errorData.remainingTime / 60
          )}분 ${errorData.remainingTime % 60}초`
        );
      } else {
        alert("포인트 뽑기에 실패했습니다.");
      }
    }
  } catch (error) {
    console.error("API 호출 에러:", error);
    alert("서버와의 통신 중 문제가 발생했습니다.");
  }
};
