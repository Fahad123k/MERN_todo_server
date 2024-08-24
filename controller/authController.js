const User = require('../models/user');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const JWTSECRET = process.env.JWT_SECRET_KEY;

async function registerUser(req, res) {
    let { firstname, lastname, username, password } = req.body;

    try {
        // Check if a user with the same username already exists
        const duplicate = await User.find({ username });
        console.log(duplicate);

        // If a duplicate user is found, send a 400 status with an error message
        if (duplicate && duplicate.length > 0) {
            return res.status(400).send({ message: "User already registered with this username" });
        }

        // Create a new user instance
        let user = new User({ firstname, lastname, username, password });

        // Save the user to the database, await the result
        const result = await user.save();
        console.log("User registration result:", result);

        // Send a success response with a 201 status
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        // Log the error and send a 500 status with an error message
        console.log('Some error occurred while registering:', error);
        res.status(500).send({ message: 'An error occurred while registering the user' });
    }
}

async function loginUser(req, res) {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username })


        if (!user) return res.status(404).send({ error: "Failed to Authenticate" });


        const isPasswordValid = await user.comparePassword(password);



        if (!isPasswordValid) return res.status(404).send({ error: "Password is incorrect" })
        // console.log('eee');
        // res.end()
     
        const token = jwt.sign({ userID: user?._id }, JWTSECRET, { expiresIn: '1h' })
        let finalData = {
            userId: user?._id,
            username: user?.username,
            firstname: user?.firstname,
            lastname: user?.lasttname,
            token
        }
        res.status(200).send(finalData)


    } catch (error) {
        console.log('some error while login');
        res.status(400).send({ error })

    }
}

const AuthController = {
    registerUser,
    loginUser
};

module.exports = AuthController;
