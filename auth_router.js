const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('./models/user.model')

router.post('/signup', async (req, res) => {

        
         const {first_name, last_name, email, password, user_type} = req.body

        let User = await UserModel.findOne({email})
    
        if(User) {
            res.send({
                error: true,
                message: "Email already exists"
            })
            return
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        let newUser = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            user_type  
        }
    
        const savedUser = await UserModel.create(newUser)
    
        const userJwt = jwt.sign(
            {
              id: savedUser.id,
              email: savedUser.email,
              user_type: savedUser.user_type
            },
            "secret"
        );
    
        res.send({
            error: false,
            message: "Account created successfully",
            data: {
                firstName: savedUser.first_name,
                lastName: savedUser.last_name,
                email: savedUser.email,
                user_type: savedUser.user_type,
                token: userJwt
            }
        })
    })

    router.get('/userlist', async (req,res) => {
        let users = await UserModel.find()
        res.send(users)
    })

    router.post('/login', async (req, res) =>  {

        const email = req.body.email
        const password = req.body.password
    
        let user = await UserModel.findOne({email: email})
    
        if(!user) {
            res.send({
                error: true,
                message: "Invalid email or password"
            })
            return
        }
    
        let matched = await bcrypt.compare(password, user.password);
    
        if(!matched) {
            res.send({
                error: true,
                message: "Invalid email or password"
            })
            return
        }
    
        // Generate JWT
        const userJwt = jwt.sign(
            {
              id: user.id,
              email: user.email
            },
            "secret"
        );
    
    
        res.send({
            error: false,
            message: "Login successfully",
            data: {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                user_id: user._id,
                token: userJwt
            }
        })
    
    })

module.exports = router