const express = require('express');
const router = express.Router();

const teams = require('../../model/cricketTeamMod'); 
var selectedPlrs = [];
var callplrs = []

router.get('/team/getTeam/:tm', (req,res,next)=>{// player[name].
    teams.find({'teamName': req.params.tm},(err,data)=>{
        if(err) throw err;
        callplrs = [];
        data.map((item)=>{
            callplrs.push({name:item.player[0].name})});
        //     callplrs.push(item)});
        res.send(callplrs);
    });
});


router.put('/team/update'), (req,res,next)=>{
    req.body.forEach((item)=>{
        teams.find({'players[0].name': item.name},(x)=>{
        selectedPlrs.push(x) ; 
      }); 
      res.send(selectedPlrs);
    });
}

//!! Only for back-end to initialise the team players through POSTMAN
router.post('/team/postTeam',(req,res,next)=>{
    console.log("Recieved: "+req.body);
    // teams.save(req.body).then((data)=>{ // returns a promise, create is a mongooose method
    teams.create(req.body).then((data)=>{
        res.send(data)});
    // });
});

module.exports = router;