import Menu from "../core/components/Menu"
import LogoText from "../core/components/LogoText"
import NewChat from "../core/components/NewChat"
import HistorySession from "./components/HistorySession"

function History() {
	return (
		<section className="p-6 py-14 flex justify-between flex-col h-screen app-background-image">
			<article className="fixed flex justify-between items-center top-0 left-0 right-0 p-4 z-50">
				<Menu />
				<LogoText />
				<NewChat />
			</article>
			<article className="flex flex-col gap-2 h-full py-10 px-4 md:px-20 overflow-scroll no-scrollbar">
				<HistorySession />
			</article>
		</section>
	)
}

export default History
