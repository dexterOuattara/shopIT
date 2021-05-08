const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: '/images/airpods.jpg',
            url: 'https://i.picsum.photos/id/652/200/300.jpg?hmac=yJT5T1Ugojp0HlslsxDN_nNnIIk4lsFXcV_5rq9FCTw'
        }
    })

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
})