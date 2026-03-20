import MainHeader from "./components/MainHeader";

type Pokemon = {
	id: number;
	name: string;
};

type PokemonListProps = {
	pokemons: Pokemon[];
};

function PokemonList(props: PokemonListProps) {
	return (
		<ul>
			{props.pokemons.map((pokemon) => (
				<li key={pokemon.id}>{pokemon.name}</li>
			))}
		</ul>
	);
}

function App() {
	const myPokemons: Pokemon[] = [
		{ id: 1, name: "Pikachu" },
		{ id: 2, name: "Charmander" },
		{ id: 3, name: "Bulbasaur" },
		{ id: 4, name: "Squirtle" },
		{ id: 5, name: "Eevee" },
	];

	return (
		<div className="card">
			<div>
				<MainHeader name="Pikachu" color="SteelBlue" />
				<MainHeader name="Charmander" color="OrangeRed" />
			</div>

			<PokemonList pokemons={myPokemons} />

			<button onClick={() => alert("Hi there")}>Click Me</button>
		</div>
	);
}

export default App;
