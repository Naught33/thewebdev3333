import emailjs from '@emailjs/browser';
import FirebaseTools from './firebase';


const firebase = new FirebaseTools();

const serviceID = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
const publicKey = import.meta.env.VITE_EMAIL_JS_PUBLIC_API_KEY;
const templateID = import.meta.env.VITE_CONTACT_EMAIL_TEMPLATE_ID;

export default async function sendMail(senderName,senderEmail, body){

    const templateParams = {
        name: senderName,
        email: senderEmail,
        message: body
    }

    try{
        return await emailjs.send(serviceID,templateID, templateParams, publicKey);
    } catch(e){
        try{
            const mailtoURL = `mailto:thewebdev3333@gmail.com?subject=${encodeURIComponent('Hello, I am reaching out from your website')}&body=${encodeURIComponent(body)}`;
            firebase.storeErrors(senderEmail, e);
            window.location.href = mailtoURL;
        }catch(e){
            return 'ERROR';
        }     
        
    }
}