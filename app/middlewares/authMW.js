const Jwt = require('jsonwebtoken');
const User = require('../schemas/User');

exports.authMW = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(200).send({
      errorMsg: '로그인 후 사용하세요.',
    });
  }

  try {
    const targetUserId = Jwt.verify(tokenValue, 'mini-project');
    console.log(targetUserId, targetUserId.userId, "여기!");
    User.findOne({ userId: targetUserId.userId }).then((targetUserInfo) => {
      res.locals.targetUserInfo = targetUserInfo; //locals는 데이터에서 사용자가 마음대로 사용할 수 있는 공간..
      console.log(res.locals.targetUserInfo, "여기여기!")
      next();
    });
  } catch (error) {
    res.status(200).send({
      errorMsg: '로그인 후 사용하세요.',
    });
    return;
  }
};
