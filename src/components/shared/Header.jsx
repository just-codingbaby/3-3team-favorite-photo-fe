import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const getProfile = async (email) => {
  try {
    const { data } = await axios.get(`/api/v1/users/profile/${email}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default function Header() {
  const router = useRouter();
  const { user, login, logout } = useAuth();
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user.email),
    enabled: !!user,
  });

  const handleLogOut = () => {
    logout();
  };

  // if (!user) return <div></div>;
  if (isLoading) return <p>로딩 중입니다...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="sticky top-0 z-50 w-full bg-background whitespace-nowrap">
      <header className="hidden tb:flex items-center justify-between h-20 w-full px-20 py-6 lt:px-55 lt:py-7">
        <Link href="/market" className="min-w-[111px] h-5 lt:w-[138.9px] lt:h-[25.2px]">
          <Image src="/images/main_logo.png" alt="최애의 포토 로고" width={138} height={25} />
        </Link>
        {user ? (
          <div className="flex gap-7 items-center">
            <p className="text-gray-200 font-bold leading-5 text-sm">{profile.points}</p>

            <button>
              <Image
                src="/images/type=alarm_default.png"
                width={24}
                height={24}
                alt="알람 이미지"
              />
            </button>

            <p className="text-gray-200 font-baskin font-normal leading-[18.43px]">
              {profile.nickName}
            </p>

            <div className="text-gray-400 font-normal text-sm leading-5 gap-7 flex">
              <p>|</p>
              <button onClick={handleLogOut}>로그아웃</button>
            </div>
          </div>
        ) : (
          <div className="flex gap-[30px] font-medium text-sm leading-5">
            <button
              className="hover:text-customMain"
              onClick={() => {
                router.push("/login");
              }}
            >
              로그인
            </button>
            <button
              className="hover:text-customMain"
              onClick={() => {
                router.push("/signup");
              }}
            >
              회원가입
            </button>
          </div>
        )}
      </header>

      <header className="sticky top-0 flex items-center justify-between bg-background h-20 w-full tb:hidden px-4 z-50">
        <button>
          <Image src="/images/type=menu.png" alt="nav icon" width={24} height={24} />
        </button>

        <div>
          <Image src="/images/main_logo.png" alt="최애의포토 로고" width={83} height={15} />
        </div>

        <button>
          <Image src="/images/type=alarm_default.png" alt="alarm icon" width={24} height={24} />
        </button>
      </header>
    </div>
  );
}
