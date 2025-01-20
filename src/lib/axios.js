import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// if (process.env.NODE_ENV === 'development') {
//   // Axios Request 디버깅(요청이 서버로 보내지기 전에 작업을 수행.)
//   instance.interceptors.request.use((config) => {
//     console.log('Axios 요청 설정:', config);
//     return config;
//   });

//   // Axios Response 디버깅(서버의 응답을 받은 뒤, 데이터를 처리하기 전에 작업을 수행.)
//   instance.interceptors.response.use((response) => {
//     console.log('Axios 응답:', response);
//     return response;
//   }, (error) => {
//     console.error('Axios 응답 에러:', error.response);
//     return Promise.reject(error);
//   });
// }

export default instance;
