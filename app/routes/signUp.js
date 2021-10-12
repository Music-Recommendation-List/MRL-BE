const User = require('../schemas/User');
const signSchema = require('./joi')


// 회원가입 컨트롤러
exports.signUpFunc = async (req, res) => {
  console.log(req.body);
  //아이디,비밀번호,비밀번호확인을 joi에서 검사
  // try{
  const { userId, password, passwordConfirm} = await signSchema.validateAsync(req.body);
  
  //아이디 중복검사
  const isUser = await User.findOne({ userId });
  console.log(isUser);
  if (isUser) {
    console.log('다른 아이디가 필요합니다!');
    return res.status(200)
              .send({
                "errorMsg": "중복된 아이디입니다."
              });
  }

  //패스워드 일치검사
  if( password !== passwordConfirm) {
    console.log('비밀번호와 비밀번호 확인이 불일치합니다.')
    return res.status(200)
              .send({
                "errorMsg": "패스워드와 패스워드 확인이 일치하지 않습니다."
              });
  }
  // 패스워드에 아이디 포함여부 검사
  if(password.match(userId) !== null){
    console.log('비밀번호에 아이디를 포함!')
    return res.status(200)
              .send({
                "errorMsg": "아이디가 포함된 비밀번호는 사용이 불가능합니다."
              });
  }

  // 모든 검증을 통과하여 회원 생성
  await User.createOne({ userId, password });
  console.log('회원 생성 완료')
    return res.status(200)
              .send({
                "successMsg": "회원가입에 성공하였습니다."
              });
  // } catch(error) {
  //   return res.status(400)
  //             .send({
  //                     errorMsg: "알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요"
  //                   });
  // }
}