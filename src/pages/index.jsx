import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="flex justify-center pt-20">
      <button
        className="relative top-60 rounded-xl border border-customMain p-5"
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
}
