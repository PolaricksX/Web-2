import Greeting from "./Greeting";
import HeaderBody from "./HeaderBody";

type MainHeaderProps = {
	name: string;
	color: string;
};

function MainHeader({ name, color }: MainHeaderProps) {
	return (
		<>
			<Greeting name={name} color={color} />
			<HeaderBody />
		</>
	);
}

export default MainHeader;
