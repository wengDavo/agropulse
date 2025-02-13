import Menu from "./components/Menu"
import Newchat from "./components/Newchat"
import LogoText from "./components/Logotext"
import Logo from "../core/components/Logo"
import Chatbox from "./components/Chatbox"
import Disclaimer from "./components/Disclaimer"

function Homepage() {
	return (
		<section className="p-6 flex justify-between flex-col h-screen">
			<article className="">
				<div className="flex justify-between items-center">
					<Menu />
					<LogoText />
					<Newchat />
				</div>
				<div className="flex items-center justify-center">
					<Logo />
				</div>
			</article>
			<article className="grid gap-2">
				<Chatbox />
				<Disclaimer />
			</article>
		</section>
	)
}

export default Homepage
