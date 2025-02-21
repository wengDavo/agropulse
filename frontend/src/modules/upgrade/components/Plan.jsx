import { MdCheckCircle } from "react-icons/md"

function Plan(props) {
	return (
		<article className="bg-white p-6 rounded-xl grid gap-6">
			<div className="text-green-30">
				<h3 className="font-extrabold text-xl">{props.type}</h3>
				<p className="text-2xl">
					<span>₦{props.price}</span>
					<span className="">/month</span>
				</p>
				<p className="text-xs">{props.caption}</p>
			</div>
			<button className="text-gray-20 bg-gray-30 rounded-3xl w-full p-2">Your Current Plan</button>
			<div className="grid gap-4">
				{
					props.features.map((feat, idx) => {
						return (
							<div key={idx} className="flex gap-2">
								<MdCheckCircle size={20} className="text-green-30" />
								<span>{feat}</span>
							</div>
						)
					})
				}
			</div>
		</article>)
}
export default Plan
