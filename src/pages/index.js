// import { flexcenter, aa } from "@/styles/tailwindcss";
import tail from "@/styles/tailwindcss";
import Link from "next/link";
import Salesphotocard from "./salesphotocard";

export default function Home() {
  const { flexcenter, aa } = tail;
  return (
    <>
      <div className={`${flexcenter} ${aa}`}>랜딩 페이지입니다</div>
      <Link href="/salesphotocard">Sales photo card</Link>
    </>
  );
}
