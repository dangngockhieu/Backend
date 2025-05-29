const getHomePage = (req, res) => {
    res.render('sample.ejs');
}
const getABC = (req, res) => {
    res.send('Hello Dang Ngoc Khieu');
}
module.exports = {
    getHomePage, getABC
};