나이테 일기장 - 설치 안내
==========================

준비물: 구글 계정(Firebase용), GitHub 계정. 비용 없음.
걸리는 시간: 처음이면 30분~1시간.

[1] Firebase 프로젝트 만들기
  1. https://console.firebase.google.com 접속 → '프로젝트 만들기'
  2. 이름: naite-diary (아무거나 OK) → Google 애널리틱스는 꺼도 됨 → 만들기

[2] 로그인 방법 켜기
  1. 왼쪽 메뉴 '빌드 > Authentication' → '시작하기'
  2. '로그인 방법' 탭에서
     - '이메일/비밀번호' → 사용 설정 → 저장
     - 'Google' → 사용 설정 → 지원 이메일 선택 → 저장

[3] 웹 앱 등록하고 config 복사하기
  1. 프로젝트 개요 옆 톱니바퀴 → '프로젝트 설정'
  2. 아래쪽 '내 앱'에서 </> (웹) 아이콘 클릭
  3. 앱 닉네임: 나이테 → (Firebase 호스팅 체크는 하지 않음) → 앱 등록
  4. 화면에 나오는 const firebaseConfig = { ... } 에서 { } 안의 내용을 복사
  5. 이 폴더의 config.js 를 메모장으로 열어 { } 안을 통째로 바꿔 넣고 저장
     (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId 6줄)

[4] 일기 저장소(Firestore) 만들기
  1. 왼쪽 메뉴 '빌드 > Firestore Database' → '데이터베이스 만들기'
  2. 위치: asia-northeast3 (서울) → '프로덕션 모드'로 시작
  3. 만들어지면 '규칙' 탭 → 이 폴더의 firestore.rules 내용을 통째로 붙여넣기 → '게시'
     (본인 계정만 자기 일기를 읽고 쓸 수 있게 하는 규칙이에요. 꼭 해야 해요!)

[5] GitHub Pages에 올리기
  1. https://github.com 로그인 → 오른쪽 위 '+' → New repository
  2. 이름: naite (아무거나) → Public 선택 → Create repository
  3. 'uploading an existing file' 클릭 → 이 폴더의 파일과 icons 폴더를 통째로 끌어다 놓기
     (index.html, config.js, manifest.webmanifest, sw.js, icons 폴더 등)
     → Commit changes
  4. 저장소의 Settings → 왼쪽 Pages → Branch: main, 폴더: / (root) → Save
  5. 1~2분 뒤 같은 화면 위쪽에 주소가 뜸: https://내아이디.github.io/naite/
  6. Firebase로 돌아가 'Authentication > 설정 > 승인된 도메인' → '도메인 추가'
     → 내아이디.github.io 입력 → 추가   (이걸 안 하면 Google 로그인이 막혀요)

[6] 휴대폰에 설치하기
  - 아이폰: Safari로 주소 열기 → 공유 버튼 → '홈 화면에 추가'
  - 안드로이드: Chrome으로 주소 열기 → ⋮ 메뉴 → '앱 설치' 또는 '홈 화면에 추가'
  - 처음 열면 로그인 화면이 나와요.
    · 아이폰 홈 화면 앱에서는 Google 로그인 창이 잘 안 돌아오는 경우가 있어서
      '이메일로 가입' 후 이메일 로그인을 추천해요.
    · 컴퓨터에서도 같은 계정으로 로그인하면 자동으로 동기화돼요.

[7] 예전 일기 옮기기 (claude.ai 일기장에 쓴 게 있다면)
  1. 예전 일기장 → 날짜 하나 눌러 들어가기 → 맨 아래 '백업 복사'
  2. 새 앱 → 날짜 하나 눌러 들어가기 → 맨 아래 칸에 붙여넣기 → '불러오기'

[나중에 고칠 때]
  - 파일을 고쳐서 GitHub에 다시 올리면 앱도 자동으로 새 버전이 돼요.
  - sw.js 안의 'naite-v1'을 'naite-v2'처럼 바꿔 주면 휴대폰에 저장된 옛 화면이 확실히 새로 바뀌어요.

[알아두기]
  - config.js 값은 공개돼도 괜찮아요(Firebase 공식 설명상 비밀키가 아니에요).
    일기 내용은 [4]-3의 보안 규칙이 지켜 줘요.
  - 인터넷이 없을 때도 일기를 쓸 수 있고, 연결되면 자동으로 올라가요.
  - '백업 파일 저장'으로 가끔 파일 백업을 해 두면 더 안심이에요.
