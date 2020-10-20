let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home'});
}); 

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/projects', indexController.displayProjectsPage); 

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

/* GET Contact Us page. */
router.get('/login', indexController.displayLoginPage);

/* POST request for login page*/
router.post('/login', indexController.processLoginPage);

/* Perform logout */
router.get('/logout', indexController.PerformLogout);

/* GET contact list page. */
router.get('/contact-list', indexController.displayContactList);

module.exports = router;
