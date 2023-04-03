const dbClient = require("../utils/db");
const sha1 = require("sha1");

const UsersController = {
  async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    if (!password) {
      return res.status(400).json({ error: "Missing password" });
    }

    const existingUser = await (
      await dbClient.usersCollection()
    ).findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Already exists" });
    }

    try {
      const insertionInfo = await (
        await dbClient.usersCollection()
      ).insertOne({ email, password: sha1(password) });
      const userId = insertionInfo.insertedId.toString();

      return res.status(201).json({ email, id: userId });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = UsersController;
