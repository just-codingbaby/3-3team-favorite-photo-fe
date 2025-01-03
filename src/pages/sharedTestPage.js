import GradeCard from "@/components/shared/GradeCard";
import Header from "@/components/shared/Header";

export default function SharedTestPage() {
  return (
    <div className="bg-black w-full h-[2000px]">
      <Header />
      <div className="relative top-20">
        <div className="flex flex-col gap-5 border-dashed border-purple-400 border-[1px] px-5 py-5 w-[200px]">
          <h1 className="text-white">GradeCard</h1>
          <GradeCard grade="common" amount="20" size="L" />
          <GradeCard grade="rare" amount="8" size="L" />
          <GradeCard grade="super-rare" amount="3" size="M" />
          <GradeCard grade="legendary" amount="5" size="S" />
        </div>


      </div>
    </div>
  );
}
