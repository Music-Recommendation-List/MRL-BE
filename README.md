# MRL(Music Recommended List) 백엔드

![image](/app/public/images/KakaoTalk_20211016_162046491.png)

## 📰 상세 페이지 
![image](/app/public/images/KakaoTalk_20211016_164554290.png)
![image](/app/public/images/KakaoTalk_20211016_164417367.png)
![image](/app/public/images/KakaoTalk_20211016_164448670.png)
![image](/app/public/images/KakaoTalk_20211016_185207196.png)

## 💻 웹 사이트

http://3.34.44.44/

## 🎬 실행화면
유튜브 링크 : https://www.youtube.com/watch?v=P5zLhz87kGE&ab_channel=%EC%9E%A5%EC%9E%AC%EC%9B%90  

## ⚙️ 기술 스택 및 툴

<img src="https://img.shields.io/badge/Yarn-1.22.15-2C8EBB?style=flat-square&logo=Yarn&logoColor=white"/> <img src="https://img.shields.io/badge/React-17.0.1-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-5.2.0-CA4245?style=flat-square&logo=React Router&logoColor=white"/> <img src="https://img.shields.io/badge/Redux-4.1.1-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/MaterialUI-5.0.3-0081CB?style=flat-square&logo=Material-UI&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-0.21.1-764ABC?style=flat-square&logo=Axios&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-8.0.0-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-14.15.1-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-14.15.1-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Express-4.16.1-000000?style=flat-square&logo=Express&logoColor=white"/>  

## 🎧 MRL(Music Recommended List)소개

- 즐겨 듣는 노래를 서로에게 공유하는 웹 서비스
- 노래의 카테고리를 통해 자신에게 가장 필요한 노래를 추천 받아 볼 수 있는 기능 사용
- 다른 사람의 애창곡을 확인하고 댓글 기능 사용

## 🙋 팀원

- Front-end(React): 류승환, 김기철, 박새봄
- Back-end(Node.js): 장재원, 김영우, 임성찬

## 🌎 API

https://www.notion.so/5e1322440c5049f1806615dd1ee1cf4c?v=8bce2554108043539cc4bd58852e0f37  

## 📖 주요 라이브러리

| 라이브러리   | 설명 |
| ------------ | ---- |
| sequelize	| MySQL ORM |
| sequelize-cli |	MySQL ORM Console |
| express |	서버 |
| dotenv       | db주소, 시크릿 키 암호화 |
| path         |  Directory 경로 확인 |
| eslint       | 코팅 스타일 가이드 |
| cors         | CORS를 활성화 |
| jsonwebtoken | 회원인증 시스템 |
| joi          | 입력데이터 검증 |
| bcrypt       | 비밀번호 암호화 |
| helmet       | 웹 보안 |
| morgan       | http 로그 |

## ✨ 주요 기능

1. 로그인

- 계정의 비밀번호 bcrypt로 사용하여 암호화 저장을 합니다.
- JWT 토큰을 사용합니다.
- joi 라이브러리를 이용해서 사용자의 정규식 표현을 지향했습니다.

2. 음악 리스트 조회

- 사용자가 카테고리를 선택하여 추천 음악을 공유합니다.
- 유튜브 썸네일을 자동으로 받아와 보여줍니다.
- 자신이 현재 원하는 카테고리를 선택하여 그에 해당하는 음악 리스트를 들을 수 있습니다.

3. 음악 상세 페이지

- 댓글을 작성 할 수 있습니다.
- 다른 사람이 추천한 음악을 바로 재생하여 볼 수 있습니다.(유튜브 연동)

## 😱 어려웠던 부분

1. Front-end와 Back-end의 정보 교환

- cors를 사용하고 Front-end는 Access-Control-Allow-Origin: \* 처리를 했으나, 이 사이트는 보안연결(HTTPS)이 사용 되지 않습니다라는 문구 표시가 되는 현상과, 알 수 없는 오류들로 인해 많이 고생했습니다.
- 간혹가다 서버가 꺼지는 현상

2.  ec2의 배포 과정

- Front-end의 빌드업 과정을 거친 후 Back-end의 프로그램 실행으로 처리 했으나, 이보다 더욱 smart한 방법이 있는지 서로 알아본 과정.

3.  API 설계

- API 설계 당시 서로 axios 호출로 request, response를 미리 정해 두고 줄 값과 응답 메세지를 나누는 작업
- 설계가 초반처럼 바로 이뤄지지 않고 많은 수정 끝에 결국 맞추게 되었는데, 설계를 미흡하더라도 요청과 응답을 잘 구분 해두면 Front-end와 Back-end가 서로 API 설계 문서만 봐도 프로그램을 짤 때 많이 편하고 속도도 올라 갈 것 같다는 생각을 했습니다.

4.  REST API

- REST API를 생각하면서 api 주소를 만들었지만, 더욱 RESTful 한 주소에 대해서 많은 고민을 하였고, 현재도 부족하지만, 앞으로 계속해서 api 통신을 하게 된다면 더욱 더 RESTful 하게 될 것 같습니다.

5. git

- main branch를 두고 dev, 팀원들로 나눠 개인 작업을 하고 merge하는 부분에서 파일이 수정되고 날라가는 현상이 많이 발생했지만, 반복된 작업을 통해 작업환경을 나누는 것에 대해 충분히 이해하였고, 현업에서 얼마나 중요한 부분인지 많이 깨닳게 되는 계기가 되었습니다.
