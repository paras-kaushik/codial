// each controller contains a list of actions
module.exports.home = function(req, res){
    res.render('home',{title:'home',posts:[],all_users:[],flash:{success:false}});
}
