## 전략 문서 (개발 전 반드시 숙지)
- **전략 진단 리포트**: `data/STRATEGY_ANALYSIS.md`
- **PM 공통 지침**: 맥미니 루트 `pm.md`

### 전략 핵심 요약
- Vibers 핵심 콘텐츠 플랫폼 — 아트 전시/아카이브 중앙 관리
- BlockNote 리치 에디터 + AI Recipe 이미지 통합
- 아티스트 커뮤니티 확보 및 수익화 모델 설계 필요

---

# Art-Way (아트웨이)

## 프로젝트 개요
아트 관련 콘텐츠 플랫폼. Supabase 백엔드 + BlockNote 리치 텍스트 에디터를 활용한 아트 콘텐츠 관리 및 전시 웹앱.

## 상위 브랜드
- 회사: 계발자들 (Vibers)
- 도메인: vibers.co.kr
- 서버: server.vibers.co.kr

## 기술 스택
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS 3 + shadcn/ui (CSS 변수 기반)
- UI 라이브러리: Radix UI (Dialog, Select, Slot)
- 에디터: BlockNote (Core + React + Mantine 테마)
- 백엔드: Supabase (Auth + DB + Storage)
- Utilities: clsx, tailwind-merge, class-variance-authority
- Animation: tailwindcss-animate
- Icons: Lucide React
- Package Manager: bun (권장) / npm

## 디자인 아이덴티티
- 테마: 모노크롬 미니멀 / 아트 갤러리
- Primary: `hsl(0 0% 9%)` = `#171717` (거의 블랙)
- Background: `hsl(0 0% 100%)` = `#FFFFFF` (라이트), `hsl(0 0% 3.9%)` = `#0A0A0A` (다크)
- 라이트/다크 모드 모두 지원 (`.dark` 클래스 토글)
- 상세 디자인 규칙: `DESIGN_GUIDE.md` 참조

## 프로젝트 구조
```
art-way/
├── src/
│   ├── app/
│   │   ├── layout.tsx       ← 루트 레이아웃
│   │   ├── page.tsx         ← 메인 페이지
│   │   ├── globals.css      ← CSS 변수 (shadcn/ui 토큰)
│   │   ├── about/           ← 소개 페이지
│   │   ├── admin/           ← 관리자 페이지
│   │   ├── archive/         ← 아카이브
│   │   ├── contact/         ← 연락처
│   │   ├── login/           ← 로그인
│   │   ├── mall/            ← 쇼핑몰
│   │   └── media/           ← 미디어
│   ├── actions/             ← Server Actions
│   ├── components/          ← UI 컴포넌트
│   ├── lib/                 ← 유틸리티 (Supabase 클라이언트 등)
│   └── middleware.ts        ← 인증 미들웨어
├── tailwind.config.ts       ← Tailwind 설정 (shadcn/ui 토큰)
└── package.json
```

## 핵심 파일
- `src/app/globals.css`: shadcn/ui HSL CSS 변수 (라이트/다크 모드)
- `tailwind.config.ts`: 색상 매핑 (`hsl(var(--변수))`) + 애니메이션 키프레임
- `src/middleware.ts`: Supabase Auth 기반 인증 미들웨어

## 개발 규칙

### 코드 스타일
- 시맨틱 라인 브레이크: UI 텍스트는 의미 단위로 줄바꿈
- 한글 우선 원칙: 모든 UI 텍스트와 주석은 한국어
- TypeScript strict mode 사용

### 스타일링 주의사항
- Tailwind CSS 3 사용 — `tailwind.config.ts` + `@tailwind` 디렉티브 방식
- 색상은 반드시 `hsl(var(--변수))` 패턴 사용 (하드코딩 금지)
- shadcn/ui 컴포넌트 패턴 준수 (CVA + Radix)
- 다크 모드 대응 필수

### BlockNote 에디터
- `@blocknote/core`, `@blocknote/react`, `@blocknote/mantine` 사용
- 에디터 내 이미지: `.prose img` 스타일로 반응형 처리
- Supabase Storage와 연동하여 이미지 업로드

### 디자인 준수
- 반응형 브레이크포인트: 640, 768, 1024, 1280px
- 폰트: Pretendard (한글 기본)
- Tailwind CSS 유틸리티 클래스 사용
- 접근성: WCAG 2.1 AA 기준

### Git 규칙
- 커밋 메시지: 한글 (feat:, fix:, refactor:, chore: 접두사)
- 브랜치: main → feature/기능명
- PR 필수 (셀프 리뷰 가능)

### 배포
- 대상 서버: NCP (server.vibers.co.kr)
- Docker 컨테이너 기반 배포 예정
- CI/CD: GitHub Actions

## 주요 명령어
```bash
bun install        # 의존성 설치
bun dev            # 개발 서버
bun run build      # 빌드
bun test           # 테스트
```

## 특이사항
- Supabase SSR(`@supabase/ssr`) 사용으로 서버 컴포넌트에서도 인증 처리 가능
- BlockNote 에디터는 클라이언트 컴포넌트에서만 렌더링 (`'use client'`)
- shadcn/ui 색상 시스템은 art-way와 arthyun이 동일한 기본 팔레트 사용

---

## AI Recipe 이미지 API

이 프로젝트는 **AI Recipe 중앙 이미지 서비스**를 사용합니다.

### 사용 가능한 함수

```typescript
import { searchStockImage, generateAIImage } from '@/lib/ai-recipe-client';
```

### Stock Image 검색
```typescript
const image = await searchStockImage('contemporary art gallery exhibition', {
  orientation: 'landscape',
  size: 'large',
});
// → { url, provider, alt, photographer, ... }
```

### AI 이미지 생성
```typescript
const image = await generateAIImage('abstract modern art painting, gallery quality, minimalist composition', {
  size: 'large',
  provider: 'auto',
});
// → { url, prompt, provider }
```

### 주요 용도
- 아트 갤러리 이미지 보강
- 아카이브 커버 이미지
- 전시 홍보 비주얼

### 주의사항
- Server Action이나 API Route에서만 사용 (API 키 보호)
- Rate Limit: 1000회/일
- AI Recipe 서버 실행 필요: http://localhost:3300
