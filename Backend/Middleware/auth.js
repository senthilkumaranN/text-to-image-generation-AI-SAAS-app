const jwt = require('jsonwebtoken');
const user = require('../Model/UserModel')

// const userAuth = async (req, res, next) => {

//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (!token) {
//         return res.json({
//             success: false,
//             message: 'Not Authorized. Login Again'
//         })
//     }

//     try {
//         const tokendecode = jwt.verify(token, process.env.JWT_SECRET)
//         console.log("Decoded Token:", tokendecode);

//         req.user = await user.findById(tokendecode.email)
//         if (!req.user) {
//             res.status(401).json({
//                 success: false,
//                 message: "user not found"
//             })
//         }
//         req.user = user;

//         next();

//     } catch (error) {
//         console.log(error)
//         res.json({
//             success: false,
//             message: error.message
//         })

//     }
// }

const userAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Log the decoded token to check user ID
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = userAuth;