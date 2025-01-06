import CustomDropDown from "@/components/shared/CustomDropDown";
import GradeCard from "@/components/shared/GradeCard";
import Header from "@/components/shared/Header";
import Primarybutton from "@/components/shared/PrimaryButton";
import { useState } from "react";

export default function SharedTestPage() {
  const [grade, setGrade] = useState("");
  const [sales, setSales] = useState("");

  const gradeOptions = [
    { value: "COMMON", label: "COMMON" },
    { value: "RARE", label: "RARE" },
    { value: "SUPER_RARE", label: "SUPER RARE" },
    { value: "LEGENDARY", label: "LEGENDARY" },
  ];

  const saleStatusOptions = [
    { value: "selling", label: "판매중" },
    { value: "panding", label: "교환 제시 대기 중" },
  ];

  return (
    <div className="bg-black w-full h-[2000px]">
      <Header />
      <div className="flex relative top-20 gap-5">
        <div className="flex flex-col gap-5 border-dashed border-purple-400 border-[1px] px-5 py-5 w-[200px]">
          <h1 className="text-white">GradeCard</h1>
          <GradeCard grade="common" amount="20" size="L" />
          <GradeCard grade="rare" amount="8" size="L" />
          <GradeCard grade="super-rare" amount="3" size="M" />
          <GradeCard grade="legendary" amount="5" size="S" />
        </div>

        <div className="flex flex-col gap-5 border-dashed border-purple-400 border-[1px] px-5 py-5 w-[200px]">
          <CustomDropDown
            label="등급"
            options={gradeOptions}
            value={grade}
            onChange={setGrade}
          />
          <CustomDropDown
            label="판매방법"
            options={saleStatusOptions}
            value={sales}
            onChange={setSales}
          />
        </div>

        <div className="flex flex-col gap-5 border-dashed border-purple-400 border-[1px] px-5 py-5 w-[500px]">
          <Primarybutton label="포토카드 구매하기" width="440px" height="80px" textSize="xl" />
          <Primarybutton label="포토카드 교환하기" width="342px" height="75px" textSize="lg" />
          <Primarybutton label="승인" width="150px" height="40px" textSize="xs" />
        </div>
      </div>
    </div>
  );
}
