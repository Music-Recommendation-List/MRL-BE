const userAuthController = async (req, res) => {
  const { targetUserInfo } = res.locals;
  console.log(targetUserInfo, "여기도 지나간다!!!");
  res.send({ targetUserInfo });
};

module.exports = userAuthController;