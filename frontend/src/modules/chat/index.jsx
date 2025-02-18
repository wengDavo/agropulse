import Menu from "../core/components/Menu"
import LogoText from "../core/components/LogoText"
import AuthDialog from "../core/components/AuthDialog"
import NewChat from "./components/NewChat"
import ChatBox from "./components/ChatBox"

function Chat() {
	return (
		<section className="p-6 flex justify-between flex-col h-screen">
			<article className="fixed flex justify-between items-center top-0 left-0 right-0 p-4 z-50">
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

export default Chat
