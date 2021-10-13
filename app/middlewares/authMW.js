const Jwt = require('jsonwebtoken');
const User = require('../schemas/User');
const dotenv = require('dotenv');
dotenv.config();

const authMW = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(200).send({
      ok: false,
      message: '로그인 후 사용하세요.',
    });
  }

  try {
    const targetUserId = Jwt.verify(tokenValue, process.env.JWT_SECRET_TOKEN);
    console.log(targetUserId, targetUserId.userId);
    User.findOne({ userId: targetUserId.userId }).then((targetUserInfo) => {
      res.locals.targetUserInfo = targetUserInfo; //locals는 데이터에서 사용자가 마음대로 사용할 수 있는 공간..
      console.log(res.locals.targetUserInfo);
      next();
    });
  } catch (error) {
    res.status(200).send({
      ok: false,
      message: '로그인 후 사용하세요.',
    });
    return;
  }
};

module.exports = authMW;