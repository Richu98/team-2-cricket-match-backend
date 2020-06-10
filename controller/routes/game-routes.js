const express = require('express');
const router2 = express.Router();
const item = require('./page1');
const finalTeamFunc = item.finalTeamFunc;
const random = require('../../random');
const teams = require('../../model/cricketTeamMod');


router2.put('/scoreUpdates',(req,res,next)=>{
    teams.findByIdAndUpdate(req.body._id,{teamRuns:req.body.score},{new: true}).then((item)=>{
        res.status(200).json(item);
    });
});

router2.get('/results',(req,res,next)=>{
    var array = [];
   
    teams.find({_id:{$in:[{_id:req.body[0]._id}, {_id:req.body[1]._id}]}}).then((items)=>{
    
        array.push({teamName:items[0].teamName,teamRuns:items[0].teamRuns});
        array.push({teamName:items[1].teamName,teamRuns:items[1].teamRuns});
        console.log(array); res.send(array);
    });
    
    // res.send(array);
})
//________________________OPTIONAL FEATURES_______________________________________________
// const findOnePromise = (query) => new Promise((resolve, reject) => {
//     teams.findOne(query, (err, data) => {
//         if(err) {
//             return reject(err);
//         }

//         resolve(data);
//     });
// });

// const findOneAndUpdatePromise = (query, update) => new Promise((resolve, reject) => {
//     teams.findOneAndUpdate(query, update, (err, data) => {
//         if(err) {
//             return reject(err);
//         }

//         resolve(data);
//     });
// })


// router2.put('/endFirstInnings',(req,res,next)=>{
//     nextIn = true;
//     total1 = total; res.send("done");
// });
// //_____
// function findPlyr(plyr){
//     var filter = {players: {$elemMatch:{name: plyr}}};
    
//     return findOnePromise(filter)
//         .then(data => {
//             let scored = 0; runs = 0;

//             data.players.forEach((item)=>{
//                 console.log(item.name);
//                 if(item.name == plyr){
//                     console.log("Player found");
//                     scored = item.scored;
//                     runs = item.runs; 
//                 }
//             });

//             return { scored, runs };
//         }, err => {
//             console.error(err);
//         });
// }

// router2.put('/matchUpdates/:plyr',(req, res, next)=>{
//     var total = 0;
//     var filter = {players: {$elemMatch:{name: req.params.plyr}}};
//     var score = random();

//     findPlyr(req.params.plyr)
//         .then(({scored, runs}) => {
//             return findOneAndUpdatePromise(filter, { "players.$.scored": scored + score, "players.$.runs": runs + score });
//         }).then(data => {
//             res.status(200).json({ score });
//         });
// });
// ____________NOT IN USE___________
// function closeMatch(array){
//     console.log(array)
//     // array.map((item)=>{
//     //     let filter = {players: {$elemMatch:{name: item.name}}}
//     //     let update = {"players.$.active":'true'}
//     //     teams.findOneAndUpdate(filter,update,(err,data)=>{
//     //         res.send(data);
//     //     });
//     // });
// }
//___________________________________
// router2.put('/endMatch',(req,res,next)=>{
//     var selectedPlrs = req.body
//     total2 = total;
    
//         for(var i = 0; i < 2; i++){
//             var subSelect = selectedPlrs[i];
//             subSelect.array.map((item)=>{
//             let filter = { players: { $elemMatch: { name: item.name } } }
//             let update = { "players.$.active": 'false'}
//             teams.findOneAndUpdate(filter, update, (err, data) => {
//                 console.log("Player left");
//             });})
//         }
//     res.send({team1Score: total1 ,team2Score: total2 })
// });
//__________TESTING PURPOSE________________
router2.put('/test',(req,res,next)=>{
    
    // teams.updateMany({players:{$elemMatch:{active:'true'}}},{'players.$.active':'false'}).then((item)=>{
    //     res.send(item);
        // item.players.findOneAndUpdate({$elemMatch:{name: 'Bulla'}},{'$.scored': 69}).then();
 
    // })
    teams.aggregate( [
        {
           $addFields: {
              "teamRuns": 0
           }
        }
   ] )
    
});
//____________________OPTIONAL FEATURES ENDS HERE______________________
  
module.exports = router2;