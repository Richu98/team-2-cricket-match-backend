const express = require('express');
const router2 = express.Router();
const item = require('./page1');
const finalTeam = item.finalTeam;
const random = require('../../random');
const teams = require('../../model/cricketTeamMod'); 

var total = 0; var total1 = 0; var total2 =0; 
var nextIn = false;

router2.get('/bringTeam', (req,res,next)=>{
    total = 0;
    res.send(finalTeam);
});

var scored = 0;
var runs = 0;
function findplyr(plyr){
    console.log("Request for "+plyr);
    
    
    let filter = {players: {$elemMatch:{name: plyr}}};
    const blocking2 = new Promise((resolve, reject) =>{
    teams.findOne(filter,(err,item)=>{
        // console.log(item)
        item.players.forEach((obj)=>{   
            console.log(obj.name)  
            if(obj.name==plyr){
                scored = obj.scored;
                 runs = obj.runs;
                console.log("Found!" +obj.name)
                console.log("Scored: "+scored+"Type: "+typeof(scored));
            }
        });
    }) }).then(()=>{ console.log({scored, runs})})
}


router2.put('/endFirstInnings',(req,res,next)=>{
    nextIn = true;
    total1 = total;
});
//_____
router2.put('/matchUpdates/:plyr',(req,res,next)=>{
    var score = random(); var Score = 0; var Runs = 0;
    let filter = {players :{$elemMatch:{name: req.params.plyr}}}
    teams.findOne(filter).then(item=>{
        //const blocking = new Promise((response, reject) =>{
            item.players.forEach((x)=>{
                if(x.name==req.params.plyr){
                    Score = x.scored; Runs = x.runs;
                }
            })
        //} ).then(() =>{
            Score += score; Runs += score ; total += score;  
            let filter = {players: {$elemMatch:{name: req.params.plyr}}}
            let update = {"players.$.scored": Score, "players.$.runs": Runs}
            teams.findOneAndUpdate(filter,update,(err,dat)=>{
                console.log("Player score"+score);
            
            })
        //)})
    })

})
//_____
function closeMatch(array){
    array.map((item)=>{

        let filter = {players: {$elemMatch:{name: item.name}}}
        let update = {"players.$.active":'true'}
        teams.findOneAndUpdate(filter,update,(err,data)=>{
            console.log("Updated");
        });
    }); 
}
//total= 2; total1= 3; 



router2.put('/endMatch',(req,res,next)=>{
    console.log(finalTeam[1]);
    var total2 = total;
    closeMatch(finalTeam[0]);
    closeMatch(finalTeam[1]);
    res.send({team1Score: total1, team2Score: total2})
});
  
module.exports = router2;