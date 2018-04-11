const router = require('express').Router();
//
const { connector } = require('./bot');
const { getGiphy, getLevelOfMood } = require('./libs');


router.post('/api/messages', connector.listen());
router.get('/api/mood', async (req, res) => {
    const probability = await getLevelOfMood('I like the world');
    res.json({ probability });
});
router.get('/api/giphy', async (req, res) => {
    const giphy = await getGiphy('lion');
    res.json(giphy);
});



module.exports = router;
