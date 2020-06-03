const express = require('express');
const router = express.Router();

const teams = require('../../model/cricketTeamMod'); 
var selectedPlrs = [];
var callplrs = []
var stringify = require('json-stringify-safe');

router.get('/team/getTeam/:tm', (req,res,next)=>{// player[name].
    teams.find({'teamName': req.params.tm},(err,data)=>{
        if(err) throw err;
        callplrs = [];
        data.map((item)=>{
            callplrs.push({'name':item.player.name})});
        //     callplrs.push(item)});
        res.send({team:callplrs});
    });
});

router.put('/team/update', (req, res, next)=>{
    var selectedPlrs = req.body.team;
    selectedPlrs.forEach((item)=>{
        var filter = {'player.name': item.name};
        var update = {'player.active' : 'true'}
        
        teams.findOneAndUpdate(filter, update, {new: true, useFindAndModify: false }, (err, data) => {
            console.log(data);
        });
    });

});

//!! Only for back-end to initialise the team players through POSTMAN
router.post('/team/postTeam',(req,res,next)=>{
    console.log("Recieved: "+req.body);
    // teams.save(req.body).then((data)=>{ // returns a promise, create is a mongooose method
    teams.create(req.body).then((data)=>{
        res.send(data)});
    // });
});


module.exports = router;