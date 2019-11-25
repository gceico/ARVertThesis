import APIError from '../helpers/APIError'
import * as admin from 'firebase-admin';
import db from '../db'

export const getUser = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        throw new APIError('User id required', 400);
    }

    const user = await db.collection('users').doc(userId).get();

    if (!user.exists) {
        throw new APIError('User not found', 404)
    }

    res.json({
        id: user.id,
        data: user.data()
    });
};
export const getUsers = async (req, res) => {
    const usersSnapshot = await db.collection('users').get();
    let users = [];
    usersSnapshot.forEach(
        (doc) => {
            const data = doc.data()
            const plan = data.Plan
            console.log(plan)
            users.push({
                id: doc.id,
                data: doc.data(),
            });
        }
    );

    res.json(users);
};
export const saveUser = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        throw new APIError('User id required', 400);
    }

    let data = {
        ...req.body,
        CreatedAt: admin.firestore.Timestamp.fromDate(new Date()),
        UpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };
    data.BirthDate = admin.firestore.Timestamp.fromDate(new Date(data.BirthDate));

    const userRef = await db.collection('users').doc(userId).set(data);
    res.json({
        id: userId,
        data: data
    });
};
export const updateUser = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        throw new APIError('User id required', 400);
    }

    let data = {
        ...req.body,
        UpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };
    const userRef = await db.collection('users')
        .doc(userId)
        .set(data, {merge: true});

    res.json({
        id: userId,
        data
    })
};
export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        throw new APIError('User id required', 400);
    }

    await db.collection('users')
        .doc(userId)
        .delete();

    res.json({
        id: userId,
    })
};
