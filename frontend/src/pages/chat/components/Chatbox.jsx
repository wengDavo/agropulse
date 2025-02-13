import { FaPlusCircle, FaArrowUp, FaClock } from "react-icons/fa"

function Chatbox() {
	return (
		<form className="relative">
			<textarea
				rows="6"
				cols="2"
				placeholder="Send a message to Agropulse"
				className="w-full outline-none rounded-[27px] p-4 placeholder:text-green-30"
			></textarea>
			<div className="flex items-center justify-between absolute p-4 bottom-0 left-0 right-4 w-full z-10 bg-white">
				<button type="submit">
					<FaPlusCircle className="text-green-30 text-3xl"/>
				</button>
				<p className="flex items-center gap-1 text-xs">
					<FaClock className="text-green-30" />
					Recent search
				</p>
				<button type="submit">
					<FaArrowUp className="bg-green-30 text-white rounded-full p-1 text-3xl"/>
				</button>
			</div>
		</form>
	)
}

export default Chatbox

