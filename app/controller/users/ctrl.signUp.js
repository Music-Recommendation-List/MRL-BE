const { User } = require("../../models");
const signSchema = require("../../models/joi/joi");
const bcrypt = require("bcrypt");

// 회원가입 컨롤러
const signUpFn = async (req, res) => {
  const { userId, password, passwordConfirm } = req.body;

  try {
    //아이디,비밀번호,비밀번호확인을 joi에서 검사
    await signSchema.validateAsync({ userId, password, passwordConfirm });
  } catch (error) {
    console.log("다른 아이디와 비밀번호가 필요합니다!");
    return res.status(400).send({
      ok: false,
      message: "아이디와 비밀번호의 형식이 올바르지 않습니다.",
    });
  }

  //bcrypt를 통한 패스워드 단방향 암호화
  const encryptedPassowrd = bcrypt.hashSync(password, 10);

  //아이디 중복검사
  const user = await User.findOne({ where: { userId } });
  if (user) {
    console.log("다른 아이디가 필요합니다!");
    return res.status(400).send({
      ok: false,
      message: "중복된 아이디입니다.",
    });
  }

  //패스워드 일치검사
  if (password !== passwordConfirm) {
    console.log("비밀번호와 비밀번호 확인이 불일치합니다.");
    return res.status(400).send({
      ok: false,
      message: "패스워드와 패스워드 확인이 일치하지 않습니다.",
    });
  }
  // 패스워드에 아이디 포함여부 검사
  if (password.match(userId) !== null) {
    console.log("비밀번호에 아이디를 포함!");
    return res.status(400).send({
      ok: false,
      message: "아이디가 포함된 비밀번호는 사용이 불가능합니다.",
    });
  }

  // 모든 검증을 통과하여 회원 생성
  await User.create({
    userId: userId,
    password: encryptedPassowrd,
    date: new Date(),
  });
  return res.status(200).send({
    ok: true,
    message: "회원가입에 성공하였습니다.",
  });
};

module.exports = signUpFn;
