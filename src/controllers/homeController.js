const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDservice');
const getHomePage = async(req, res) => {
    let results=await getAllUsers();
    return res.render('home.ejs', {listUsers: results});
}
const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async(req, res) => {
    let userId = req.params.id;
    let user = await getUserById(userId);
    res.render('edit.ejs',{userEdit: user});
} 
const postCreateUser = async(req,res) => {
    let {email, name, city}= req.body;
    let [results, fields] = await connection.query(`INSERT INTO Users (email, name, city )
        VALUES (?, ?, ?)`,
        [email, name, city]);
    res.redirect('/');
}
const postUpdateUser = async(req,res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    await updateUserById(email, name, city, userId);
    res.redirect('/');
}
const postDeleteUser = async(req, res) => {
    let userId = req.params.id;
    let [results, fields] = await connection.query(`SELECT * FROM Users where id = ?`, [userId]);
    let user = results && results.length > 0 ? results[0] : {};
    res.render('delete.ejs',{userEdit: user});
}
const postHandleRemoveUser = async (req, res) => {
    let userId = req.body.userId;
    await deleteUserById(userId);
    res.redirect('/');
}
module.exports = {
    getHomePage, getCreatePage, postCreateUser,postUpdateUser,postHandleRemoveUser, postDeleteUser, getUpdatePage
};