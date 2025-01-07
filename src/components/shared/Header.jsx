import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const name = "닉네임";

  const router = useRouter();

  const handleLogOut = () => {
    {/* 로그아웃 관련 기능 
      나중에 로그인,아웃에 대한 상태관리도 코드  
      */}
  };

  const handleLogo = () => {
    router.push('/');
  }

  return (
    <div>
      <header className="fixed flex items-center justify-between bg-black h-20 w-full sm:px-[100px] lg:px-[200px] z-50">
        <button onClick={handleLogo} className="relative sm:w-[111px] sm:h-5 lg:w-[139px] lg:h-6 w-[83px] h-4">
          <Image src="/images/main_logo.png" alt="logo image" fill priority />
        </button>

        <div className="flex gap-7 items-center">
          <p className="text-gray-200 font-bold leading-5 text-sm">포인트 부분</p>

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

      <header className="fixed flex items-center justify-between bg-black h-20 w-full sm:hidden px-4 z-50">
        
        <button>
          <Image
            src="/images/type=menu.png"
            alt="nav icon"
            width={24}
            height={24}
          />
        </button>

        <div className="relative w-[83px] h-4">
          <Image src="/images/main_logo.png" alt="logo image" fill priority />
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
