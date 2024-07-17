import dbConfig from "@/db/dbConfig";

export default async function handler(req, res) {
    const { name, email, password } = req.body;
    const db = await dbConfig();
    const user = await db
        .collection("users")
        .insertOne({ name, email, password });
    res.json(user);
}