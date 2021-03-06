const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var abc = require('./controller/routes/game-routes'); 

mongoose.connect('mongodb+srv://Kabir_Sethi:mongokabirdb@cluster0-sh5xs.mongodb.net/cricketTeamDBS?retryWrites=true&w=majority',{ useUnifiedTopology: true,
useNewUrlParser: true, useFindAndModify: false}).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(require('./controller/routes/page1'));
app.use('/stadium',abc);

app.listen(process.env.PORT || 4000,()=>{
    console.log("now listening to requests...");
});