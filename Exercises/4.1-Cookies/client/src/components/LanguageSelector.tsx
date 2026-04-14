import { useState } from "react";

/*
 * Props are values passed down from the parent component (Home.tsx).
 * Instead of managing language here, we receive it from the parent —
 * this makes Home the single source of truth for the current language.
 */
interface Props {
	language: string; // the current language ("en" or "fr")
	setLanguage: (lang: string) => void; // function to update it in the parent
}

export default function LanguageSelector({ language, setLanguage }: Props) {
	/**
	 * Updates the cookie with the specified name and value.
	 *
	 * @param {string} name - The name of the cookie.
	 * @param {string} value - The value to store in the cookie.
	 */
	function setCookie(name: string, value: string) {
		document.cookie = `${name}=${encodeURIComponent(value)}; path=/;`;
		//                 👆 key=value     👆 available on every page (not just this one)
	}

	// Whenever language changes, save it to a cookie.
	useEffect(() => {
		setCookie("language", language);
	}, [language]); // ← only re-runs when language changes, not on every render

	/**
	 * Toggles the language between English ("en") and French ("fr").
	 *
	 */
	const toggleLanguage = () => {
		//You're updating the language state using the previous  value .
		setLanguage(language === "en" ? "fr" : "en");
	};

	return (
		<div>
			<button onClick={toggleLanguage}>Toggle Language</button>
		</div>
	);
}
