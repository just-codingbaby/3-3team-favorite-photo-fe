import { useAuth } from "@/contexts/AuthProvider"

export default function Me() {
  const { user, isLoading } = useAuth();

  if(isLoading) {
    return <p>로딩 중입니다</p>
  }

  if (!user) {
    return <p>로그인하지 않았습니다.</p>; // 유저 정보가 없을 때
  }

  return (
    <div>
      <h1>환영합니다, {user.nickName}님!</h1>
      <p>이메일: {user.email}</p>
    </div>
  );  
}