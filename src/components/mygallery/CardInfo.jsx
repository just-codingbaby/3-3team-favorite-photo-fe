export default function CardInfo({ style, grade, genre, purchase, price }) {
  // 등급과 장르 텍스트 변환
  const gradeText =
    grade === 0
      ? "COMMON"
      : grade === 1
      ? "RARE"
      : grade === 2
      ? "SUPER RARE"
      : grade === 3
      ? "LEGENDARY"
      : "등급정보없음";

  const genreText =
    genre === 0
      ? "풍경"
      : genre === 1
      ? "인물"
      : genre === 2
      ? "동물"
      : genre === 3
      ? "정물"
      : genre === 4
      ? "추상"
      : "기타";

  return (
    <div
      className={`flex ${style === "medium" ? "gap-4 text-lg font-bold" : "gap-2 text-sm font-normal"}`}
    >
      {/* 등급 표시 */}
      <div
        className={`${
          gradeText === "COMMON"
            ? "text-green-500"
            : gradeText === "RARE"
            ? "text-blue-500"
            : gradeText === "SUPER RARE"
            ? "text-purple-500"
            : gradeText === "LEGENDARY"
            ? "text-pink-500"
            : "text-gray-500"
        }`}
      >
        {gradeText}
      </div>

      {/* 구분자 표시 */}
      <div className="text-gray-400">|</div>

      {/* 장르 표시 */}
      <div className="text-gray-300">{genreText}</div>

      {/* 구매 여부 및 가격 표시 */}
      {purchase && (
        <>
          <div className="text-gray-400">|</div>
          <div className="flex gap-1 text-gray-300">
            <span className="text-white">{price} P</span>에 구매
          </div>
        </>
      )}
    </div>
  );
}
