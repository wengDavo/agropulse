import Menu from "../core/components/Menu"
import LogoText from "../core/components/LogoText"
import NewChat from "../core/components/NewChat"

function Settings() {
	return (
		<section className="p-6 flex justify-between flex-col h-screen app-background-image">
			<article className="fixed flex justify-between items-center top-0 left-0 right-0 p-4 z-50">
				<Menu />
				<LogoText />
				<NewChat />
			</article>
			<article className="flex flex-col gap-2 h-full">
			</article>
		</section>
	)
}

export default Settings
