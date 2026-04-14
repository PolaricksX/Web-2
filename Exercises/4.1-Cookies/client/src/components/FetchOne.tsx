import { useState, useEffect } from "react";
import ShowView from "./ShowView";

type FetchOneProps = {
	pokeId: number;
};

export default function FetechOne({ pokeId }: FetchOneProps) {
	const [pokemon, setPokemon] = useState<number>(1);

	const fetchTodo = async () => {
		if (!pokeId) return; // Do not show anything if input is empty

		const requestOptions: RequestInit = {
			method: "GET",
			credentials: "include", // 🔥 Required to send cookies
			mode: "cors",
		};
		try {
			const response = await fetch(
				`http://localhost:3000/pokemon/${pokeId}`,
				requestOptions,
			);

			if (response.ok) {
				const data = await response.json();
				setPokemon(data.payload);
			}
		} catch (error) {
			console.error("Error fetching Pokemon:", error);
		}
	};
	//Run once when component mounts
	useEffect(() => {
		if (!pokeId) return; // Avoid fetching if Id is empty

		fetchTodo();
	}, [pokeId]);

	if (!pokeId) {
		return <p>Please enter a Pokemon ID</p>;
	}

	if (!pokemon) {
		return <p>Loading or Pokemon not found...</p>;
	}

	return (
		<div>
			<ShowView pokemon={pokemon} />
		</div>
	);
}
