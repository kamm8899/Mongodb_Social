const { Thought, User } = require('../models');

const userController = {
    getAllUsers(req, res){
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
      },
      // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //POST a new user
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
              
      })
    },
    //Update User By ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },
      //Remove User by id
      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id" });
              return;
            }
            User.updateMany(
              { _id: { $in: dbUserData.friends } },
              { $pull: { friends: params.id } }
            )
              .then(() => {
                Thought.deleteMany({ username: dbUserData.username })
                  .then(() => {
                    res.json({ message: "deleted user" });
                  })
                  .catch((err) => res.status(400).json(err));
              })
              .catch((err) => res.status(400).json(err));
          })
          .catch((err) => res.status(400).json(err));
      },

      //POST to add Friend to user's friend list
      addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id},
            {$addToSet: {friends: params.friendId}},
            {new: true}
        )
          .select("-_v")
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          })
        },
        //Delete to remove a friend froma user's friend list
        deleteFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.id},
                {$pull: {friends: params.friendId}},
                {new: true, runValidators: true}
            )
              .select("-_v")
              .then(dbUserData => {
                  if(!dbUserData){
                      res.status(404).json({message: "No friend was found with this Id."});
                      return;
                  }
                  res.json(dbUserData)
                })
              .catch(err => {
                  console.log(err);
                  res.status(400).json(err);
              })
            }

    };
