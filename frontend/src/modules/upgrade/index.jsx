import Menu from "../core/components/Menu"
import LogoText from "../core/components/LogoText"
import NewChat from "../core/components/NewChat"
import Plan from "./components/Plan"

let plans = [
	{
		type: "Free",
		price: "0.0",
		caption: "Explore how AI can help with everyday task",
		features: [
			"Limited access to use Agropulse",
			"Use custom Agropulse"
		]
	},
	{
		type: "Plus",
		price: "10,000.00",
		caption: "Level up productivity and creativity with extended access",
		features: [
			"Everything in Free",
			"Access to advanced voice and video inputs",
			"Opportunity to test new Agropulse features",
			"Extended limits on messaging",
			"file upload",
			"Advanced Analysis"
		]
	}
]

function Upgrade() {
	return (
		<section className="p-6 py-14 flex justify-between flex-col h-screen app-background-image">
			<article className="fixed flex justify-between items-center top-0 left-0 right-0 p-4 z-50">
				<Menu />
				<LogoText />
				<NewChat />
			</article>
			<article className="flex flex-col gap-2 h-full overflow-scroll no-scrollbar">
				{
					plans.map((plan, idx) => {
						return <Plan {...plan} key={idx} />
					})
				}
			</article>
		</section>
	)
}

export default Upgrade
