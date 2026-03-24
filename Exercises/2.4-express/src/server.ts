import express from "express";
import pokemonRouter from "./router";

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * Home route
 * Responds with a welcome message when the root URL is accessed.
 */
app.get("/", (req, res) => {
	res.status(200).json({ message: "Hello from the Pokemon Server!" });
});

app.use("/pokemon", pokemonRouter);
/**
 * Starts the Express server and listens on the specified port.
 */
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
