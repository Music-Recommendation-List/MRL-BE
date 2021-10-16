const userAuthController = async (req, res) => {
  const { targetUserInfo } = res.locals;
  console.log(targetUserInfo);
  res.send({ targetUserInfo });
};

module.exports = userAuthController;