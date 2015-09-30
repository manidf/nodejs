module.exports = function(express, app, passport) {

    var router = express.Router();

    router.get('/', function(req, res, next){
        res.render('index', {title:'Welcome to ChatCAT'});
    });

    router.get('/auth/facebook', passport.authenticate('facebook'));
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/chatrooms',
      failureRedirect: '/'
    }))

    router.get('/chatrooms', function(req, res, next) {
       res.render('chatrooms', { title: 'Chatrooms', user:req.user });
    });

    router.get('/setcolor', function(req, res, next) {
        req.session.favColor = "Red";
        res.send('Setting favourite color!');
    });

    router.get('/getcolor', function(req, res, next) {
       res.send('Favourite Color: ' + (req.session.favColor === undefined ? 'NOT FOUND' : req.session.favColor));
    });

    app.use('/', router);

};
