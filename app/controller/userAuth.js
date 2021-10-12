exports.userAuthController = async (req, res) => {
  const { userInform } = res.locals;
  // console.log(user);
  res.send({ userInform });
};