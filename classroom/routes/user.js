const express=require("express");
const router = express.Router();



//USERS
router.get("/", (req, res) => {
    res.send("GET from users");
});

router.get("/:id", (req, res) => {
    res.send("GET for the user id");
});

router.post("/", (req, res) => {
    res.send("POST for user");
});

router.delete("/:id", (req, res) => {
    res.send("DELETE for user id");
});

module.exports = router; // with help of router we have put all the user routers into one module and we will require this based on our need .