import http, { IncomingMessage, ServerResponse } from "http"; // The core Node module we're using to build our server.

interface Pokemon {
	id: number;
	name: string;
	type: string;
}
const database: Pokemon[] = [{ id: 1, name: "Pikachu", type: "Electric" }];
// Add one Pokemon object here with ID 1.

const hostname = "127.0.0.1"; // or 'localhost'
const port = 3000;

const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		// Request handling will come later!
		if (req.method === "GET" && req.url === "/") {
			// ... (Existing code remains the same)
		} else if (req.method === "GET" && req.url === "/pokemon") {
			res.statusCode = 200;

			res.setHeader("Content-Type", "application/json");

			res.end(
				JSON.stringify(
					{ message: "All Pokemon", payload: database },

					null,

					2,
				),
			);
		} else if (req.method === "GET" && req.url?.startsWith("/pokemon/")) {
			// Find Pokemon by ID
			const urlParts = req.url.split("/");
			const pokemonId = parseInt(urlParts[2]);

			if (isNaN(pokemonId)) {
				res.statusCode = 400;
				res.end(
					JSON.stringify({ message: "Invalid Pokemon ID" }, null, 2),
				);
			} else {
				const foundPokemon: Pokemon | undefined = database.find(
					(pokemon) => pokemon.id === pokemonId,
				);

				if (foundPokemon) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.end(
						JSON.stringify(
							{ message: "Pokemon found", payload: foundPokemon },
							null,
							2,
						),
					);
				} else {
					res.statusCode = 404;
					res.end(
						JSON.stringify(
							{ message: "Pokemon not found" },
							null,
							2,
						),
					);
				}
			}
		} else if (req.method === "POST" && req.url === "/pokemon") {
			let body = ""; // To store incoming data
			req.on("data", (chunk) => {
				body += chunk.toString();
			});

			req.on("end", () => {
				const newPokemon = JSON.parse(body);
				// Add basic data logic (you'd likely use a database in a real application)
				newPokemon.id = database.length + 1; // Simple ID assignment
				database.push(newPokemon);
				res.statusCode = 201; // 'Created'
				res.setHeader("Content-Type", "application/json");
				res.end(
					JSON.stringify(
						{ message: "Pokemon created!", payload: newPokemon },
						null,
						2,
					),
				);
			});
		} else if (req.method === "DELETE" && req.url === "/pokemon") {
			let body = ""; // To store incoming data
			req.on("data", (chunk) => {
				body += chunk.toString();
			});

			req.on("end", () => {
				const { id } = JSON.parse(body);
				const index = database.findIndex(
					(pokemon) => pokemon.id === id,
				);

				if (index !== -1) {
					database.splice(index, 1); // Remove the Pokemon from the database
					res.statusCode = 200; // 'OK'
					res.setHeader("Content-Type", "application/json");
					res.end(
						JSON.stringify(
							{ message: "Pokemon deleted!" },
							null,
							2,
						),
					);
				} else {
					res.statusCode = 404;
					res.end(
						JSON.stringify(
							{ message: "Pokemon not found" },
							null,
							2,
						),
					);
				}
			});
		} else if (req.method === "PUT" && req.url === "/pokemon") {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});

			req.on("end", () => {
				const updatedPokemon = JSON.parse(body);
				const index = database.findIndex(
					(pokemon) => pokemon.id === updatedPokemon.id,
				);
				if (index !== -1) {
					database[index] = {
						...database[index],
						...updatedPokemon,
					};
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.end(
						JSON.stringify(
							{
								message: "Pokemon updated!",
								payload: updatedPokemon,
							},
							null,
							2,
						),
					);
				} else {
					res.statusCode = 404;
					res.end(
						JSON.stringify(
							{ message: "Pokemon not found" },
							null,
							2,
						),
					);
				}
			});
		}
	},
);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
