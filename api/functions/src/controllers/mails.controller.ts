import * as sgMail from "@sendgrid/mail";
import {API, sendGrid} from "../secret";
import APIError from "../helpers/APIError";
import db from "../db";

sgMail.setApiKey(sendGrid);

export const sendMail = async (req, res) => {
    let data = req.body;
    const msg = {
        to: data.To,
        from: data.From,
        subject: data.Subject,
        text: data.Text,
        html: `<a href="${API}/mail/${data.User}">Verify now!</a>`
    };
    const sent = await sgMail.send(msg);
    res.json(sent);
};

export const verifyEmail = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        throw new APIError('User id required', 400);
    }

    let data = {
        ...req.body,
        Enabled: true
    };
    const userRef = await db.collection('users')
        .doc(userId)
        .set(data, {merge: true});

    res.json({message: 'Success! You can Sign In now'})
};