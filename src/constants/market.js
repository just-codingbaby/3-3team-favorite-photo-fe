export const SORT_OPTS = new Map([
  [ 'LATEST', { label: '최신 순', value: 'sortField=createdAt' } ],
  [ 'OLDEST', { label: '오래된 순', value: 'sortField=createdAt&sortOrder=asc' } ],
  [ 'HIGHER_PRICE', { label: '높은 가격순', value: 'sortField=price' } ],
  [
    'LOWER_PRICE',
    { label: '낮은 가격순', value: 'sortField=price&sortOrder=asc' }
  ],
]);