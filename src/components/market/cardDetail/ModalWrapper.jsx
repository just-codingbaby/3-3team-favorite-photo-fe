import tail from "@/styles/tailwindcss";
import { CloseBtn } from "@/components/modal";

function ModalWrapper({ modalbox, children, onClick, onClose, className }) {
  const { dimbg } = tail;

  return (
    <div className={`${dimbg} ${className} bg-opacity-80`} onClick={onClick}>
      <div
        className={`${modalbox} relative mx-auto border border-white bg-[#161616]`}
      >
        <CloseBtn
          position="top-[150px] right-[180px] absolute"
          onClose={onClose}
        />
        <div className={`mx-auto max-w-[920px] bg-[#161616]`}>{children}</div>
      </div>
    </div>
  );
}

export default ModalWrapper;
