import { Separator } from "@/components/ui/separator";
import fallbackImg from "@/public/images/card/img_default-temp.webp";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import soldOutImg from "@/public/images/type=soldout.png";

const GRADE_STYLES = {
  COMMON: "text-grade-common",
  RARE: "text-grade-rare",
  SUPER_RARE: "text-grade-super-rare",
  LEGENDARY: "text-grade-legendary",
};

const genreToKr = {
  TRAVEL: "여행",
  PORTRAIT: "인물",
  LANDSCAPE: "풍경",
  OBJECT: "사물",
};

/**
 *
 * @typedef {Object} CardProps
 * @property {number} _id
 * @property {number} remainingQuantity
 * @property {number} totalQuantity
 * @property {string} name
 * @property {number} price
 * @property {string} grade
 * @property {string} genre
 * @property {string} imgUrl
 * d@property {Object} owner
 */

/**
 * @param {CardProps} cardProps
 */
export function ProductCard({ cardProps }) {
  const {
    _id,
    name,
    price,
    grade,
    genre,
    imgUrl,
    owner,
    remainingQuantity,
    totalQuantity,
  } = cardProps;
  const [isValidImgUrl, setIsValidImgUrl] = useState(
    !imgUrl.includes("example.com")
  );

  useEffect(() => {
    if (imgUrl.includes("example.com")) {
      setIsValidImgUrl(false);
    }
  }, [imgUrl]);
  return (
    <Card className="border-white/10 p-2.5 tb:p-5 lt:p-10 hover:border-white/70 transition-colors duration-150 ease-in-out text-gray-300">
      <CardHeader className="gap-2.5 tb:gap-[25.5px]">
        <div className="relative aspect-[150/112] tb:aspect-[360/270]">
          <Image
            onError={() => setIsValidImgUrl(false)}
            className="object-center object-cover"
            src={isValidImgUrl ? imgUrl : fallbackImg}
            alt={name}
            fill
            sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"
          />
          {remainingQuantity < 1 && (
            <Image
              className="object-center object-contain bg-black bg-opacity-50 absolute inset-0"
              src={soldOutImg}
              alt={name}
              fill
              sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"
            />
          )}
        </div>
        <CardTitle className="overflow-ellipsis text-white tb:text-[22px] truncate">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="tb:text-base pt-[5px] tb:pt-[10px]">
        <div className="grid grid-flow-col">
          <div className="flex gap-[1ch]">
            <span
              aria-label={`상품 등급: ${grade}`}
              className={GRADE_STYLES[grade]}
            >
              {grade.replace("_", " ")}
            </span>
            <Separator orientation="vertical" />
            <span
              className="font-normal line-clamp-1"
              aria-label={`장르: ${genre}`}
            >
              {genreToKr[genre] || genre}
            </span>
          </div>
          <div className="text-right text-white font-normal ">
            {owner.nickName}
          </div>
        </div>
        <Separator className="my-2.5 tb:my-5" />
        <ul className="*:justify-between *:flex *:tabular-nums space-y-[5px] tb:space-y-[10px]">
          <li>
            <span>가격</span>
            <span className="text-white font-normal">{price} P</span>
          </li>
          <li>
            <span>잔여</span>
            <span>
              <span className="text-white">{remainingQuantity}</span> /{" "}
              {totalQuantity}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="justify-center hidden pb-2.5 tb:flex  tb:pt-[30px]">
        <Image
          src="/images/main_logo.png"
          alt="최애의포토 로고"
          width={99}
          height={18}
          priority={true}
        />
      </CardFooter>
    </Card>
  );
}
