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
       // get one User by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtid })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Create new thoughts
  createThought({ params, body }, res) {
    Thought.create(body)
        .then(({_id})=>{
            return User.findOneAndUpdate(
                { _id: params.userId},
                { $push: {thoughts: _id}},
                {new: true}
            );
        })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
          
  })
},
//remove thought
deleteThought({params}, res){
    Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedthought => {
            if (!deletedthought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.username },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
        },
//Update thought by its id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  //Delete to remove a thought by its _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' })
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        )        
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(400).json({message: 'Thought  ID was sucessfully deleted'})
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(err)
    })
  },
  //api/thoughts/:thoughtId/reactions
  //Reaction Post to create a reaction stored in a single thoughts reactions array

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},
  //Delete to pull and remove a reaction by the reactions' reactionId
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
}

};

