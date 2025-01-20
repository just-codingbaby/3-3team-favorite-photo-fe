import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

export default function ProfileDropDown({ nickName, points }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const elemStyle = 'py-2';

  return (
    <div ref={dropdownRef} className="font-baskin font-normal leading-[18.43px] text-gray-200">
      <button onClick={() => setIsOpen((prev) => !prev)}>{nickName}</button>

      {isOpen && (
        <div className="absolute m-2 flex flex-col divide-y divide-white border border-white bg-black p-2">
          <p className={elemStyle}>보유 포인트: {points}P</p>
          <Link href="/mygallery" className={elemStyle}>
            마이갤러리
          </Link>
          <Link href="/mysalescard" className={elemStyle}>
            나의 판매 포토카드
          </Link>
        </div>
      )}
    </div>
  );
}
