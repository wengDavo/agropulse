import { useReducer, useRef, useEffect, useState } from "react";
import Loader from "../../core/components/Loader";
import { FaPlusCircle, FaArrowUp, FaClock } from "react-icons/fa";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const AI_URL = `${BACKEND}/api/v1/ai`;

const chats = {
	messages: [],
};

function chatReducer(state, action) {
	switch (action.type) {
		case "ADD_MESSAGE":
			return { messages: [...state.messages, action.payload] };
		case "RESET":
			return { messages: [] };
		default:
			return state;
	}
}

function ChatBox() {
	let [state, dispatch] = useReducer(chatReducer, chats);
	const chatEndRef = useRef(null);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Create a new chat message and send it to the server
	const createChat = async (e) => {
		e.preventDefault();
		let form = e.currentTarget;
		let formData = new FormData(form);
		let { message } = Object.fromEntries(formData);

		if (message) {
			dispatch({
				type: "ADD_MESSAGE",
				payload: {
					role: "user",
					content: message,
				},
			});

			form.reset();

			// Make the POST request
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(AI_URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ prompt: message }),
				});

				if (!response.ok) {
					throw new Error("Failed to send the message to the server.");
				}

				const { completion } = await response.json();
				console.log("Message sent successfully:", completion);
				dispatch({
					type: "ADD_MESSAGE",
					payload: {
						role: "system",
						content: completion,
					},
				});
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [state.messages]);

	return (
		<div className="h-full flex flex-col md:px-12  py-12 relative overflow-clip">
			<article className="flex flex-col gap-2 overflow-y-scroll h-4/5 no-scrollbar">
				{state.messages.length > 0 ? (
					state.messages.map(({ role, content }, index) => (
						<div
							key={index}
							className={`p-2 rounded w-fit ${role === "system" ? "bg-green-30 text-white self-start" : "bg-green-20 text-green-30 self-end"
								} `}
						>
							<p>{content}</p>
						</div>
					))
				) : (
					<p className="uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white font-extrabold">How can we help you today?</p>
				)}
				<div ref={chatEndRef} /> {/* scroll here */}
			</article>

			<article className="absolute bg-white bottom-0 left-0 right-0 p-4 rounded-3xl md:w-1/2 md:mx-auto">
				<form className="relative" onSubmit={createChat}>
					<textarea
						rows="3"
						cols="2"
						placeholder="Send a message to Agropulse"
						className="w-full outline-none rounded-[27px] p-2 md:p-4  placeholder:text-green-30 resize-none"
						name="message"
					></textarea>
					<div className="flex items-center justify-between absolute bottom-0 left-0 right-4 w-full bg-white">
						<button type="button">
							<FaPlusCircle className="text-green-30 text-3xl" />
						</button>

						<p className="flex items-center gap-1 text-xs">
							<FaClock className="text-green-30" />
							Recent search
						</p>

						<button type="submit" disabled={loading}>
							<FaArrowUp className="bg-green-30 text-white rounded-full p-1 text-3xl" />
						</button>
					</div>
				</form>

				{loading && <Loader />} {/* Loading state */}
				{error && <p className="text-red-500">{error}</p>} {/* Error state */}

			</article>
		</div>
	);
}

export default ChatBox;
