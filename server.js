const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON requests
app.use(express.json());

// Sample user data (hardcoded)
let users = [
	{ id: 1, userName: "user1", password: "password1" },
	{ id: 2, userName: "user2", password: "password2" },
];

// Get Server home route
app.get("/", (req, res) => {
	res.json({
		status: 200,
		message: "BiTech Server is available!",
	});
});

// Get all users
app.get("/api/users", (req, res) => {
	res.json(users);
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
	const user = users.find((user) => user.id === parseInt(req.params.id));
	if (!user) return res.status(404).send("User not found");
	res.json(user);
});

// Create a new user
app.post("/api/users", (req, res) => {
	const { userName, password } = req.body;
	const newUser = { id: users.length + 1, userName, password };
	users.push(newUser);
	{
	}
	res.status(201).json(newUser);
});

// Update user by ID
app.put("/api/users/:id", (req, res) => {
	const user = users.find((user) => user.id === parseInt(req.params.id));
	if (!user) return res.status(404).send("User not found");

	user.userName = req.body.userName || user.userName;
	user.password = req.body.password || user.password;

	res.json(user);
});

// Delete user by ID
app.delete("/api/users/:id", (req, res) => {
	const index = users.findIndex((user) => user.id === parseInt(req.params.id));
	if (index === -1) return res.status(404).send("User not found");

	users.splice(index, 1);
	res.send("User deleted successfully");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
