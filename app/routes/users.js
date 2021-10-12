const express = require("express");
const router = express.Router();
const { authMW } = require("../middlewares/authMW");
const { logInFn } = require("../controller/logIn");
const { signUpFn } = require("../controller/signUp");
const { userAuthController } = require("../controller/userAuth");

//로그인 API
router.post("/users/login", logInFn);

// 회원가입 api
router.post("/users/signup", signUpFn);

//중복검사?

//사용자 인증 미들웨어
router.get("/users/me", authMW, userAuthController);

module.exports = router;
