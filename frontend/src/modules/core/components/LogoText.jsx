function LogoText({css}) {
	return (<p
		className={`text-[25px] ${css}`}
		style={{
			fontFamily: "var(--font-logo)",
			color: "var(--color-green-30)"
		}}>
		AGROPULSE
	</p >)
}

export default LogoText
