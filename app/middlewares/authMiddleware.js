import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../schemas/User.js';

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined || authorization === null) {
    return res.status(401).send({
      message: '로그인 토큰이 없습니다.',
    });
  }

  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(401).send({
      message: '로그인 토큰에 문제가 생겼습니다.',
    });
  }

  if (tokenValue === null) {
    return res.status(401).send({ message: '로그인이 필요합니다' });
  }

  try {
    // jwt를 통한 로그인 토큰 확인
    const { user } = jwt.verify(tokenValue, process.env.JWT_SECRET_Key);

    await User.findOne({ userName: user })
      .then((user) => {
        // console.log("find id");
        res.locals.user = user;
        next();
      });
  } catch (error) {
    // console.log("can not find id");
    return res.status(401).send({ message: '로그인이 필요합니다' });
  }
};

export default authMiddleware;
