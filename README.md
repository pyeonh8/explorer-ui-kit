# 🏕️ 탐험해요 뽀모도로 (Explore Pomodoro)

> **동물의 숲(Animal Crossing) 캐릭터들과 함께 즐기는 방치형 뽀모도로 타이머**

---

### ✨ [배포 사이트 바로가기](https://acnh-adventure.vercel.app/) ✨

---

단순히 시간만 재는 타이머에서 벗어나, 집중 시간 동안 캐릭터가 탐험을 하고 실시간 로그를 남기며 보상을 획득하는 **게이미피케이션(Gamification)** 기반 생산성 웹 서비스입니다.

## 🕹️ 서비스 특징 및 주요 기능
* **방치형 탐험 시스템:** 타이머가 시작되면 '모험 세팅화면'에서 '모험 시작화면' 상태로 전환되며, 시간에 따라 랜덤한 탐험 로그가 생성됩니다.
* **타이머 상태 유지:** 전역 상태 관리를 통해 서비스 내 페이지 이동 중에도 타이머가 끊기지 않고 유지되어 연속적인 사용자 경험을 제공합니다.
* **보상 및 데이터 보존:** 타이머 완료 시 획득한 보상은 **LocalStorage**를 통해 관리되어 브라우저를 재시작해도 데이터가 보존됩니다.
* **데이터 로컬라이징:** `Nookipedia` 및 `Amiibo` API의 영문 데이터를 `animal-crossing` 라이브러리를 참조하여 한국어로 매핑, 사용자 친화적인 인터페이스를 구현했습니다.

## 🛠 기술 스택
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Icons:** React Icons
* **Deployment:** Vercel
* **Data Sources:**
  * [Nookipedia API](https://api.nookipedia.com/) (캐릭터 상세 정보)
  * [Amiibo API](https://amiiboapi.onrender.com/api/) (캐릭터 이미지 데이터)
  * [Animal Crossing Library](https://github.com/Norviah/animal-crossing) (아이템 보상 및 다국어 번역 데이터 참조)

## 🏗️ 아키텍처 및 설계 포인트
### 1. Feature-Sliced Design (FSD) 적용
파일 구조를 도메인별(Features)과 공용 자원(Shared)으로 명확히 구분하여 프로젝트의 확장성과 유지보수성을 높였습니다.
* `features/`: 뽀모도로, 탐험, 캐릭터 시스템 등 핵심 도메인별 기능 단위 관리
* `shared/`: API 설정, 공용 UI 컴포넌트 등 재사용 가능한 자원 관리

### 2. UI/UX 로직 분리 (Custom Hooks)
복잡한 타이머 로직과 인터랙션 제어 로직을 컴포넌트에서 분리하기 위해 **커스텀 훅**을 설계했습니다.
* **재사용성 확보:** 비즈니스 로직을 훅으로 캡슐화하여 다양한 컴포넌트에서 동일한 로직을 안전하게 공유합니다.
* **관심사 분리:** UI 컴포넌트는 렌더링에만 집중하고, 상태 변화와 계산 로직은 훅에서 담당하여 코드의 가독성을 극대화했습니다.

## 📂 프로젝트 구조
```text
src/
 ├── app/           # Next.js App Router (Page 정의)
 ├── constants/     # 캐릭터 키, 성격, 랜덤 로그 등 고정 데이터
 ├── features/      # [characters, expedition, pomodoro] 도메인별 기능
 ├── shared/        # [api, hooks, ui, utils] 재사용 가능한 로직 및 컴포넌트
 └── types/         # TypeScript 타입 정의
