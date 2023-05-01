const express = require('express')
const router = express.Router()

router.post('/signup', async (req, res) => {

    res.send({
        message: "added"
    })
})

module.exports = router