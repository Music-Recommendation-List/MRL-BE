const { User } = require("../../models");
const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

// 로그인 컨트롤러
//db에서 찾아서 맞다면 토큰 발행
const logInFn = async (req, res) => {
  const { userId, password } = req.body;
  console.log(userId, password);
  console.log("------------=-=-=----------");
  const isUser = await User.findOne({ where: { userId } });
  if (!isUser || !bcrypt.compareSync(password, isUser.password)) {
    return res.status(200).send({
      ok: false,
      message: "잘못된 아이디 또는 패스워드입니다.",
    });
    return;
  }

  //회원정보 암호화
  const token = Jwt.sign(
    { userId: isUser.userId },
    process.env.JWT_SECRET_TOKEN
  );
  return res.status(201).send({
    ok: true,
    result: {
      token: token,
      userId: userId,
    },
    message: "로그인에 성공하셨습니다.",
  });
};

module.exports = logInFn;
