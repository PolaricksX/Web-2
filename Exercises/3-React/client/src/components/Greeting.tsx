type GreetingProps = {
	name: string;
	color: string;
};

export default function Greeting({ name, color }: GreetingProps) {
	return (
		<h1 style={{ color }}>
			Hello <i>{name}</i>
		</h1>
	);
}
