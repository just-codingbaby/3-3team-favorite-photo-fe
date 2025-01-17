/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {// 이미지 제공 도메인 추가 (외부 이미지를 로드할 수 있도록 설정한다는 의미)    
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'three-3team-favorite-photo-be.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/market",
        permanent: false
      },
    ];
  },
};

export default nextConfig;