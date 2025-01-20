export const SORT_OPTS = new Map([
  ['LATEST', { label: '최신 순', value: 'sortField=createdAt' }],
  ['OLDEST', { label: '오래된 순', value: 'sortField=createdAt&sortOrder=asc' }],
  ['HIGHER_PRICE', { label: '높은 가격순', value: 'sortField=price' }],
  ['LOWER_PRICE', { label: '낮은 가격순', value: 'sortField=price&sortOrder=asc' }],
]);

export const FILTER_LIST = new Map([
  [
    'grade',
    {
      label: '등급',
      options: [
        {
          value: 'common',
          label: 'COMMON',
        },
        {
          value: 'rare',
          label: 'RARE',
        },
        {
          value: 'super-rare',
          label: 'SUPER_RARE',
        },
        {
          value: 'legendary',
          label: 'LEGENDARY',
        },
      ],
    },
  ],
  [
    'genre',
    {
      label: '장르',
      options: [
        {
          value: 'travel',
          label: '여행',
        },
        {
          value: 'landscape',
          label: '풍경',
        },
        {
          value: 'people',
          label: '인물',
        },
        {
          value: 'object',
          label: '사물',
        },
      ],
    },
  ],
  [
    'status',
    {
      label: '매진 여부',
      options: [
        {
          value: 'onSale',
          label: '판매 중',
        },
        {
          value: 'soldOut',
          label: '판매 완료',
        },
      ],
    },
  ],
]);

export const GRADE_STYLES = {
  COMMON: 'text-grade-common',
  RARE: 'text-grade-rare',
  SUPER_RARE: 'text-grade-super-rare',
  LEGENDARY: 'text-grade-legendary',
};
