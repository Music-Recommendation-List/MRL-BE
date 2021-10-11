import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoConnect = async () => {
  const environment = process.env.NODE_ENV?.toUpperCase();
  const mongoURI = environment === 'DEV' ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI;

  await mongoose.connect(mongoURI)
    .then(() => console.log('몽고디비 연결!'))
    .catch((error) => console.error('몽고디비 연결 에러', error));
};

export default mongoConnect;
