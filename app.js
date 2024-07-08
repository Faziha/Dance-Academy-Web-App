const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 8080;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'));

//END POINTS
app.get('/',(req,res)=>{
    const params ={ }
    res.status(200).render('home.pug',params)
})

app.get('/contact',(req,res)=>{
    const params ={ }
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to db")
    }).catch(()=>{
        res.status(400).send("Item was not saved to db")
    })
    // res.status(200).render('contact.pug')
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});


