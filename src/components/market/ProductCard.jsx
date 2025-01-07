import Image from "next/image";

/**
 *
 * @typedef {Object} CardProps
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} grade
 * @property {string} genre
 * @property {string} imgUrl
 */

/**
 * 할일 목록
 * @type {CardProps[]}
 */
export function ProductCard({ cardProps }) {
  const { id, name, price, grade, genre, imgUrl } = cardProps;
  const map = {
    'TRAVEL': 'travel',
    'LANDSCAPE': 'landscape',
    'PORTRAIT': 'portrait',
    'OBJECT': 'temp'
  }
  const imgSrc = `images/card/img_default-${map[genre] ?? 'temp'}.webp`
  return (
    <div className="bg-gray-200 min-w-[170px] min-h-[234px] justify-center p-2.5 grid grid-cols-1 grid-rows-2 tb:w-[342px] tb:h-[517px] tb:p-5 lt:w-[440px] lt:p-10 lt:h-[600px]">
      <div className="bg-gray-300 h-auto min-w-[150px] relative">
        <Image className='object-center object-cover' src={imgUrl} alt={name} fill sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw"/>
      </div>
      <div>
        <ul>
          <li>{name}</li>
          <li>{price}</li>
        </ul>
      </div>
    </div>
  );
}
