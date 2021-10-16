const router = require('express').Router();
const{
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');