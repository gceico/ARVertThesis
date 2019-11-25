import APIError from '../helpers/APIError'
import * as admin from 'firebase-admin';
import db from '../db'

export const getPlan = async (req, res) => {
    const planId = req.params.id;

    if (!planId) {
        throw new APIError('Plan id required', 400);
    }

    const plan = await db.collection('plans').doc(planId).get();

    if (!plan.exists) {
        throw new APIError('Plan not found', 404)
    }

    res.json({
        id: plan.id,
        data: plan.data()
    });
};
export const getPlans = async (req, res) => {
    const plansSnapshot = await db.collection('plans').get();
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
export const savePlan = async (req, res) => {
    let data = {
        ...req.body,
        CreatedAt: admin.firestore.Timestamp.fromDate(new Date()),
        UpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    const planRef = await db.collection('plans').add(data);
    const plan = await planRef.get();

    res.json({
        id: planRef.id,
        data: plan.data()
    });
};
export const updatePlan = async (req, res) => {
    const planId = req.params.id;

    if (!planId) {
        throw new APIError('Plan id required', 400);
    }

    let data = {
        ...req.body,
        UpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };
    const planRef = await db.collection('plans')
        .doc(planId)
        .set(data, { merge: true });

    res.json({
        id: planId,
        data
    })
};
export const deletePlan = async (req, res) => {
    const planId = req.params.id;

    if (!planId) {
        throw new APIError('Plan id required', 400);
    }

    await db.collection('plans')
        .doc(planId)
        .delete();

    res.json({
        id: planId,
    })
};