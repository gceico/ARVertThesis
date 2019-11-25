import db from "../db";

export const saveBulk = async (req, res) => {
    let data = req.body;
    let collection = req.query.collection;

    for (let i = 0; i < data.length; i++) {
        setTimeout(async () => {
            try {
                await db.collection(collection).add(data[i]);
                console.log('Success' + i)
            } catch (e) {
                console.log(e)
            }
        }, 200)
    }

    res.json({
        data: data
    });
};