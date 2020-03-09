const express = require('express');
const router = express.Router();
const multer  = require('multer');
var upload = multer({ dest: 'public/upload' });

/* GET home page. */
router.all('/', function(req, res, next) {
  res.render('index', { title: 'Try Post Data'});
});

/* Mongoose */
const mongoose = require('mongoose');
const userSchemeList  = {
  name: {
      type: String,
      required: true,
      minlength:3,
      maxlength:20
  }
};//require('userscheme');

const { Schema } = mongoose;
const userScheme = new Schema(userSchemeList);
const User = mongoose.model('User', userScheme);
const url = 'mongodb://localhost:27017/tetra_database';
const params = {
  useNewUrlParser: true, useUnifiedTopology: true 
};

mongoose.connect(url, params, (err, res) => {
  if (err) throw err(err);
  else {
    console.log('Database online');
  }
});

async function saveData(user) {
  try {
    await user.save();
    mongoose.disconnect();
    return true;
  } catch (error) {
    return false;
  }
}

router.post('/post', upload.none(), async function (req, res, next) {
  try{
  const postData = req.body.userName;
  const data = new User({ name: postData });
  const resp = await saveData(data);
  if(!resp){
    return res.json({ valid: false, status: 'Минимум 3 символа' });
  }
    return res.json({ valid: true, status: 'Добавлен' });
  } catch (error) {
  console.log(error);
}
})

module.exports = router;
