const router = require('express').Router();

const{
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
}= require('../../controllers/thought-controller');
// const { delete } = require('./user-routes');

///api/thoughts
router
  .route('/')
  .get(getAllThoughts);

  // /api/thought/:id
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//createThought
//api/thought/:userId
router
  .route('/:userId')
  .post(createThought);


//api/thoughts/:thoughtId/reactions/
router
.route('/:thoughtId/reactions')
.post(addReaction)


router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;
