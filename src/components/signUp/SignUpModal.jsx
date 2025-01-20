import PrimaryButton from '../shared/PrimaryButton';

export default function SignUpModal({ children, handleClick }) {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80">
      <div className="flex h-[220px] w-[400px] flex-col items-center justify-center gap-10 rounded-lg border border-white bg-black text-lg text-customMain">
        {children}
        <PrimaryButton
          label="닫기"
          width="200px"
          height="40px"
          textSize="base"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
