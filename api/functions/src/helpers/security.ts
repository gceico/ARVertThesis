import {auth} from '../db'
import crypto from 'crypto'
import {secret} from "../secret";

export async function checkToken(req, res, next) {
    const JWT = req.header('Authorization');
    try {
        let verifyToken = await auth.verifyIdToken(JWT, true);
        if (verifyToken) {
            return next()
        } else {
            res.json(verifyToken, 403)
        }
    } catch (e) {
        res.json(e, 403);
    }
}

export async function hashData(plain) {
    const cipher = crypto.createCipher('aes-256-ctr', secret)
    let hash = cipher.update(plain, 'utf8', 'hex')
    hash += cipher.final('hex')
    return hash
}

export async function unhashData(cripted) {
    const decipher = crypto.createDecipher('aes-256-ctr', secret)
    let unhash = decipher.update(cripted, 'hex', 'utf8')
    unhash += decipher.final('hex')
    return unhash
}