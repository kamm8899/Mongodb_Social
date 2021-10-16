const { Thought, User, Types } = require('../models');

//thought Controller
const thoughtController = {
    //getallthoughts
    getAllThoughts(req, res){
        Thought.find({})
            .select("-__v")
            .sort({ _id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
      },
      
    }