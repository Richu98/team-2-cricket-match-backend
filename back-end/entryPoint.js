const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 

mongoose.connect('mongodb+srv://Kabir_Sethi:mongokabirdb@cluster0-sh5xs.mongodb.net/cricketTeamDB?retryWrites=true&w=majority',{ useUnifiedTopology: true,
useNewUrlParser: true}).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(require('./controller/routes/page1'));

app.listen(4000,()=>{
    console.log("now listening to requests...");
});