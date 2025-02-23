import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router";

function Plan({ type, caption, features, isCurrentPlan, isPremium }) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (!isCurrentPlan && isPremium) {
			navigate("/auth/signup"); // Redirect to signup page
		}
	};

	return (
		<article className="bg-white p-6 rounded-xl grid gap-6 shadow-md">
			<div className="text-green-30">
				<h3 className="font-extrabold text-xl">{type}</h3>
				<p className="text-xs">{caption}</p>
			</div>
			{/* Button dynamically changes based on user status */}
			<button
				onClick={handleClick}
				className={`rounded-3xl w-full p-2 transition ${
					isCurrentPlan
						? "bg-gray-300 text-gray-600 cursor-default"
						: "bg-green-500 text-white hover:bg-green-600"
				}`}
				disabled={isCurrentPlan}
			>
				{isCurrentPlan ? "Your Current Plan" : isPremium ? "Get Premium" : "Start Free"}
			</button>
			<div className="grid gap-4">
				{features.map((feat, idx) => (
					<div key={idx} className="flex gap-2">
						<MdCheckCircle size={20} className="text-green-30" />
						<span>{feat}</span>
					</div>
				))}
			</div>
		</article>
	);
}

export default Plan;

