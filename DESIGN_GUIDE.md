# Art-Way — 디자인 가이드

> 상위 브랜드: 계발자들 (Vibers)
> 디자인 아이덴티티: 미니멀 / 모노크롬 / 아트 갤러리 느낌 / 라이트+다크 모드

---

## 컬러 시스템

### shadcn/ui CSS 변수 기반 (HSL)

#### 라이트 모드 (:root)

| 역할 | HSL 값 | HEX 근사값 | CSS 변수 |
|------|--------|-----------|----------|
| Background | `0 0% 100%` | `#FFFFFF` | `--background` |
| Foreground | `0 0% 3.9%` | `#0A0A0A` | `--foreground` |
| Primary | `0 0% 9%` | `#171717` | `--primary` |
| Primary Foreground | `0 0% 98%` | `#FAFAFA` | `--primary-foreground` |
| Secondary | `0 0% 96.1%` | `#F5F5F5` | `--secondary` |
| Secondary Foreground | `0 0% 9%` | `#171717` | `--secondary-foreground` |
| Muted | `0 0% 96.1%` | `#F5F5F5` | `--muted` |
| Muted Foreground | `0 0% 45.1%` | `#737373` | `--muted-foreground` |
| Accent | `0 0% 96.1%` | `#F5F5F5` | `--accent` |
| Accent Foreground | `0 0% 9%` | `#171717` | `--accent-foreground` |
| Destructive | `0 84.2% 60.2%` | `#EF4444` | `--destructive` |
| Border | `0 0% 89.8%` | `#E5E5E5` | `--border` |
| Input | `0 0% 89.8%` | `#E5E5E5` | `--input` |
| Ring | `0 0% 3.9%` | `#0A0A0A` | `--ring` |
| Radius | `0.5rem` | 8px | `--radius` |

#### 다크 모드 (.dark)

| 역할 | HSL 값 | HEX 근사값 | CSS 변수 |
|------|--------|-----------|----------|
| Background | `0 0% 3.9%` | `#0A0A0A` | `--background` |
| Foreground | `0 0% 98%` | `#FAFAFA` | `--foreground` |
| Primary | `0 0% 98%` | `#FAFAFA` | `--primary` |
| Primary Foreground | `0 0% 9%` | `#171717` | `--primary-foreground` |
| Secondary | `0 0% 14.9%` | `#262626` | `--secondary` |
| Secondary Foreground | `0 0% 98%` | `#FAFAFA` | `--secondary-foreground` |
| Muted | `0 0% 14.9%` | `#262626` | `--muted` |
| Muted Foreground | `0 0% 63.9%` | `#A3A3A3` | `--muted-foreground` |
| Accent | `0 0% 14.9%` | `#262626` | `--accent` |
| Accent Foreground | `0 0% 98%` | `#FAFAFA` | `--accent-foreground` |
| Destructive | `0 62.8% 30.6%` | `#7F1D1D` | `--destructive` |
| Border | `0 0% 14.9%` | `#262626` | `--border` |
| Input | `0 0% 14.9%` | `#262626` | `--input` |
| Ring | `0 0% 83.1%` | `#D4D4D4` | `--ring` |

### 차트 컬러 (라이트)

| 변수 | HSL 값 | 설명 |
|------|--------|------|
| `--chart-1` | `12 76% 61%` | 오렌지-레드 |
| `--chart-2` | `173 58% 39%` | 틸 |
| `--chart-3` | `197 37% 24%` | 다크 블루 |
| `--chart-4` | `43 74% 66%` | 골드 |
| `--chart-5` | `27 87% 67%` | 오렌지 |

### 컬러 사용 규칙
- 모노크롬 기반 — 채도 0% 팔레트가 핵심
- `hsl(var(--변수))` 형태로 Tailwind에서 사용
- Tailwind 클래스: `bg-background`, `text-foreground`, `bg-primary` 등
- 다크 모드: `darkMode: ["class"]` — `.dark` 클래스 토글

---

## 타이포그래피

### 폰트 스택
- sans: `var(--font-sans)` (Pretendard 등 시스템에서 설정)
- serif: `var(--font-serif)` (레이아웃에서 설정)
- 기본 사이즈: 16px (본문), 24-48px (제목)

### 제목 계층

| 레벨 | 사이즈 | Tailwind | 용도 |
|------|--------|----------|------|
| H1 | 48px | `text-5xl font-light` | 페이지 메인 제목 |
| H2 | 36px | `text-4xl font-light` | 섹션 제목 |
| H3 | 24px | `text-2xl` | 서브섹션 제목 |
| H4 | 20px | `text-xl` | 카드 제목 |

### 본문 텍스트

| 용도 | 사이즈 | Tailwind |
|------|--------|----------|
| 기본 본문 | 16px | `text-base leading-relaxed` |
| 큰 본문 | 18px | `text-lg leading-relaxed` |
| 캡션/보조 | 14px | `text-sm` |

---

## 레이아웃 시스템

### 컨테이너

```tsx
className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8"
```

- 최대 너비: 1280px
- 좌우 패딩: 반응형 (16px / 24px / 32px)

### 섹션 여백

```css
py-16  /* 64px — 모바일 */
py-20  /* 80px — 데스크탑 */
```

### 반응형 브레이크포인트

| 이름 | 값 |
|------|-----|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

---

## 컴포넌트 패턴

### 페이지 래퍼

```tsx
<div className="min-h-screen bg-background text-foreground">
  {children}
</div>
```

### 섹션 래퍼

```tsx
<section className="py-16 md:py-20">
  <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
    {/* 섹션 내용 */}
  </div>
</section>
```

### 컴포넌트 규칙
- 버튼: `rounded-lg`, 최소 높이 44px (터치 영역)
- 카드: `rounded-xl`, `shadow-sm`, `bg-card`
- 모달: `backdrop-blur`, 중앙 정렬 (Radix Dialog 사용)
- 인풋: `rounded-lg`, `border`, `focus:ring-2`
- Border Radius: `var(--radius)` = 0.5rem (8px)

---

## 애니메이션

### 키프레임 (tailwind.config.ts)

```css
fadeIn: 0% opacity:0 → 100% opacity:1
fadeInUp: 0% opacity:0 translateY(20px) → 100% opacity:1 translateY(0)
```

### Tailwind 클래스
- `animate-fade-in`: 0.5s ease-out
- `animate-fade-in-up`: 0.7s ease-out
- `tailwindcss-animate` 플러그인 사용

### 기본 원칙
- 전환: 200-300ms ease
- 호버: `scale(1.02)` 또는 opacity 변화
- 페이드인: 부드럽게 (500ms)

---

## BlockNote 에디터 스타일

```css
/* 에디터 내 이미지 */
.prose img { max-width: 100%; height: auto; border-radius: 0.375rem; margin: 1rem 0; }
.prose figure { margin: 1rem 0; }
```

---

## 접근성

- 최소 대비: 4.5:1 (일반 텍스트), 3:1 (큰 텍스트)
- 포커스 표시: `ring-2 ring-offset-2`
- alt 텍스트 필수
- 키보드 내비게이션 지원
- 스크롤바: 8px, 회색 thumb (`#ddd`)

---

## 체크리스트

모든 페이지/컴포넌트는 다음을 준수해야 합니다:

- [ ] 컬러: `hsl(var(--변수))` 패턴 사용
- [ ] 배경: `bg-background` / 텍스트: `text-foreground`
- [ ] 최대 너비: `max-w-screen-xl` (1280px)
- [ ] 반응형 패딩: `px-4 md:px-6 lg:px-8`
- [ ] 섹션 여백: `py-16 md:py-20`
- [ ] 다크 모드: `.dark` 클래스 기반 전환 지원
- [ ] 에디터 콘텐츠: `.prose` 클래스 내 이미지 스타일 확인
- [ ] Border radius: `rounded-lg` (var(--radius) 기반)

---

**모노크롬 미니멀리즘으로 아트 콘텐츠를 돋보이게!**
