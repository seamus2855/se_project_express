const router = require("express").Router();
const { getUsers } = require("../controllers/users");

// GET all users
router.get("/users", (req, res) => {
  res.json({ message: "Get all users" });
});

// GET user by ID
router.get("/:id", (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

// POST new user
router.post("/", (req, res) => {
  res.json({ message: "Create new user" });
});

// PUT update user
router.put("/:id", (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
});

// DELETE user
router.delete("/:id", (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

module.exports = router;
