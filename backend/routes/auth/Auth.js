const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send('register route');
})

router.post('/login', (req, res) => {
    res.send('login login');
})

router.post('/refresh-token', (req, res) => {
    res.send('refresh token route');
})

router.delete('/logout', (req, res) => {
    res.send('logout route');
})

module.exports = router;