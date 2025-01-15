import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function CustomDropDown({ label, options, value, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  const handleClickOutSide = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <div className={`relative`} ref={dropDownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn("flex items-center w-32 px-4 py-2 text-white bg-black focus:outline-none",className)}
      >
        <span className="truncate font-bold">
          {value ? options.find((opt) => opt.value === value)?.label : label}
        </span>
        <span
          className={`border-solid border-t-4 border-x-4 border-x-transparent border-t-white ml-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-black border rounded shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 text-white cursor-pointer"
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
