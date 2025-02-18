import Menu from "./components/Menu"
import NewChat from "./components/NewChat"
import LogoText from "./components/LogoText"
import ChatBox from "./components/ChatBox"
import AuthDialog from "./components/AuthDialog"

function Homepage() {
	return (
		<section className="p-6 flex justify-between flex-col h-screen">
			<article className="fixed flex justify-between items-center top-0 left-0 right-0 bg-white p-4">
				<Menu />
				<LogoText />
				<NewChat />
			</article>
			<article className="flex flex-col gap-2 h-full">
				<ChatBox />
			</article>
			<AuthDialog />
		</section>
	)
}

export default Homepage
