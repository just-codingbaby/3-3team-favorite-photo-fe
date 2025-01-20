import { useState } from 'react';

import CustomDropDown from '@/components/shared/CustomDropDown';
import EmailInput from '@/components/shared/EmailInput';
import GradeCard from '@/components/shared/GradeCard';
import Header from '@/components/shared/Header';
import PasswordInput from '@/components/shared/PasswordInput';
import Primarybutton from '@/components/shared/PrimaryButton';
import ProfileDropDown from '@/components/shared/ProfileDropDown';
import SecondaryButton from '@/components/shared/SecondaryButton';
import TextFieldInput from '@/components/shared/TextFieldInput';
import SignUpModal from '@/components/signUp/SignUpModal';

export default function SharedTestPage() {
  const [grade, setGrade] = useState('');
  const [sales, setSales] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cardName, setCardName] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCardName = (e) => {
    setCardName(e.target.value);
  };

  const gradeOptions = [
    { value: 'COMMON', label: 'COMMON' },
    { value: 'RARE', label: 'RARE' },
    { value: 'SUPER_RARE', label: 'SUPER RARE' },
    { value: 'LEGENDARY', label: 'LEGENDARY' },
  ];

  const saleStatusOptions = [
    { value: 'selling', label: '판매중' },
    { value: 'panding', label: '교환 제시 대기 중' },
  ];

  return (
    <div className="h-[2000px] w-full bg-black">
      <Header />
      <div className="relative top-20 flex flex-wrap gap-5">
        <div className="flex w-[200px] flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <h1 className="text-white">GradeCard</h1>
          <GradeCard grade="common" amount="20" size="L" />
          <GradeCard grade="rare" amount="8" size="L" />
          <GradeCard grade="super-rare" amount="3" size="M" />
          <GradeCard grade="legendary" amount="5" size="S" />
        </div>

        <div className="flex w-[200px] flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <h1 className="text-white">CustomDropDown</h1>
          <CustomDropDown label="등급" options={gradeOptions} value={grade} onChange={setGrade} />
          <CustomDropDown
            label="판매방법"
            options={saleStatusOptions}
            value={sales}
            onChange={setSales}
          />
        </div>

        <div className="flex w-[500px] flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <h1 className="text-white">PrimaryButton</h1>
          <Primarybutton label="포토카드 구매하기" width="440px" height="80px" textSize="xl" />
          <Primarybutton label="포토카드 교환하기" width="342px" height="75px" textSize="lg" />
          <Primarybutton label="승인" width="150px" height="40px" textSize="xs" />
        </div>

        <div className="flex w-[470px] flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <h1 className="text-white">SecondaryButton</h1>
          <SecondaryButton label="판매 내리기" width="440px" height="80px" textSize="xl" />
          <SecondaryButton label="포토카트 교환하기" width="342px" height="55px" textSize="sm" />
          <SecondaryButton label="거절" width="150px" height="40px" textSize="xs" />
        </div>
        <div className="flex w-auto flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <EmailInput size="L" value={email} handleChange={handleEmail} />
          <EmailInput size="M" value={email} handleChange={handleEmail} />
          <EmailInput size="S" value={email} handleChange={handleEmail} />
        </div>

        <div className="flex w-auto flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <PasswordInput size="L" value={password} handleChange={handlePassword} />
          <PasswordInput
            label="비밀번호 확인"
            size="L"
            value={password}
            handleChange={handlePassword}
          />
        </div>

        <div className="flex w-auto flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <TextFieldInput size="L" value={cardName} handleChange={handleCardName} />
        </div>

        <div className="flex w-auto flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <Primarybutton
            label="회원가입"
            width="150px"
            height="50px"
            textSize="lg"
            handleClick={handleOpen}
          />
          {isOpen && <SignUpModal handleClick={handleOpen}>성공</SignUpModal>}
        </div>
        <div className="flex w-auto flex-col gap-5 border-[1px] border-dashed border-purple-400 px-5 py-5">
          <ProfileDropDown nickName="testName" points="1000" />
        </div>
      </div>
    </div>
  );
}
