const{ Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type: String,
            required: 'Please enter reaction',
            maxlength: 280
        }, 
        username:{
            type: String,
            required: 'Please enter username', 
            trim: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }

    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: 'Please enter your Thoughts', 
            minlength: 1, 
            maxlength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }, 
        reactions: [ReactionSchema]
    }, 
    {
        toJSON: {
            getters: true,
            virtuals: true
        }, 
        id: false
    }
);

//set virtual for reactionCount

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports= Thought;