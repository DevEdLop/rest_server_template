import { OAuth2Client } from 'google-auth-library'
import { GOOGLE_CLIENT_ID } from '../config/config.js';


const client = new OAuth2Client(GOOGLE_CLIENT_ID);
export const googleVerify = async (token = '') => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const { name, picture, email } = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];



    return {
        nombre: name,
        correo: email,
        img: picture
    }
}