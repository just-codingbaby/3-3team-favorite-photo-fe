# 3팀 - 최애의 포토 (Frontend)

## 프로젝트 개요
- **설명**: 사진 관련 서비스를 제공하는 웹 애플리케이션의 풀스택 프로젝트 중 프론트엔드 파트 입니다.
- **기능**:
  - 사용자 회원가입 및 로그인
  - 사진 업로드 및 관리
  - 마켓 페이지를 통해 상품을 판매/구매

## 주요 경로

- `/`: 메인 페이지
- `/login`: 로그인 페이지
- `/signup`: 회원가입 페이지
- `/market`: 마켓 메인 페이지
- `/market/[id]`: 개별 상품 상세 페이지

## 프로젝트 구조

3-3team-favorite-photo-fe/
├── public/                  # 정적 파일 (이미지, 폰트 등)
│   ├── fonts/               # 프로젝트 전용 폰트
│   └── images/              # 이미지 리소스
├── src/                     # 소스 코드
│   ├── components/          # 재사용 가능한 컴포넌트 모음
│   │   ├── header/          # 헤더 관련 UI 컴포넌트
│   │   ├── market/          # 마켓 페이지 구성 컴포넌트
│   │   ├── shared/          # 공용 컴포넌트 (버튼, 입력 필드 등)
│   │   ├── signUp/          # 회원가입 관련 컴포넌트
│   │   └── ui/              # 기타 공통 UI 컴포넌트
│   ├── hooks/               # 커스텀 훅 (공통 기능 로직)
│   ├── lib/                 # 유틸리티 및 외부 라이브러리
│   │   ├── axios.js         # Axios 설정
│   │   └── utils.js         # 유틸리티 함수 모음
│   ├── pages/               # Next.js 페이지 디렉토리
│   │   ├── api/             # API 경로 처리
│   │   │   └── api.js       # API 라우트
│   │   ├── market/          # 마켓 관련 페이지
│   │   │   ├── [id].jsx     # 상품 상세 페이지 (마켓 플레이스 페이지(판매 포토카드 상세 ))
│   │   │   ├── index.jsx    # 마켓 메인 페이지 (마켓 플레이스 페이지(공통))
│   │   ├── salesphotocard/  # 판매 상품 카드 관련 페이지
│   │   │   └── detailsalesphotocard.jsx # 판매 상품 상세 카드 페이지 (구매자)
│   │   ├── _app.js          # 글로벌 설정 (공통 레이아웃)
│   │   ├── _document.js     # HTML 문서 커스터마이징
│   │   ├── index.jsx        # 메인 페이지
│   │   ├── login.jsx        # 로그인 페이지
│   │   ├── sharedTestPage.jsx # 공통 컴포넌트 테스트 페이지
│   │   └── signup.jsx       # 회원가입 페이지
│   ├── styles/              # 스타일 파일
│   │   ├── globals.css      # 전역 스타일
│   │   └── tailwindcss.js   # Tailwind 설정 파일
└── README.md                # 프로젝트 설명 파일

## 협업 규칙

### Git 브랜치 전략
- `dev`: 배포/개발 브랜치
- `feature/기능명`: 각 기능별 작업 브랜치

### 코드 스타일
- **JS/React**: ESLint 및 Prettier 설정 적용
- **CSS**: Tailwind CSS 활용