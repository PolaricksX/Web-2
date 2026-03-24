import { useState, type FormEvent } from "react";

type PokemonListProps = {
	pokemons: string[];
};

function PokemonList({ pokemons }: PokemonListProps) {
	return (
		<ul>
			{pokemons.map((pokemon) => (
				<li key={pokemon}>{pokemon}</li>
			))}
		</ul>
	);
}

function App() {
	const [myPokemons, setMyPokemons] = useState([
		"Charmander",
		"Bulbasaur",
		"Squirtle",
	]);
	const [newPokemon, setNewPokemon] = useState<string>("");
	const [bgColor, setBgColor] = useState<string>("#f8fafc");

	const addPokemon = () => {
		const trimmedPokemon = newPokemon.trim();
		if (!trimmedPokemon) {
			return;
		}

		setMyPokemons([...myPokemons, trimmedPokemon]);
		setNewPokemon("");
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addPokemon();
	};

	const handleBackgroundChange = () => {
		setBgColor((currentColor) =>
			currentColor === "#f8fafc" ? "#dbeafe" : "#f8fafc",
		);
	};

	return (
		<div className="container" style={{ backgroundColor: bgColor }}>
			<h1>My Pokemons</h1>
			<PokemonList pokemons={myPokemons} />
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter a pokemon name"
					value={newPokemon}
					onChange={(event) => setNewPokemon(event.target.value)}
				/>
				<button type="submit">Add Pokemon</button>
			</form>
			<button type="button" onClick={handleBackgroundChange}>
				Toggle Background
			</button>
		</div>
	);
}

export default App;
