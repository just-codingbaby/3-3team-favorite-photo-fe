import { Separator } from "@/components/ui/separator";
import fallbackImg from '../../../public/images/card/img_default-temp.webp'
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

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
  const [ isValidImgUrl, setIsValidImgUrl ] = useState(true);
  return (
    <Card className="border-white/10">
      <CardHeader>
        <div className="relative aspect-[150/112]">
          <Image
            onError={() => setIsValidImgUrl(false)}
            className="object-center object-cover"
            src={isValidImgUrl ? imgUrl : fallbackImg}
            alt={name}
            fill
            sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"
          />
        </div>
        <CardTitle className="line-clamp-1 text-white">{name}</CardTitle>
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
        <Separator className="my-2.5" />
        <ul className="*:justify-between *:flex *:tabular-nums">
          <li>
            <span>가격</span>
            <span className="text-white font-normal">{price} P</span>
          </li>
          <li>
            <span>잔여</span>
            <span>
              <span className="text-white">n</span> / m
            </span>
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
  );
}