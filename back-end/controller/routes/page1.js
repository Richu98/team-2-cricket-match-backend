const express = require('express');
const router = express.Router();

const teams = require('../../model/cricketTeamMod'); 
var selectedPlrs = [];
var callplrs = []

router.get('/team/getTeam/:teamId', (req,res,next)=>{// player[name].
    teams.findById(req.params.teamId,(err,data)=>{
        if(err) throw err;
        callplrs = [];
        data.players.map((item)=>{
            callplrs.push({'name':item.name})});
        // res.send(data);
        res.send({team:callplrs});
    });
});

router.put('/team/update', (req, res, next)=>{
    var selectedPlrs = req.body.team;
   selectedPlrs.map((item)=>{

    let filter = {players: {$elemMatch:{name: item.name}}}
    let update = {"players.$.active":'false'}
    teams.findOneAndUpdate(filter,update,(err,data)=>{
        res.send(data);
    })
   }) 
});

//!! Only for back-end to initialise the team players through POSTMAN
function addPlayer(team,data){

    let filter = {'teamName': team} 
    let update1 = {$addToSet :{players:{$each: data}} };
    let update2 = {$addToSet :{players:  data[0]} };
    if(data.length>1){
        teams.updateOne(filter,update1 ,(err, dat)=>{
            if (err) throw err;
            console.log(data);
            return dat;
        })
        // console.log(data)
    }else {
        teams.updateOne(filter,update2, {new: true },(err, dat)=>{
        if (err) throw err;
        console.log(data[0]);
        return dat; });
    }    
}

router.post('/team/createTeam',(req,res,next)=>{
    console.log("Recieved: "+req.body);
    // teams.save(req.body).then((data)=>{ // returns a promise, create is a mongooose method
    teams.findOne({'teamName': req.body.teamName},(err,data)=>{
        if(data){
            console.log("Team exists already");
            res.send(addPlayer(req.body.teamName, req.body.players));
        }else {
            console.log("Building new team");
            teams.create(req.body).then((data)=>{
            res.send(data)});             
        }    
    });
});


module.exports = router;