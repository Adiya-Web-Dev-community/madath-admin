const {Schema,model} = require('mongoose')
const eventSchema = new Schema({
eventStartTime:{type:Date,default:Date.now(),require:true},
eventEndTime:{type:Date,default:Date.now(),require:true},
eventTitle:{type:String,require:true},
eventDiscription:{type:String,require:true},
eventStaus:{type:Boolean,require:true,default:false},
eventBackgroundColor:{type:String,require:true,default:"white"},
eventTextColor:{type:String,require:true,default:"black"},
},{timestamps:true})

module.exports = model("event",eventSchema)