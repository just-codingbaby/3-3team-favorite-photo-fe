import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="pt-20 flex justify-center">
      <button
        className="relative top-60 border border-customMain p-5 rounded-xl"
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
}
