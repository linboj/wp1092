import mongoose from 'mongoose';

function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongo connected!');
  });
}
//mongoose.set('useFindAndModify', false);
const mongo = {
  connect: connectMongo,
};

export default mongo;
