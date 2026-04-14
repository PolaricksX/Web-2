import { Link } from "react-router-dom";

function NavBar() {
	return (
		<nav className="nav">
			<ul>
				<li>
					<Link to="/"> Home</Link>
				</li>
				<li>
					<Link to="/list-one"> DisplayOne</Link>
				</li>
				<li>
					<Link to="/list-all"> DisplayAll</Link>
				</li>
			</ul>
		</nav>
	);
}
export default NavBar;
