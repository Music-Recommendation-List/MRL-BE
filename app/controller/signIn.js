const User = require('../schemas/User');
const Jwt = require('jsonwebtoken');


// 로그인 컨트롤러
//db에서 찾아서 맞다면 토큰 발행
exports.signInFn = async (req, res) => {
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
};
