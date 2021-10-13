import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../schemas/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { userPostSchema } from '../joi.js';

// 환경변수를 통한 jwt key 보안
dotenv.config();

const router = express.Router();

const getMe = async (req, res, next) => {
  const { user } = res.locals;
  res.send({ user: { userName: user.userName } });
  next();
};

export const join = async (req, res) => {
  try {
    // joi를 통한 validation, message처리
    const { userName, password, confirmPassword } =
      await userPostSchema.validateAsync(req.body)
        .catch((error) => {
          throw error.details[0].message;
        });
    const date = new Date();
    // bcrypt를 통한 패스워드 단방향 암호화
    const encryptedPassowrd = bcrypt.hashSync(password, 10);

    const existId = await User.findOne({ userName });
    if (existId) {
      return res.status(400).send({ message: '중복된 닉네임입니다.' });
    }

    const sameNamePwd = userName === password;
    if (sameNamePwd) {
      return res.status(400).send({ message: '아이디와 비밀번호가 달라야 합니다. ' });
    }

    const user = new User({ userName, password: encryptedPassowrd, date });
    await user.save();

    return res.status(201).send({ message: '정상적으로 회원가입하였습니다!' });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  // bcrypt를 통한 비밀번호 검증(단방향이므로 검증 함수를 이용해야 함)
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).send({
      message: '잘못된 아이디 또는 패스워드입니다',
    });
    return;
  }
  // jwt를 이용하여 token생성, 프론트에서 token을 localStorage로 보내준다.
  const token = jwt.sign({ user: user.userName }, process.env.JWT_SECRET_Key);
  res.send({ token });
};

router.get('/me', authMiddleware, getMe);
router.post('/join', join);
router.post('/login', login);

export default router;
