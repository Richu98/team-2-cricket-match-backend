const express = require('express');
const router = express.Router();

const teams = require('../../model/cricketTeamMod'); 
var selectedPlrs = [];
var finalTeam =[]; 
var callplrs = []; count = 0;
    

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

function pickTeam(array){
    if(count==0){
        finalTeam = [{array}];
        count = 1;
    }else{
        finalTeam.push({array});
        count =0;
    }    
}

router.put('/team/update', (req, res, next)=>{
    selectedPlrs = req.body.team;
    pickTeam(selectedPlrs);
    selectedPlrs.map((item)=>{

    let filter = {players: {$elemMatch:{name: item.name}}}
    let update = {"players.$.active":'true', "players.$.scored": 0}
    teams.findOneAndUpdate(filter,update,(err,data)=>{
        console.log("Player selected");
    })
   }); res.send("Done");
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

router.get('/team/start', (req,res,next)=>{
    var teamList = [];
    teams.find({},{_id:1}).then((item)=>{
        res.send(item);
    })    
})

//finalTeam = [ [  {name: "Sanjeet" }], [  {name: "Raju" }]];
module.exports = {router:router,
finalTeam: finalTeam};