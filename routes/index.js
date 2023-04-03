const express = require("express");
const router = express.Router();

const AppController = require("../controllers/AppController");
const UsersController = require("../controllers/UsersController");

router.get("/status", AppController.getStatus);
router.get("/stats", AppController.getStats);
router.post("/users", UsersController.postNew);
router.get("/connect", AppController.getConnect);
router.get("/disconnect", AppController.getDisconnect);
router.post("/users/me", UsersController.getMe);

module.exports = router;
