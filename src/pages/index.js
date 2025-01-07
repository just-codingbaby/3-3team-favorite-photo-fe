import tail from "@/styles/tailwindcss";
import Link from "next/link";
import Salesphotocard from "./salesphotocard";

export default function Home({ title }) {
  const { flexcenter, aa } = tail;
  return (
    <div>
      <div className={`${flexcenter} text-[80px] mb-[100px] text-white`}>
        랜딩 페이지입니다
      </div>
      <Link
        href="/salesphotocard"
        className={`${flexcenter} text-[80px] text-customPink`}
      >
        Sales photo card
      </Link>
    </div>
  );
}
