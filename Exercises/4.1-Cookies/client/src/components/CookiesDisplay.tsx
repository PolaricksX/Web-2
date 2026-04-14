import { useState, useEffect } from "react";

export default function CookieDisplay() {
	// Tell TypeScript this is an object with string keys + values
	const [cookies, setCookies] = useState<Record<string, string>>({});

	useEffect(() => {
		// Parse document.cookie into an object
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
		const parseCookies = (): Record<string, string> => {
			if (!document.cookie) return {};

			return document.cookie
				.split("; ")
				.reduce<Record<string, string>>((acc, cookie) => {
					const [name, value] = cookie.split("=");
					if (name && value) {
						acc[name] = decodeURIComponent(value);
					}
					return acc;
				}, {});
		};

		setCookies(parseCookies());
	}, []); // Runs once on mount

	return (
		<>
			<h2>Cookies</h2>
			<ul>
				{Object.entries(cookies).map(([name, value]) => (
					<li key={name}>
						{name}: {value}
					</li>
				))}
			</ul>
		</>
	);
}
