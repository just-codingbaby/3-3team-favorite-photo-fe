import PrimaryButton from "../shared/PrimaryButton";

export default function SignUpModal({children, handleClick}) {
  return (
    <div className="fixed w-screen h-screen flex items-center justify-center bg-black inset-0 bg-opacity-80">
      <div className="bg-black w-[400px] h-[220px] rounded-lg border border-white flex flex-col items-center justify-center text-customMain text-lg gap-10">
        {children}
        <PrimaryButton label="닫기" width="200px" height="40px" textSize='base' handleClick={handleClick}/>
      </div>
    </div>
  )
}