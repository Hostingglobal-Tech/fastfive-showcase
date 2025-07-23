# FastFive 남부터미널 Showcase

FastFive 남부터미널점 시설을 소개하고 이용 후기를 수집하는 Remix 웹 애플리케이션입니다.

## 🚀 Railway 배포 가이드

### 1. 사전 준비
- Railway 계정 생성 (https://railway.app)
- GitHub 저장소에 코드 푸시
- Railway CLI 설치 (선택사항)

### 2. Railway 프로젝트 생성
1. Railway 대시보드에서 "New Project" 클릭
2. "Deploy from GitHub repo" 선택
3. GitHub 저장소 연결 및 선택

### 3. PostgreSQL 데이터베이스 추가
1. Railway 프로젝트에서 "New" → "Database" → "PostgreSQL" 선택
2. 데이터베이스가 생성되면 자동으로 DATABASE_URL 환경변수 설정됨

### 4. 환경변수 설정
Railway 프로젝트 설정에서 다음 환경변수 추가:
```
SESSION_SECRET=your-secure-random-string
ADMIN_EMAIL=your-admin@email.com
NODE_ENV=production
```

### 5. 배포
1. GitHub에 코드 푸시하면 자동 배포
2. 첫 배포 시 Prisma 마이그레이션 자동 실행
3. Railway가 제공하는 URL로 접속 확인

### 6. 이미지 업로드
`public/images/` 폴더에 IMG 폴더의 이미지들을 복사해야 합니다.

## 🛠️ 로컬 개발 환경

### 설치
```bash
npm install
```

### 환경변수 설정
`.env.example`을 `.env`로 복사하고 값 설정

### 데이터베이스 설정
```bash
npx prisma db push
```

### 개발 서버 실행
```bash
npm run dev
```

## 📝 관리자 기능
- `/admin` 경로로 접속하여 리뷰 승인/거절 가능
- ADMIN_EMAIL로 설정한 이메일로 로그인

## 🔧 주요 기능
- 시설 이미지 갤러리
- 사용자 리뷰 시스템
- 별점 평가
- 관리자 리뷰 승인 시스템
- 반응형 디자인
- SEO 최적화