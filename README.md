# household-budget-web
---

# 1. 요구사항 명세

| 구분 | 항목 | 상세 내용 | 우선순위 | 기간 | 담당자 |
| --- | --- | --- | --- | --- | --- |
| **기능 요구 사항** | 수입/지출 기록 및 수정 | 날짜, 금액, 카테고리, 메모 등의 세부 정보를 입력하여 기록 및 수정 | 상 | 2025.04.08 ~ 2025.04.09 | 고창진 |
|  | 거래 내역 조회 | 필터 기능을 통해 특정 조건에 맞는 거래 내역을 조회 날짜/주간/월별/기간별, 카테고리 별 등 필터링 항목에 따른 요약 내역 조회 | 상 | 2025.04.08 ~ 2025.04.09 | 모정민 |
|  | 월별 재정 요약 | 각 월의 수입, 지출, 순이익을 요약 표시 | 상 | 2025.04.08~
2025.04.09 | 최준혁 |
|  | 데이터 저장 | 데이터는 모두 json-server에 저장 | 상 | 2025.04.08~
2025.04.09 | 장혁 |
|  | 로그인/회원가입 | 사용자는 이메일과 비밀번호, 이름을 통해 회원가입, 로그인 가능 | 상 | 2025.04.08 ~ 2025.04.09 | 김재현 |
|  | 프로필 수정 | 사용자의 이메일, 이름, 비밀번호 변경 가능 | 중 | 2025.04.08 ~ 2025.04.09 | 김재현 |
|  | 요약 그래프 표시 | 구글 차트 라이브러리를 사용하여 재정 요약 그래프 표시 | 하 |  | 최준혁 |
| **디자인 요구 사항** | 반응형 디자인 | 다양한 디바이스와 화면 크기에 맞게 최적화된 디자인 | 중 | 2025.04.08 ~ 2025.04.10 | 모두 |
|  | 사용자 인터페이스 | 사용자의 편리한 사용을 위한 직관적인 UI/UX 설계 | 중 | 2025.04.08 ~ 2025.04.10 | 모두 |
|  | 레이아웃 설계 | 기본 라우터 뷰 동작을 위한 레이아웃 설계 |  |  | 고창진 |
| **기술적 요구 사항** | 프론트엔드 구현 | Vue 3를 사용하여 모던 웹 애플리케이션 구축 | 상 | 2025.04.08 ~ 2025.04.10 | 모두 |
|  | 상태 관리 | Composition API를 통한 앱 상태 관리 | 상 | 2025.04.08 ~ 2025.04.10 | 모두 |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

# 2. 컴포넌트 구조 설계

## 화면 UI 설계

### 스토리보드

```markdown
[로그인 화면]
- 이메일 입력창
- 비밀번호 입력창
- 로그인 버튼 -> [홈 화면]
- 회원가입 버튼 -> [회원가입 화면]

[회원가입 화면]
- 이름 입력창
- 이메일 입력창
- 비밀번호 입력창
- 비밀번호 확인 입력창
- 개인 정보 동의 체크버튼
- 회원가입 버튼 -> [로그인 화면]

[내 정보 화면]
- 이름 확인
- 이메일 확인
- 비밀번호 확인
- 항목별 수정하기 버튼 클릭 -> 해당 항목 수정 -> 수정 완료

[거래 내역 추가 화면]
- 거래 제목 입력창
- 수입/지출 선택창
- 날짜 선택창 (기본값 오늘 날짜)
- 카테고리 선택창
- 메모 입력창
- 거래 내역 추가 버튼 -> [거래 내역 화면]

[거래 내역 수정 화면]
- 거래 제목 수정창
- 수입/지출 선택창
- 날짜 선택창 (기본값 오늘 날짜)
- 카테고리 선택창
- 메모 입력창
- 거래 내역 수정 버튼 -> 수정 확인 알림창 -> [거래 내역 화면]

[거래 내역 화면]
- 필터(거래 유형, 분류, 주간, 월별)
- 최근 거래 내역 리스트(거래 유형, 분류, 생성/수정 날짜, 금액, 메모)
```

![image.png](attachment:9d155f83-9796-4505-bde4-ae2df2a79864:image.png)

![image.png](attachment:8686d36a-08f7-468d-8a7a-2b7815ac4abc:image.png)

![image.png](attachment:dc52d3bd-3e5c-48dd-8b38-04fbbb799626:image.png)

![image.png](attachment:92c3d2cf-3332-46e5-b8b2-12bb449654e7:image.png)

![image.png](attachment:ed783898-b08d-4fc8-9bcb-053a8e0d1909:image.png)

## 레이아웃 컴포넌트

- HeaderView - 고창진
- NavView - 고창진
- MainView - 고창진
- FooterView - 고창진

## 라우터 구성

- HomePage - 고창진
- LoginPage - 김재현
- SignupPage - 김재현
- ProfileEditPage - 김재현
- BudgetListPage - 모정민
    - BudgetListItem - 모정민
- BudgetDetailPage- 최준혁
- AddBudgetDetailPage - 고창진
    - 필요할거 같은 컴포넌트
- UpdateBudgetDetailPage - 고창진
- ~~NoticePage~~

## Pinia 관련

- api/* - 장혁

## 프로젝트 구조 설계

```bash
.
├── README.md
├── db.json
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── api
│   │   ├── apiClient.js         
│   │   ├── userService.js       
│   │   └── apiUtil.js           
│   ├── assets
│   ├── components
│   │   ├── Layouts
│   │   │   ├── FooterView.vue
│   │   │   ├── HeaderView.vue
│   │   │   ├── MainView.vue
│   │   │   └── NavView.vue
│   │   └── budgetItem
│   │       └── BudgetListItem.vue
│   ├── main.js
│   ├── pages
│   │   ├── HomePage.vue
│   │   ├── budgets
│   │   │   ├── AddBudgetDetailPage.vue
│   │   │   ├── BudgetDetailPage.vue
│   │   │   ├── BudgetListPage.vue
│   │   │   └── UpdateBudgetDetailPage.vue
│   │   └── user
│   │       ├── LoginPage.vue
│   │       ├── ProfileEditPage.vue
│   │       └── SignupPage.vue
│   ├── router
│   │   └── index.js
│   └── stores
│       └── counter.js
└── vite.config.js

```

| 폴더 경로 | 작성할 내용 |
| --- | --- |
| /src/App.vue | 레이아웃 및 라우터 뷰 작성 |
| /src/Layouts/HeaderView.vue | 헤더 레이아웃 작성( 로그인/회원가입 버튼, 제목) |
| /src/Layouts/NavView.vue | 네비게이션 레이아웃 작성( 각 페이지에 따른 라우터 링크 작성) |
| /src/Layouts/MainView.vue | 라우터 뷰가 나타내는 레이아웃 작성 |
| /src/Layouts/Footer.vue | 푸터 레이아웃 작성( 저작권, 소셜미디어링크 ) |
| /src/pages/budgets/AddBudgetDetailPage.vue | 거래 내역 추가 페이지 작성 |
| /src/pages/budgets/UpdateBudgetDetailPage.vue | 거래 내역 수정 페이지 작성 |
| /src/pages/budgets/BudgetListPage.vue | 필터에(날짜/주간/월별/카테고리) 따른 거래 내역 작성 |
| /src/components/budgetItem/BudgetListItem.vue | 거래 내역 리스트를 위한 아이템 컴포넌트 작성 |
| /src/pages/user/LoginPage.vue | 로그인 페이지 작성 (이메일, 비밀번호 입력 폼) |
| /src/pages/user/SignupPage.vue | 회원가입 페이지 작성 (이메일, 비밀번호, 이름 입력 폼) |
| /src/pages/user/ProfileEditPage.vue | 사용자 프로필 수정 페이지 작성 |
| /src/api/userService.js | 각 API 엔드포인트에 대한 함수 작성 |
| /src/api/apiClient.js | HTTP 클라이언트 설정 모듈 생성 |
| /src/api/apiUtil.js | API 호출 결과에 대한 에러 처리 로직 작성 |

# 3. JSON-SERVER 설계 및 엔드포인트 지정

## a. 로그인 화면

**엔드포인트:** `/user`

```json
"user": [
	{
		"id": String, //pk
		"email": String,
		"password": String,
		"username": String,
		"role": String
	}
]
```

## b. 가계부 기록 화면

**엔드포인트:** `/budgetBook`, `/budgetBook/:id`

```json
"budgetBook": [
	{
		"id": String, //pk
		"userId": "id", //fk user pk id
		"createdDate": Date,
		"updatedDate": Date,
		"amount": Integer,
		"transactionType": String, // "income" or "expense"
		"category": String, //
		"memo": String
	}
]
```

## c. 가계부 카테고리

**엔드포인트:** `/category`

```json
"category": [
    {
      "id": String, //pk
      "item": String, // ex) "월급", "교통비"
    },
    ...
  ]
```

## d. 엔드포인트 테스트

| 요청 메소드 | 요청 URL | 확인 완료 |
| --- | --- | --- |
| GET | http://localhost:3000/user | O |
| GET | http://localhost:3000/user/:id | O |
| POST | http://localhost:3000/user/ | O |
| PUT | http://localhost:3000/user/:id | O |
| DELETE | http://localhost:3000/user/:id | O |
| GET | http://localhost:3000/budgetBook | O |
| GET | http://localhost:3000/budgetBook/:id | O |
| GET | http://localhost:3000/budgetBook?userId=u123 | O |
| POST | http://localhost:3000/budgetBook | O |
| PUT | http://localhost:3000/budgetBook/:id | O |
| DELETE | http://localhost:3000/budgetBook/:id | O |
| GET | http://localhost:3000/category?id=c001 | O |

## e. db.json 예시

```json
{
  "user": [
    {
      "id": "u123",
      "email": "hamzzang@example.com",
      "password": "$2a$10$AbcdEfghIjklMnopQrstuVwxyZ",
      "username": "고창진",
      "role": "user"
    }
  ],
  "budgetBook": [
    {
      "id": "b001",
      "userId": "u123",
      "createdDate": "2025-04-01T09:00:00Z",
      "updatedDate": "2025-04-01T09:00:00Z",
      "amount": 3000000,
      "transactionType": "income",
      "category": "월급",
      "memo": "4월 급여"
    },
    {
      "id": "b002",
      "userId": "u123",
      "createdDate": "2025-04-03T12:30:00Z",
      "updatedDate": "2025-04-03T12:30:00Z",
      "amount": 15000,
      "transactionType": "expense",
      "category": "식비",
      "memo": "점심 김밥천국"
    },
    {
      "id": "b003",
      "userId": "u123",
      "createdDate": "2025-04-05T18:45:00Z",
      "updatedDate": "2025-04-05T18:45:00Z",
      "amount": 30000,
      "transactionType": "expense",
      "category": "교통비",
      "memo": "버스 교통카드 충전"
    }
  ],
  "category": [
    {
      "id": "c001",
      "item": "월급"
    },
    {
      "id": "c002",
      "item": "용돈"
    },
    {
      "id": "c003",
      "item": "이자"
    },
    {
      "id": "c004",
      "item": "식비"
    },
    {
      "id": "c005",
      "item": "교통비"
    },
    {
      "id": "c006",
      "item": "유흥"
    },
    {
      "id": "c007",
      "item": "공과금"
    }
  ]
}
```

# 4. 협업 규칙

## a. 코드 컨벤션

- 기본 컨벤션 도구 : ESLint, Prettier
- JSON 파일 컨벤션:
    - Tab키 사용 X
    - 들여쓰기는 스페이스 두번
- Vue 관련 컨벤션:
    - 파일 이름: `PascalCase.vue`
    - 컴포넌트 이름: 2단어 이상
    - 컴포넌트 구성: <template> → <script> → <style> 순서
        
        ```jsx
        <template>
        
        </template>
        
        <script setup>
        </script>
        
        <style scoped>
        </style>
        ```
        
    - 변수명: `camelCase`
    - 함수명: `camelCase`, (동사 + 명사)
    - 프로미스 사용 지양 : `await` /`async` 비동기 함수 사용
    - 약어 사용 금지
    - 함수 파라미터 3개 이하로 제한

## b. 깃 컨벤션

### 커밋 및 이슈 컨벤션

```bash
feat~~(type)~~: 로그인 기능 추가

- 사용자가 이메일과 비밀번호를 입력하면 검증하는 기능 추가.

- issue: #12

```

| Type | 의미 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩토링 (기능 변화 없음) |
| `style` | 코드 스타일 변경 (세미콜론 추가, 공백 수정 등) |
| `docs` | 문서 수정 (README 변경 등) |
| `chore` | 빌드, 패키지 매니저 설정 등 기타 작업 |

### 깃 브랜치 컨벤션

```bash
# git checkout -b feature/기능이름
```

- master (main): 바로 product로 release(배포)할 수 있는 브랜치
- feature : 기능 개발을 위한 브랜치, master로 PR(Pull Request)가능)
