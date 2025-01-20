import { useState } from 'react';

import { useAuth } from '@/contexts/AuthProvider';
import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import NotificationList from '../alarm/alarm';
import ProfileDropDown from './ProfileDropDown';

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
  const { user, logout } = useAuth();
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(user.email),
    enabled: !!user,
  });

  // 알림 목록 토글 상태
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // 알림 토글 함수
  const toggleNotificationList = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    logout();
  };

  if (isLoading) return <p>로딩 중입니다...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="sticky top-0 z-10 w-full whitespace-nowrap bg-background">
      <header className="hidden h-20 w-full items-center justify-between px-20 py-6 tb:flex lt:px-55 lt:py-7">
        <Link href="/market" className="h-5 min-w-[111px] lt:h-[25.2px] lt:w-[138.9px]">
          <Image src="/images/main_logo.png" alt="최애의 포토 로고" width={138} height={25} />
        </Link>
        {user ? (
          <div className="flex items-center gap-7">
            <p className="text-sm font-bold leading-5 text-gray-200">{profile.points}</p>

            {/* 알림 버튼 */}
            <button onClick={toggleNotificationList}>
              <Image
                src="/images/type=alarm_default.png"
                width={24}
                height={24}
                alt="알람 이미지"
              />
            </button>
            {/* 알림 목록 */}
            {isNotificationOpen && <NotificationList userId={user.id} />}

            <ProfileDropDown nickName={profile.nickName} points={profile.points} />

            <div className="flex gap-7 text-sm font-normal leading-5 text-gray-400">
              <p>|</p>
              <button onClick={handleLogOut}>로그아웃</button>
            </div>
          </div>
        ) : (
          <div className="flex gap-[30px] text-sm font-medium leading-5">
            <button
              className="hover:text-customMain"
              onClick={() => {
                router.push('/login');
              }}
            >
              로그인
            </button>
            <button
              className="hover:text-customMain"
              onClick={() => {
                router.push('/signup');
              }}
            >
              회원가입
            </button>
          </div>
        )}
      </header>

      <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between bg-background px-4 tb:hidden">
        <button>
          <Image src="/images/type=menu.png" alt="nav icon" width={24} height={24} />
        </button>

        <div>
          <button
            type="button"
            onClick={() =>
              router.pathname === 'market' ? router.reload() : router.push('/market')
            }
          >
            <Image src="/images/main_logo.png" alt="최애의포토 로고" width={83} height={15} />
          </button>
        </div>

        <button>
          <Image src="/images/type=alarm_default.png" alt="alarm icon" width={24} height={24} />
        </button>
      </header>
    </div>
  );
}
