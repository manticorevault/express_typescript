"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('You are not allowed to visit this page');
}
var router = express_1.Router();
exports.router = router;
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    // Really insecure login logic just to test the routing.
    if (email && password && email === 'art@gmail.com' && password === '123123') {
        // Mark the person as logged in.
        req.session = { loggedIn: true };
        // Redirect them to the root route.
        res.redirect('/');
    }
    else {
        res.send('Invalid credentials');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>\n          You are logged in!\n        </div>\n\n        <a href=\"/logout\"> Logout </a>\n      </div>\n    ");
    }
    else {
        res.send("\n    <div>\n      <div>\n        You are NOT logged in!\n      </div>\n\n      <a href=\"/login\"> Login! </a>\n    </div>\n  ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to the protected route!');
});
