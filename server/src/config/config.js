import dotenv from 'dotenv'

dotenv.config()

const config = Object.freeze({
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL,

    ACCESS_TOKEN: {
        SECRET: process.env.ACCESS_TOKEN_SECRET,
        EXPIRY: '24h'
    },
    REFRESH_TOKEN: {
        SECRET: process.env.REFRESH_TOKEN_SECRET,
        EXPIRY: 3600 * 24 * 365
    },

    // Razorpay
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    DEFAULT_FEE: process.env.DEFAULT_FEE || 500,

    //ImageKit
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,

    // Email Service
    email: {
        service: process.env.EMAIL_SERVICE || "smtp",
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: parseInt(process.env.EMAIL_PORT || '587', 10),
        user: process.env.EMAIL_USER || "",
        password: process.env.EMAIL_PASSWORD || "",
        from: process.env.EMAIL_FROM || "GoUpBroad <noreply@goupbroad.com>"
    },
})

export default config;
