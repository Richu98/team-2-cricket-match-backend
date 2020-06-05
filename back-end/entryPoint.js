const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var abc = require('./controller/routes/game-routes'); 

mongoose.connect('mongodb+srv://Kabir_Sethi:mongokabirdb@cluster0-sh5xs.mongodb.net/cricketTeamDB?retryWrites=true&w=majority',{ useUnifiedTopology: true,
useNewUrlParser: true, useFindAndModify: false}).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(require('./controller/routes/page1').router);
app.use('/stadium',abc);

app.listen(4000,()=>{
    console.log("now listening to requests...");
});