import { Request, Response } from "express";
import { database } from "./model";
import { parse } from "path";

/**
 * TODO: Copy the route handling logic from the previous exercise
 * into these functions. Make the necessary changes on the response of the express module.
 * You will need to use the array from the model.ts file to handle the requests.
 */

// GET /pokemon
export const getAllPokemon = (req: Request, res: Response) => {
	try {
		let result = [...database];

		const { type, SortBy } = req.query;

		if (type) {
			result = result.filter(
				(pokemon) =>
					pokemon.type.toLowerCase() ===
					(type as string).toLowerCase(),
			);
		}

		if (SortBy === "name") {
			result = result.sort((a, b) => a.name.localeCompare(b.name));
		}

		res.status(200).json({
			message: "All Pokemon retrieved successfully",
			payload: result,
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// GET /pokemon/:id
export const getOnePokemon = (req: Request, res: Response) => {
	let result = database.find(
		(pokemon) => pokemon.id === parseInt(req.params.id),
	);

	if (isNaN(parseInt(req.params.id))) {
		return res.status(400).json({ message: "Invalid ID format" });
	}

	if (!result) {
		return res.status(404).json({ message: "Pokemon not found" });
	}

	res.status(200).json({
		message: "Pokemon retrieved successfully",
		payload: result,
	});
};

// POST /pokemon
export const createPokemon = (req: Request, res: Response) => {
	let newPokemon = req.body as { name: string; type: string };

	if (!newPokemon.name || !newPokemon.type) {
		return res.status(400).json({ message: "Name and type are required" });
	}

	const Pokemon = {
		name: newPokemon.name,
		type: newPokemon.type,
	};

	database.push(Pokemon);

	res.status(201).json({
		message: "Pokemon created successfully",
		payload: Pokemon,
	});
};

// PUT /pokemon/:id
export const updatePokemon = (req: Request, res: Response) => {
	let index = database.findIndex(
		(pokemon) => pokemon.id === parseInt(req.params.id),
	);

	if (isNaN(parseInt(req.params.id))) {
		return res.status(400).json({ message: "Invalid ID format" });
	}

	if (index === -1) {
		return res.status(404).json({ message: "Pokemon not found" });
	}

	let updatedData = req.body as { name?: string; type?: string };

	database[index] = { ...database[index], ...updatedData };

	res.status(200).json({
		message: "Pokemon updated successfully",
		payload: database[index],
	});
};

// DELETE /pokemon/:id
export const deletePokemon = (req: Request, res: Response) => {
	let index = database.findIndex(
		(pokemon) => pokemon.id === parseInt(req.params.id),
	);

	if (isNaN(parseInt(req.params.id))) {
		return res.status(400).json({ message: "Invalid ID format" });
	}

	if (index === -1) {
		return res.status(404).json({ message: "Pokemon not found" });
	}

	let deletedPokemon = database[index];
	database.splice(index, 1);

	res.status(200).json({
		message: "Pokemon deleted successfully",
		payload: deletedPokemon,
	});
};
