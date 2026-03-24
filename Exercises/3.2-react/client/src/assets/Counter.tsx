type CounterProps = {
	count: number;
};

export default function Counter({ count }: CounterProps) {
	return <p>Counter: {count}</p>;
}
