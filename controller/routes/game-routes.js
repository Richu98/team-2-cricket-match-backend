const express = require('express');
const router2 = express.Router();
const item = require('./page1');
const finalTeamFunc = item.finalTeamFunc;
const random = require('../../random');
const teams = require('../../model/cricketTeamMod');

const findOnePromise = (query) => new Promise((resolve, reject) => {
    teams.findOne(query, (err, data) => {
        if(err) {
            return reject(err);
        }

        resolve(data);
    });
});

const findOneAndUpdatePromise = (query, update) => new Promise((resolve, reject) => {
    teams.findOneAndUpdate(query, update, (err, data) => {
        if(err) {
            return reject(err);
        }

        resolve(data);
    });
})

var total = 0; var total1 = 0; var total2 =0; 
var nextIn = false; var scored = 0; var runs = 0

router2.get('/bringTeam', (req,res,next)=>{
    total = 0;
    res.send(finalTeamFunc);
});


router2.put('/endFirstInnings',(req,res,next)=>{
    nextIn = true;
    total1 = total;
});
//_____
function findPlyr(plyr){
    var filter = {players: {$elemMatch:{name: plyr}}};
    
    return findOnePromise(filter)
        .then(data => {
            let scored = 0; runs = 0;

            data.players.forEach((item)=>{
                console.log(item.name);
                if(item.name == plyr){
                    console.log("Player found");
                    scored = item.scored;
                    runs = item.runs; 
                }
            });

            return { scored, runs };
        }, err => {
            console.error(err);
        });
}

router2.put('/matchUpdates/:plyr',(req, res, next)=>{
    var total = 0;
    var filter = {players: {$elemMatch:{name: req.params.plyr}}};
    var score = random();

    findPlyr(req.params.plyr)
        .then(({scored, runs}) => {
            return findOneAndUpdatePromise(filter, { "players.$.scored": scored + score, "players.$.runs": runs + score });
        }).then(data => {
            res.status(200).json({ score });
        });
});

function closeMatch(array){
    array.map((item)=>{
        let filter = {players: {$elemMatch:{name: item.name}}}
        let update = {"players.$.active":'true'}
        teams.findOneAndUpdate(filter,update,(err,data)=>{
            res.send(data);
        });
    });
}

router2.put('/endMatch',(req,res,next)=>{
    closeMatch(finalTeam.team1);
    closeMatch(finalTeam.team2);
    res.send({team1Score: total1, team1Score: total2})
});

  
module.exports = router2;