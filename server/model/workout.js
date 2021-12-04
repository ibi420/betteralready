const mongoose=require('mongoose');

const workoutSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    checkbox:{
        type:Boolean,
    }
});

const Event = mongoose.model('Workouts', workoutSchema);
module.exports= Event;