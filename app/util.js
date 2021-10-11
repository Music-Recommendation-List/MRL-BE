/* eslint-disable import/prefer-default-export */

export const postDateParser = (thisPost) => {
  const copy = { ...thisPost._doc };
  const thisDate = copy.date;
  let month = `${thisDate.getMonth() + 1}`;
  let day = `${thisDate.getDate()}`;
  const year = thisDate.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const getDate = [year, month, day].join('.');
  const id = copy._id; //uid를 설정해 놨는데도 _id를 써야하네;
  copy.date = getDate;
  copy.uid = id;
  return copy;
};
