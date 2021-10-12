const express = require("express");
const router = express.Router();
const signInFunc = require("./signIn");
const signUpFunc = require("./signUp");
const authMW = require("../middlewares/authMW");
const signSchema = require('./joi');
const User = require('../schemas/User');
const Joi = require('joi');




//로그인 API

router.post('/users/login', async (req, res) => {
  console.log(req.body);
  const { userId, password } = req.body;

  const isUser = await User.findOne({ userId, password });
  console.log(isUser);
  if (isUser) {
    console.log('유저확인 완료');
    console.log('로그인 진행');

    //회원정보 암호화
    const token = Jwt.sign({ userId: isUser.userId }, 'mini-project');
    console.log(userId);
    return res.status(201).send({
      token: token,
      userId: userId,
      message: '로그인 성공!',
    });
  } else {
    console.log('유저확인 실패');
    console.log('로그인 실패');
    return res.status(200).send({
      // 로그인에 실패했으니 다시 로그인 창을 보낼까요? window.location.herf='/login'
      // status 200인 이유는 콘솔창의 오류문구를 보기 싫은..마음..
      errorMsg: '로그인 실패!',
    });
  }
});


const userSchema = Joi.object({
  userId: Joi.string()
    .min(3)
    .regex(/^[0-9a-z]+$/i)
    .required(),
  password: Joi.string().min(3).required(),
  passwordConfirm: Joi.string().min(3).required(),
});


// 회원가입 api

//db에서 중복검사
//db에 추가
router.post('/users/signup', async (req, res) => {
  console.log(req.body);

  try{
    //아이디,비밀번호,비밀번호확인을 joi에서 검사
    console.log('여기는 실행?');
    const { userId, password, passwordConfirm } = await userSchema.validateAsync(req.body);
    console.log('여기는 실행!!!!!');

    //아이디 중복검사
  const isUser = await User.findOne({ userId });
  console.log(isUser);
  if (isUser) {
    console.log('다른 아이디가 필요합니다!');
    return res.status(200)
              .send({
                "result" : "nickNameUsed",
                "errorMsg": "중복된 아이디입니다."
              });
  }

  //패스워드 일치검사
  if( password !== passwordConfirm) {
    console.log('비밀번호와 비밀번호 확인이 불일치합니다.')
    return res.status(200)
              .send({
                "result" : "pwCheckNotSamePw",
                "errorMsg": "패스워드와 패스워드 확인이 일치하지 않습니다."
              });
  }
  // 패스워드에 아이디 포함여부 검사
  if(password.match(userId) !== null){
    console.log('비밀번호에 아이디를 포함!')
    return res.status(200)
              .send({
                "result" : "pwOverlapNickName",
                "errorMsg": "아이디가 포함된 비밀번호는 사용이 불가능합니다."
              });
  }

  // 모든 검증을 통과하여 회원 생성
  console.log("여기까지 내려오나?");
  await User.create({ "userId": userId, "password": password, "date": new Date() });
  console.log('회원 생성 완료')
    return res.status(200)
              .send({
                "result" : "success",
                "successMsg": "회원가입에 성공하였습니다."
              });

  } catch(error) {
    console.log('다른 아이디와 비밀번호가 필요합니다!');
    return res.status(200)
              .send({
                "result" : "valiationFailed",
                "errorMsg": "아이디와 비밀번호의 형식이 올바르지 않습니다."
              });
  }
});




// //로그인 검사
// // 회원가입/로그인/게시글목록조회/게시글조회 를 제외한 나머지 페이지는 로그인시에만 허용
// // 로그인을 하지 않거나, 올바르지 않은 경로로 접속한 사용자 > "로그인이 필요합니다" > 로그인페이지로 이동
// // 로그인을 한 사용자가 로그인 or 회원가입 페이지에 접속한 경우 "이미 로그인이 되어있습니다" - 전체 게시글페이지로 이동
// router.get('/users/me', authMW, async (req, res) => {
//   // 로컬스토리지에 있는 값을 미들웨어를 통해 헤드로 넣기 위한 작업
//   const { userInform } = res.locals;
//   // console.log(user);
//   res.send({ userInform });
// });
// // ㄴ 사용자 정보를 페이지에 보내주는 라우터
// // ㄴ 미들웨어를 거쳐서 암호화 된 정보를 클라이언트에 넘겨주는 것


module.exports = router;
