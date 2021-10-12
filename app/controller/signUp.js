const User = require('../schemas/User');
const signSchema = require('../schemas/joi');


// 회원가입 컨트롤러
exports.signUpFn = async (req, res) => {
  console.log(req.body);
  const { userId, password, passwordConfirm } = req.body;

  try{
    //아이디,비밀번호,비밀번호확인을 joi에서 검사
    await signSchema.validateAsync({ userId, password, passwordConfirm });
  } catch(error) {
    console.log('다른 아이디와 비밀번호가 필요합니다!');
    return res.status(200)
              .send({
                "result" : "valiationFailed",
                "errorMsg": "아이디와 비밀번호의 형식이 올바르지 않습니다."
              });
  }

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
};