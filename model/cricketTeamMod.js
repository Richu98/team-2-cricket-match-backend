const mongoose = require('mongoose');
mongoose.set('debug',true);

const Schema = mongoose.Schema;
const playerSchema = new Schema(
    {
        name:{
            type:String,
            required: [true,'name field is required']
        },
        position:{
            type:String,
            default: 'player'
        },    
        scored:{
            type:Number,
            default: 0
        },
        runs:{
            type:Number,
            default: 0
        },    
        active:{
            type:Boolean,
            default:'false'
        }    
    }
);

const cricSchema = new Schema({ 
    
    teamName:{
        type:String,
        required: [true,'teamName field is required!']
    },
    teamRuns:{
        type:Number,
        default: 0
    }, 
    players: [playerSchema]
});   

const model = mongoose.model('cricketTeamCol', cricSchema);

module.exports = model;
