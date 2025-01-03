import tail from "@/styles/tailwindcss";
import Buyer, { Btn } from "@/components/buyer";
import { Gradetitle } from "@/components/buyer";

export default function Salesphotocard({ rating, title, color, mt }) {
  const {
    header,
    marketlogo,
    btn,
    titles,
    afborder,
    pointtext,
    flexstanderd,
    h3font,
    titleborder,
    btnabsol,
  } = tail;
  return (
    <div className={`bg-black`}>
      <div className={`${header} text-white`}>헤더야</div>
      <div className={`mx-56 mb-[2000px] border border-customBlue`}>
        <div className={`${marketlogo}  `}>마켓플레이스</div>
        <h2 className={`${titles} ${afborder} text-white`}>우리집 앞마당</h2>
        <div className={`flex gap-[80px] mt-[60px]`}>
          <img
            src="images/type=sample_img1.png"
            className={`w-[960px] h-[720px]`}
          />
          <Buyer
            nickname="미쓰손"
            content="우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. "
            price="4"
            buyphoto="2"
            totalphoto="5"
          />
        </div>
        <div className={`${flexstanderd} relative`}>
          <h2 className={`${titles} ${afborder} text-white mt-[120px] w-full`}>
            교환 희망 정보
          </h2>
          <Btn
            btname="포토카드 교환하기"
            width="w-[440px]"
            height="h-[60px]"
            mt="mt-[120px]"
            fontsize="text-lg"
            absolute={btnabsol}
          />
          {/* <button
            className={`${btn} w-[440px] h-[60px] text-xl mt-[50px] absolute`}
          >
            포토카드 교환하기
          </button> */}
        </div>
        <p className={`text-white mt-[60px] ${pointtext}`}>
          푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.
          나중에 뚫어야할 부분임
        </p>
        <Gradetitle
          rating="RARE"
          title="풍경"
          color="text-customBlue "
          mt="mt-[20px]"
        />
      </div>
    </div>
  );
}
