import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const name = "닉네임";
  const handleLogOut = () => {
    {
      /* 로그아웃 관련 기능
      나중에 로그인,아웃에 대한 상태관리도 코드
      */
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-background whitespace-nowrap">
      <header className="hidden tb:flex items-center justify-between h-20 w-full px-20 py-6 lt:px-55 lt:py-7">
        <Link
          href="/market"
          className="min-w-[111px] h-5 lt:w-[138.9px] lt:h-[25.2px]"
        >
          <Image
            src="/images/main_logo.png"
            alt="최애의 포토 로고"
            width={138}
            height={25}
          />
        </Link>

        <div className="flex gap-7 items-center">
          <p className="text-gray-200 font-bold leading-5 text-sm">
            포인트 부분
          </p>

          <button>
            <Image
              src="/images/type=alarm_default.png"
              width={24}
              height={24}
              alt="알람 이미지"
            />
          </button>

          <p className="text-gray-200 font-baskin font-normal leading-[18.43px]">
            {name}
          </p>

          <div className="text-gray-400 font-normal text-sm leading-5 gap-7 flex">
            <p>|</p>
            <button onClick={handleLogOut}>로그아웃</button>
          </div>
        </div>
      </header>

      <header className="sticky top-0 flex items-center justify-between bg-background h-20 w-full tb:hidden px-4 z-50">
        <button>
          <Image
            src="/images/type=menu.png"
            alt="nav icon"
            width={24}
            height={24}
          />
        </button>

        <div>
          <Image
            src="/images/main_logo.png"
            alt="최애의포토 로고"
            width={83}
            height={15}
          />
        </div>

        <button>
          <Image
            src="/images/type=alarm_default.png"
            alt="alarm icon"
            width={24}
            height={24}
          />
        </button>
      </header>
    </div>
  );
}
