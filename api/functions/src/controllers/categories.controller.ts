import APIError from '../helpers/APIError'
import * as admin from 'firebase-admin';
import db from '../db'

export const getCategories = async (req, res) => {
    const plansSnapshot = await db.collection('categories').get();
    let plans = [];
    plansSnapshot.forEach(
        (doc) => {
            const data = doc.data()
            const plan = data.Plan
            console.log(plan)
            plans.push({
                id: doc.id,
                data: doc.data(),
            });
        }
    );

    res.json(plans);
};