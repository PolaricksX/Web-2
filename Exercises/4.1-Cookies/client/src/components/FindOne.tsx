import { useState, ChangeEvent } from "react";
import FetchOne from "./FetchOne";

export default function FindOne() {
	const [poke_Id, setpokeId] = useState(1);

	const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setpokeId(value);
	};
	return (
		<div>
			<h4> Single Pokemons</h4>
			<input
				type="text"
				name="poke_id"
				onChange={inputHandler}
				placeholder="Enter Pokemon id"
				value={poke_Id}
			/>

			<br />
			<FetchOne pokeId={poke_Id} />
		</div>
	);
}
