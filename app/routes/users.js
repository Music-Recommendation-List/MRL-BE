var express = require("express");
var router = express.Router();


// 로그인 api
//db에서 찾아서 맞다면 토큰 발행
router.get("/login");

// 회원가입 api
//db에서 중복검사
//db에 추가
router.post("/login");

module.exports = router;
