export function BaseCard({ props }) {
  return (
    <div className="bg-gray-200 min-w-[170px] min-h-[234px] justify-center p-2.5 grid grid-cols-1 grid-rows-2 tb:w-[342px] tb:h-[517px] tb:p-5 lt:w-[440px] lt:p-10 lt:h-[600px]">
      <div className="bg-gray-300 h-auto min-w-[150px]">
        카드 컴포넌트 {props}
      </div>
      <div>
        <ul>
          <li>카드이름</li>
          <li>가격</li>
        </ul>
      </div>
    </div>
  );
}
