import dotenv from 'dotenv';
import midtransClient from 'midtrans-client'

dotenv.config();

const snap = new midtransClient.Snap({
    isProduction: false, 
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default snap;
