import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 *
 * @typedef {Object} CardProps
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} grade
 * @property {string} genre
 * @property {string} imgUrl
 * @property {Object} owner
 */

/**
 * 할일 목록
 * @type {CardProps[]}
 */
export function ProductCard({ cardProps }) {
  const { id, name, price, grade, genre, imgUrl, owner } = cardProps;
  const map = {
    TRAVEL: "travel",
    LANDSCAPE: "landscape",
    PORTRAIT: "portrait",
    OBJECT: "temp",
  };
  const str =
    imgUrl === "" ? `/images/card/img_default-${map[genre]}.webp` : imgUrl;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="relative aspect-[150/112]">
            <Image
              className="object-center object-contain object-cover"
              src={str}
              alt={name}
              fill
              sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"
              priority={true}
            />
          </div>
          <CardTitle className="line-clamp-1">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-flow-col">
            <div className="flex gap-[1ch]">
              <span>{grade}</span>
              <Separator orientation="vertical" />
              <span>{genre}</span>
            </div>
            <div className="text-right underline underline-offset-1 text-white font-normal">
              {owner.nickName}
            </div>
          </div>
          <hr className="my-2.5" />
          <ul className="*:justify-between *:flex *:tabular-nums">
            <li>
              <span>가격</span>
              <span className="text-white font-normal">{price} P</span>
            </li>
            <li>
              <span>잔여</span>
              <span>n / m</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="justify-center hidden tb:flex">
          <Image
            src="/images/main_logo.png"
            alt="최애의포토 로고"
            width={99}
            height={18}
            priority={true}
          />
        </CardFooter>
      </Card>
      {/* <div className="bg-gray-200 min-w-[170px] min-h-[234px] justify-center p-2.5 grid grid-cols-1 grid-rows-2 tb:w-[342px] tb:h-[517px] tb:p-5 lt:w-[440px] lt:p-10 lt:h-[600px]">
        <div className="bg-gray-300 h-auto min-w-[150px] relative">
          <Image
            className="object-center object-cover"
            src={str}
            alt={name}
            fill
            sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"
          />
        </div>
        <div>
          <ul>
            <li>{name}</li>
            <li>{price}</li>
          </ul>
        </div>
      </div> */}
    </>
  );
}
