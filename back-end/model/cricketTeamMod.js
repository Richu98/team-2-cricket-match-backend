const mongoose = require('mongoose');
mongoose.set('debug',true);

const Schema = mongoose.Schema;
// const playerSchema = new Schema([
//     {
//         name:{
//             type:String,
//             required: [true,'name field is required']
//         },
//         position:String,
//         scored:{
//             type:Number,
//             default: 0
//         },
//         runs:Number,
//         active:Boolean
//     }
// ]);

const cricSchema = new Schema({
 
        teamName:{
            type:String,
            required: [true,'teamName field is required!']
        },
        player:
            {
                name:{
                    type:String,
                    required: [true,'name field is required']
                },
                position:String,
                scored:{
                    type:Number,
                    default: 0
                },
                runs:Number,
                active:Boolean
            }
        
    }
);   

const model = mongoose.model('cricketTeamCol', cricSchema);

module.exports = model;
