const express = require('express');
const router = express.Router();

const teams = require('../../model/cricketTeamMod');
var selectedPlrs = [];
var finalTeam = [];
var callplrs = [];

router.get('/team/start',(req, res, next)=>{
    teams.find({},{teamName:1,_id:1}).then((item)=>{
        res.send(item);
    })


})

router.get('/team/getTeam/:teamId', (req, res, next) => {// player[name].
    let tName = " ";
    teams.findById(req.params.teamId, (err, data) => {
        if (err) throw err;
        callplrs = []; 
        tName = data.teamName;
        data.players.map((item) => {
            callplrs.push({ 'name': item.name })
        });
        // res.send(data);
        res.send({teamName: tName, team: callplrs });
    });
});

function pickTeam(array) {
    finalTeam.push({ array });
    console.log(finalTeam);
}

router.put('/team/SendToGround', (req, res, next) => {
    selectedPlrs = req.body.team;
    new Promise((resolve, reject) => {
        pickTeam(selectedPlrs); resolve("Modifying data")
    }).then((x) => {
        selectedPlrs.map((item) => {

            let filter = { players: { $elemMatch: { name: item.name } } }
            let update = { "players.$.active": 'true', "players.$.scored": 0 }
            teams.findOneAndUpdate(filter, update, (err, data) => {
                console.log(x + ": Player selected");
            });
        }); res.send(finalTeam);
    });
});

//!! Only for back-end to initialise the team players through POSTMAN
function addPlayer(team, data) {

    let filter = { 'teamName': team }
    let update1 = { $addToSet: { players: { $each: data } } };
    let update2 = { $addToSet: { players: data[0] } };
    if (data.length > 1) {
        teams.updateOne(filter, update1, (err, dat) => {
            if (err) throw err;
            console.log(data);
            return dat;
        })
        // console.log(data)
    } else {
        teams.updateOne(filter, update2, { new: true }, (err, dat) => {
            if (err) throw err;
            console.log(data[0]);
            return dat;
        });
    }
}

router.post('/team/createTeam', (req, res, next) => {
    console.log("Recieved: " + req.body);
    // teams.save(req.body).then((data)=>{ // returns a promise, create is a mongooose method
    teams.findOne({ 'teamName': req.body.teamName }, (err, data) => {
        if (data) {
            console.log("Team exists already");
            res.send(addPlayer(req.body.teamName, req.body.players));
        } else {
            console.log("Building new team");
            teams.create(req.body).then((data) => {
                res.send(data)
            });
        }
    });
});

router.get('stadium/bringTeam', (req,res,next)=>{
    
    res.send(finalTeam);
});

module.exports = router;