require('dotenv').config();
module.exports = {
    mysql: {
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        hostname: process.env.MYSQL_HOSTNAME,
        port: process.env.MYSQL_PORT,
        dbname: process.env.MYSQL_DB_NAME,
    },
    secret: process.env.SECRET,
    // oss: {
    //     region: process.env.OSS_REGION,
    //     accessKeyId: process.env.OSS_KEY,
    //     accessKeySecret: process.env.OSS_SECRET,
    //     bucket: process.env.OSS_BUCKET
    // },
};