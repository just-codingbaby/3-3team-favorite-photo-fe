import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export default function CustomDropDown({ label, options, value, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  const handleClickOutSide = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <div className={`relative`} ref={dropDownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex w-32 items-center bg-black px-4 py-2 text-white focus:outline-none',
          className,
        )}
      >
        <span className="truncate font-bold">
          {value ? options.find((opt) => opt.value === value)?.label : label}
        </span>
        <span
          className={`ml-5 border-x-4 border-t-4 border-solid border-x-transparent border-t-white transition-transform duration-200 ${
            isOpen ? 'rotate-180 transform' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 rounded border bg-black shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer px-4 py-2 text-white"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
