import { IncomingMessage, ServerResponse } from "http";
import { database } from "./model";

/**
 * TODO: Copy the route handling logic from the previous exercise
 * into these functions. You will need to use the party array from
 * the model.ts file to handle the requests.
 */

// GET /
export const getHome = (req: IncomingMessage, res: ServerResponse) => {
	/** TODO:
	 * 1. Use the getCookies() helper function to extract cookies from the request.
	 *
	 * 2. Get the "language" value from the cookies object.
	 *
	 * 3. Determine the language:
	 *    - If the language is "fr", use "fr"
	 *    - Otherwise, default to "en"
	 *
	 * 4. Create a message based on the language:
	 *    - "fr" → "Bienvenue!!"
	 *    - "en" → "Welcome!!"
	 *
	 * 5. Send a JSON response with the message:
	 *    { message: "..." }
	 */

	let message = "";

	// const cookies = getCookies(req);
	// const languageCode = cookies.language === "fr" ? "fr" : "en";

	// Set response headers
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	/*
	* CORS (Cross-Origin Resource Sharing) Headers Explained.
	* res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); Specifies which origins (websites) are allowed to access the server. 
	* res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");  Defines which HTTP methods are allowed for cross-origin requests.
	* res.setHeader("Access-Control-Allow-Headers", "*"); Allows all headers to be sent with cross-origin requests.This is useful if the client needs to send custom headers.
	* res.setHeader("Access-Control-Allow-Credentials", "true");Allows credentials (cookies, authorization headers) to be sent in cross-origin requests.If this is true, "Access-Control-Allow-Origin" cannot be "*" (it must be a specific domain like http://localhost:5173).
	*
	* NOTE:
	* Below is an example of setting HttpOnly to prevent JavaScript access,protecting cookies from being stolen by client-side scripts (e.g., XSS attacks).
	   res.setHeader("Set-Cookie", [
		"likes=darkChocoLate; Path=/; HttpOnly; Secure; SameSite=Strict",
		"lovesWebDev=false; Path=/; Max-Age=86400"
	]);
	
	*/
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");

	// Set cookies

	// Send JSON response
	res.end(JSON.stringify({ message: message }, null, 2));
};

// GET /pokemon
export const getAllPokemon = (req: IncomingMessage, res: ServerResponse) => {
	/** TODO:
	 * 1. Use the getCookies() helper function to extract cookies from the request.
	 *
	 * 2. Get the "language" value from the cookies object.
	 *    - If the language is "fr", use "fr"
	 *    - Otherwise, default to "en"
	 *
	 * 3. Loop through the database and transform each Pokemon:
	 *    - Keep id and image as-is
	 *    - Set name, type, and info based on the selected language
	 *      (e.g., pokemon.name[languageCode])
	 *
	 * 4. Store the transformed results in a new array.
	 *
	 * 5. Set the response headers (status code, content type, CORS).
	 *
	 * 6. Send a JSON response with:
	 *    {
	 *      message: "All Pokemon",
	 *      payload: newDatabase
	 *    }
	 */
	console.log("Get all pokemon");

	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");

	//Set the Cor headers
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");

	res.end(
		JSON.stringify({ message: "All Pokemon", payload: database }, null, 2),
	);
};

// GET /pokemon/:id
export const getOnePokemon = (req: IncomingMessage, res: ServerResponse) => {
	/** TODO:
	 * 1. Extract the Pokemon ID from the request URL.
	 *
	 * 2. Find the Pokemon in the database using the ID.
	 *
	 * 3. Use the getCookies() helper function to extract cookies from the request.
	 *
	 * 4. Get the "language" value from the cookies:
	 *    - If the language is "fr", use "fr"
	 *    - Otherwise, default to "en"
	 *
	 * 5. If the Pokemon is found:
	 *    - Create a new object:
	 *        - Keep id and image as-is
	 *        - Set name, type, and info based on the selected language
	 *          (e.g., pokemon.name[languageCode])
	 *
	 * 6. Set the response headers (status code, content type, CORS).
	 *
	 * 7. Send a JSON response:
	 *    {
	 *      message: "Pokemon found",
	 *      payload: singlePokemon
	 *    }
	 *
	 * 8. If the Pokemon is NOT found:
	 *    - Set status code to 404
	 *    - Return a JSON message: { message: "Pokemon not found" }
	 */

	const id = Number(req.url?.split("/")[2]);
	const foundPokemon = database.find((pokemon) => pokemon.id === id);

	if (foundPokemon) {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		// set the CORs headers from getHome example.
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");

		res.end(
			JSON.stringify(
				{ message: "Pokemon found", payload: foundPokemon },
				null,
				2,
			),
		);
	} else {
		res.statusCode = 404;
		res.end(JSON.stringify({ message: "Pokemon not found" }, null, 2));
	}
};

/**
 * @returns The cookies of the request as a Record type object.
 * @example name=Pikachu; type=Electric => { "name": "Pikachu", "type": "Electric" }
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
 */
const getCookies = (req: IncomingMessage): Record<string, string> => {
	/** TODO:
	 * 1. Get the cookie header from the request (req.headers.cookie).
	 *
	 * 2. If there are no cookies, return an empty object {}.
	 *
	 * 3. Create an empty object to store the cookies.
	 *
	 * 4. Split the cookie string into individual cookies
	 *    using "; " as the separator.
	 *    Example: "name=Pikachu; type=Electric"
	 *
	 * 5. Loop through each cookie (or use reduce):
	 *    - Split each cookie by "=" to get key and value
	 *    - Decode the value using decodeURIComponent()
	 *    - Add the key/value pair to your object
	 *
	 * 6. Return the final cookies object
	 */

	// Step 1: get cookie header

	// Step 2: handle no cookies

	// Step 3: create empty object

	// Step 4: split into array

	// Step 5: loop / reduce to build object

	// Step 6: return result
	return {};
};
