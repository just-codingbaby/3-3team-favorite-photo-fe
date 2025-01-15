import CustomDropDown from "@/components/shared/CustomDropDown";
import TextFieldInput from "@/components/shared/TextFieldInput";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function MakePhotoCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const FILTER_LIST = [
    {
      label: "등급을 선택해 주세요",
      category: "rate",
      options: [
        {
          value: "common",
          label: "COMMON",
        },
        {
          value: "rare",
          label: "RARE",
        },
        {
          value: "superRare",
          label: "SUPER RARE",
        },
        {
          value: "legendary",
          label: "LEGENDARY",
        },
      ],
    },
    {
      label: "장르를 선택해 주세요",
      category: "genre",
      options: [
        {
          value: "landscape",
          label: "풍경",
        },
        {
          value: "people",
          label: "인물",
        },
        {
          value: "object",
          label: "사물",
        },
      ],
    },
  ];

  const inputStyle =
    "border focus-visible:ring-0 focus-visible:ring-transparent bg-black focus-visible:ring-offset-0 w-[345px] h-[55] mb:w-[440px] tb:w-[520px] h-[60px]";
  const labelStyle = "font-bold text-xl leading-7";
  const divStyle = "flex flex-col gap-[10px]";
  const drpDownStyle = "border w-[345px] h-[55] mb:w-[440px] tb:w-[520px] h-[60px] bg-black";

  return (
    <div className="flex flex-col px-20 py-6 lt:px-55 lt:py-7">
      <h1 className="font-baskin font-normal lt:text-6xl mb:text-5xl hidden mb:flex border-b border-white pb-5">
        포토카드 생성
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-14 items-center mt-14">
        <div className={divStyle}>
          <label className={labelStyle}>포토카드 이름</label>
          <Input
            {...register("cardName", {
              // 추후 데이터 이름 수정
              required: "필수 입력 사항입니다",
              maxLength: { value: 30, message: "최대 30자까지 입력 가능합니다" },
            })}
            className={`${errors.cardName ? "border-customRed" : "border-white"} ${inputStyle}`}
            placeholder="포토카드 이름을 입력해 주세요"
          />
          {errors.cardName && (
            <p className="text-red-500 text-sm mt-1">{errors.cardName.message}</p>
          )}
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>등급</label>
          <Select key={FILTER_LIST[0].category}>
            <SelectTrigger className={drpDownStyle}>
              <SelectValue placeholder={FILTER_LIST[0].label} />
            </SelectTrigger>
            <SelectContent>
              {FILTER_LIST[0].options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>장르</label>
          <Select key={FILTER_LIST[1].category}>
            <SelectTrigger className={drpDownStyle}>
              <SelectValue placeholder={FILTER_LIST[1].label} />
            </SelectTrigger>
            <SelectContent>
              {FILTER_LIST[1].options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>가격</label>
          <Input
            {...register("price", {
              // 추후 데이터 이름 수정
              required: "필수 입력 사항입니다",
            })}
            className={`${inputStyle}`}
            placeholder="가격을 입력해 주세요"
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>총 발행량</label>
          <Input
            {...register("amount", {
              // 추후 데이터 이름 수정
              required: "필수 입력 사항입니다",
              maxLength: { value: 30, message: "최대 30자까지 입력 가능합니다" },
            })}
            className={`${inputStyle}`}
            placeholder="총 발행량을 입력해 주세요"
          />
        </div>
        <div className={divStyle}>
          <label className={labelStyle}>사진 업로드</label>
          <div
            className={`flex flex-row justify-between w-[345px] h-[55px] mb:w-[440px] tb:w-[520px] m-0 p-0`}
          >
            {/* 파일 이름 표시 */}
            <Input
              id="fileName"
              type="text"
              readOnly
              placeholder="사진 업로드"
              className={`w-[310px] mb:w-[310px] tb:w-[390px] h-[55px] border focus-visible:ring-0 focus-visible:ring-transparent bg-black focus-visible:ring-offset-0`}
            />
            {/* 커스텀 파일 선택 버튼 */}
            <button
              type="button"
              onClick={() => document.getElementById("file-input").click()}
              className="bg-black w-[105px] mb:w-[120px] h-[55px] px-4 py-2 rounded border border-customMain text-customMain text-base font-normal"
            >
              파일 선택
            </button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // 선택된 파일 이름 업데이트
                  document.getElementById("fileName").value = file.name;
                }
              }}
              className="hidden"
            />
          </div>
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>포토카드 설명</label>
          <textarea
            {...register("description", {
              required: "설명을 입력해주세요.",
              maxLength: {
                value: 500,
                message: "설명은 최대 500자까지 작성 가능합니다.",
              },
            })}
            placeholder="카드 설명을 입력해 주세요"
            className="border rounded w-[345px] h-[180px] mb:w-[440px] tb:w-[520px] p-2 resize-none bg-black border-white outline-none"
          />
        </div>

        <PrimaryButton
          label={"생성하기"}
          className={"w-[345px] mb:w-[440px] tb:w-[520px] h-[60px]"}
          type="submit"
        />
      </form>
    </div>
  );
}
