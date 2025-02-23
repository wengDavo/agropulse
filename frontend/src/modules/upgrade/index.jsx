import Menu from "../core/components/Menu";
import LogoText from "../core/components/LogoText";
import NewChat from "../core/components/NewChat";
import Plan from "./components/Plan";
import { useAuth } from "../core/utils/AuthProvider"; // Import authentication hook

const plans = {
	free: {
		type: "Free",
		caption: "Explore how AI can help with everyday tasks",
		features: [
			"Limited access to use Agropulse",
			"Use custom Agropulse",
			"Basic customer support",
			"Community access",
			"Access to public templates",
			"Daily usage limits",
		],
	},
	premium: {
		type: "Premium",
		caption: "Level up productivity and creativity with extended access",
		features: [
			"Everything in Free",
			"Access to more chats session",
			"Opportunity to test new Agropulse features",
			"Extended limits on messaging",
			"Image upload",
			"Advanced Analysis",
		],
	},
};

function Upgrade() {
	const { user } = useAuth(); // Get user authentication state

	return (
		<section className="p-6 pt-20 flex justify-between flex-col h-screen app-background-image">
			<article className="fixed flex justify-between items-center top-0 left-0 right-0 p-4 z-50">
				<Menu />
				<LogoText />
				<NewChat />
			</article>
			<article className="flex flex-col gap-2 h-full overflow-scroll no-scrollbar md:grid md:grid-cols-2">
				<Plan {...plans.free} isCurrentPlan={!user} isPremium={false} />
				<Plan {...plans.premium} isCurrentPlan={!!user} isPremium={true} />
			</article>
		</section>
	);
}

export default Upgrade;

