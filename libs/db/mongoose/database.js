import mongoose from 'mongoose';

function mainTest(){
  
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const BlogPost = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date
  });
  mongoose.model('BlogPost', BlogPost);

  const Comment = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now }
  });
  
  console.log('init DB')
}

export async function setupDatabase(){
  await mongoose.connect('mongodb://localhost/stest');
  //mainTest()
  /*
  const MyModel = mongoose.model('BlogPost');
  console.log(MyModel)
  const instance = new MyModel();
  console.log(instance)
  instance.title = "Hello";
  instance.save(function (err) {
    if(err){
      console.log(err)
      return;
    }
    console.log("save!")
  });
  */

  console.log("init db");
}