# ShowU (OTT) — FullStack 프로젝트 README

> **코리아 IT 아카데미 팀 프로젝트 (2024.09 ~ 2024.12)**
> 역할: 프론트엔드 개발(React, Styled-Components), 백엔드 연동(REST API)

---

## 🧭 개요

**ShowU**는 유튜브와 유사한 사용자 경험을 목표로 한 **영상 플랫폼(OTT)** 프로젝트입니다.
비회원/회원 영상 탐색부터 상세 보기, **좋아요/댓글/신고**, 그리고 **다단계 업로드 모달**까지 영상 소비의 풀 플로우를 구현했습니다.

* **핵심 가치**: 동적 UI/UX, 컴포넌트 단위 설계, RESTful API 기반 CRUD 흐름 학습/적용
* **UI 컨셉**: **블랙 배경 + 노란 포인트(#FFD400)**, 심플하고 선명한 대비

## 🖼️ 스크린샷

> 저장소의 `/docs` 폴더에 이미지를 두고 아래 경로로 연결해 주세요.

* 메인(홈) — `docs/main.png`
* ShowU 흐름도 — `docs/flow.png`
* VOD 상세(영상 클릭 시) — `docs/vod.png`

```md
![Main](docs/main.png)
![Flow](docs/flow.png)
![VOD](docs/vod.png)
```

---

## 🔧 기술 스택

### Frontend

* React (함수형 컴포넌트 + Hooks)
* react-router-dom (v6)
* styled-components
* Axios / Fetch
* FontAwesomeIcon
* LocalStorage (JWT 보관)

### Backend (API)

* Node.js + Express
* MongoDB + Mongoose
* JWT 인증 미들웨어

### 설계 & 패턴

* **Container–Presentational 분리**: 데이터(fetch)와 UI 렌더를 모듈화
* **RESTful 규약 준수** 및 **컴포넌트 재사용성** 극대화

---

## ✨ 주요 기능

* **홈(목록) 페이지**

  * 전체 영상 조회 / 카테고리 섹션(추천, 인기, 장르별)
  * 랜덤 추천 4개, 좋아요 상위 4개, 특정 장르 랜덤 4개 등 섹션화
* **영상 재생(Play)**

  * `/vod/play/:id` 경로, `<video controls>` 제공
* **상세 페이지(VideoDetail)**

  * 기본 정보/추천 탭, 좋아요 토글, 댓글 **CRUD**, 신고 모달
* **ShowU 전용 상세(ShowuVideo)**

  * 업로더 정보, 추천 사이드바, 대댓글 입력, 외부 클릭으로 옵션 닫힘
* **업로드 모달(ShowuInsert)**

  * 4단계(세부정보 → 동영상 요소 → 검토 → 공개 상태)
  * 파일 형식 검증, 단계별 유효성 검사, 최종 `FormData` 업로드
* **권한 분기**

  * **비로그인**: 좋아요/댓글/신고 시 로그인 유도
  * **로그인**: JWT 기반 보호 API 접근 허용

---

## 📁 폴더 구조(요약)

```text
src/
├─ components/
│  ├─ Vod/
│  │  ├─ Vod.jsx
│  │  ├─ VodContainer.js
│  │  └─ style.js
│  ├─ ShowuVideo/
│  │  ├─ ShowuVideo.jsx
│  │  ├─ ShowuVideoContainer.js
│  │  └─ style.js
│  ├─ Play/
│  │  ├─ Play.jsx
│  │  ├─ PlayContainer.js
│  │  └─ (style 없음)
│  ├─ NonLogin/
│  │  ├─ NonLogin.jsx
│  │  ├─ NonLoginContainer.js
│  │  └─ style.js
│  ├─ MyShowu/
│  │  ├─ showuInsert.jsx
│  │  ├─ MyShowuContainer.js
│  │  └─ style.js
│  └─ Musical/
│     ├─ Musical.jsx
│     ├─ MusicalContainer2.js
│     └─ (style 없음)
├─ routers/
├─ App.jsx
└─ index.jsx
```

---

## 🌐 라우팅 구성(예시)

* `/` — 홈(영상 목록)
* `/vod/play/:id` — 영상 재생
* `/vod/my-ShowU/video/:id` — ShowU 전용 상세

---

## 🔌 API 엔드포인트(요약)

> **Base URL**: `http://localhost:8000`

### VOD 리스트 & 상세

* `GET /vod` — 전체 영상 목록
* `GET /vod/info/:id` — 영상 상세 기본 정보
* `POST /vod/info/:id/likes` — 좋아요 토글(로그인 필요)

### 댓글(Comment)

* `GET /vod/comment/video/:id` — 댓글 목록
* `POST /vod/add/:id/comments` — 댓글 등록(로그인 필요)
* `PUT /vod/update/comments/:commentId` — 댓글 수정(로그인 필요)
* `DELETE /vod/delete/comments/:commentId` — 댓글 삭제(로그인 필요)

### 업로드(ShowU)

* `POST /vod/video` — `FormData` 기반 업로드(제목/설명/카테고리/썸네일/비디오/요소/공개상태)
* `GET /vod/showuvideo` — ShowU 영상 리스트
* `GET /vod/showuinfo/:id/showu` — ShowU 영상 상세
* `GET /vod/upload/:id/name` — 업로더 닉네임 조회

> 인증: `Authorization: Bearer <JWT>` 헤더 사용

---

## ⚙️ 실행 방법

### 1) 프론트엔드

```bash
# 1) 의존성 설치
npm install

# 2) 개발 서버 실행 (기본: http://localhost:3000)
npm run dev # 또는 npm start
```

### 2) 백엔드

```bash
# 1) 의존성 설치
npm install

# 2) 환경변수(.env)
PORT=8000
MONGODB_URI=mongodb://localhost:27017/showu
JWT_SECRET=your-secret
CORS_ORIGIN=http://localhost:3000

# 3) 서버 실행
npm run dev # nodemon 등
```

> **CORS**: 프론트(3000) → 백(8000) 통신 허용 설정 필요

---

## 🧩 환경 변수(.env 예시)

```env
# Backend
PORT=8000
MONGODB_URI=mongodb://localhost:27017/showu
JWT_SECRET=your-secret
CORS_ORIGIN=http://localhost:3000

# Frontend (필요 시)
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🧪 핵심 로직 하이라이트

* **랜덤/인기/장르 섹션**: 리스트에서 `shuffle/sort/slice`로 4개씩 추출
* **좋아요 정렬**: `likes` 내림차순 + `title` 보조 정렬
* **댓글 CRUD**: 등록/수정/삭제 시 즉시 상태 갱신 + 필요 시 재요청
* **다단계 업로드**: 페이지별 유효성 검사 → 최종 업로드 시 `FormData` 전송
* **옵션 토글/외부 클릭 닫힘**: 댓글 옵션 박스를 문서 단위 리스너로 제어

---

## 🎨 UI/UX 가이드(요약)

* **컬러**: 배경 **#000**, 텍스트 **#fff**, 포인트 **#FFD400**(호버: #fcca00)
* **레이아웃**: `flex` 기반 중앙 정렬, 카드 고정 너비(200px), 가로 스크롤 숨김
* **탭/버튼/카드**: 포커스/호버 상태 명확한 시각 피드백
* **모달**: 화면 중앙 고정, 반투명 배경, 단계 표시 원(circle) 및 구분선

---

## 🔒 권한/보안

* LocalStorage에 JWT 저장(단, **Refresh Token 기반 자동 재발급** 추후 도입 권장)
* 입력값 검증 및 서버측 Validation 필요

---

## 🧭 개발 동기 & 목표(요약)

* **동기**: 동적 UI/UX와 RESTful 연동을 갖춘 영상 플랫폼 직접 구현
* **목표**: 로그인 상태 분기, 목록→상세→업로드 **완전 흐름** 구축, 컴포넌트/스타일 시스템화

---

## 🛣️ 로드맵

* 반응형 디자인(모바일/태블릿 브레이크포인트)
* 전역 Axios 인스턴스, 공통 유틸/모달/댓글 모듈화
* Redux/Context 상태관리 도입
* 에러 페이지/토스트 도입, 로딩 스켈레톤
* 업로드 진행률(Progress), 대용량 업로드 안정화
* JWT **Refresh Token** 및 보안 정책 강화

---

## 🏷️ 라이선스

* MIT (필요 시 `LICENSE` 파일 추가)

---

## 🙌 기여 & 문의

* 본 프로젝트는 **코리아 IT 아카데미** 내 팀 프로젝트로 진행되었습니다.
* 이슈/개선 제안은 GitHub Issues로 남겨 주세요.
* Contact: [psj04100410262635@gmail.com](mailto:psj04100410262635@gmail.com)
