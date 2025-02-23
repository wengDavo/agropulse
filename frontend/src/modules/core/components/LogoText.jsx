import { Link } from "react-router"

function LogoText({css}) {
	return (<Link to="/"
		className={`text-[25px] ${css} outline-none`}
		style={{
			fontFamily: "var(--font-logo)",
			color: "var(--color-green-30)"
		}}>
		AGROPULSE
	</Link >)
}

export default LogoText
