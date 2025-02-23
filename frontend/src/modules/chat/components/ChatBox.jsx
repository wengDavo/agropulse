import { useReducer, useRef, useEffect, useState } from "react";
import Loader from "../../core/components/Loader";
import { FaPlusCircle, FaArrowUp, FaClock } from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../../core/utils/AuthProvider";
import { toast } from "react-toastify";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const AI_URL = `${BACKEND}/api/v1/ai`;

const initialState = {
	messages: [],
};

function chatReducer(state, action) {
	switch (action.type) {
		case "SET_MESSAGES":
			return { messages: action.payload };
		case "ADD_MESSAGE":
			return { messages: [...state.messages, action.payload] };
		case "RESET":
			return { messages: [] };
		default:
			return state;
	}
}

function ChatBox() {
	const [state, dispatch] = useReducer(chatReducer, initialState);
	const chatEndRef = useRef(null);
	const fileInputRef = useRef(null);
	const notify = (message) => toast(message);
	const { user, isAuthenticated, chatSessionId } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [fetchingHistory, setFetchingHistory] = useState(false);

	// Error handler
	const handleError = (error, context) => {
		console.error(`${context}:`, error);
		// notify(`Something went wrong while ${context.toLowerCase()}.`);
	};

	// Fetch previous chat messages
	useEffect(() => {
		if (!chatSessionId || !isAuthenticated) return;

		const fetchMessages = async () => {
			setFetchingHistory(true);
			try {
				const response = await fetch(`${BACKEND}/api/v1/users/messages?chatId=${chatSessionId}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});
				if (!response.ok) throw new Error("Failed to load messages");

				const { messages } = await response.json();
				const formattedMessages = messages.map(({ role_id, message }) => ({
					role: role_id === 1 ? "system" : "user",
					content: message,
					type: "text",
				}));

				// Merge old state with fetched messages to avoid overwriting
				dispatch({ type: "SET_MESSAGES", payload: [...state.messages, ...formattedMessages] });
			} catch (err) {
				handleError(err, "fetching messages");
			} finally {
				setFetchingHistory(false);
			}
		};

		fetchMessages();
	}, [chatSessionId, isAuthenticated]);


	// Save message to backend
	const saveMessageToBackend = async (role_id, message, type = "text") => {
		if (!chatSessionId) {
			return notify("Chat session is not initialized.");
		}

		try {
			const response = await fetch(`${BACKEND}/api/v1/users/messages`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ chat_id: chatSessionId, role_id, message, type }),
			});

			if (!response.ok) notify("Failed to save the message.");
		} catch (error) {
			handleError(error, "saving message");
		}
	};

	// Handle file selection and send images to backend
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = async () => {
				const base64Image = reader.result;

				dispatch({ type: "ADD_MESSAGE", payload: { role: "user", content: base64Image, type: "image" } });

				if (isAuthenticated) {
					await saveMessageToBackend(2, base64Image, "image");
				}
			};
			reader.readAsDataURL(file);
		}
	};

	// Handle sending new messages
	const createChat = async (e) => {
		e.preventDefault();
		let form = e.currentTarget;
		let formData = new FormData(form);
		let { message } = Object.fromEntries(formData);

		if (message) {
			dispatch({ type: "ADD_MESSAGE", payload: { role: "user", content: message, type: "text" } });

			if (isAuthenticated) await saveMessageToBackend(2, message, "text");

			form.reset();
			setLoading(true);
			setError(null);

			try {
				// dispatch({ type: "ADD_MESSAGE", payload: { role: "system", content: "Thinking...", type: "text" } });

				const response = await fetch(AI_URL, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ prompt: message }),
				});

				if (!response.ok) throw new Error("Failed to get AI response");

				const { completion } = await response.json();


				dispatch({ type: "ADD_MESSAGE", payload: { role: "system", content: completion, type: "text" } });


				if (isAuthenticated) await saveMessageToBackend(1, completion, "text");
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (chatEndRef.current) {
			setTimeout(() => {
				chatEndRef.current.scrollIntoView({ behavior: "smooth" });
			}, 100);
		}
	}, [state.messages]);

	return (
		<div className="h-full flex flex-col md:px-12 py-12 relative overflow-clip">
			<article className="flex flex-col gap-2 overflow-y-scroll h-4/5 no-scrollbar">
				{fetchingHistory ? (
					<p className="text-center text-gray-500">Loading previous messages...</p>
				) : state.messages.length > 0 ? (
					state.messages.map(({ role, content, type }, index) => (
						<div key={index} className={`p-2 rounded w-fit ${role === "system" ? "bg-green-30 text-white self-start" : "bg-green-20 text-green-30 self-end"}`}>
							{type === "text" ? <p>{content}</p> : <img src={content} alt="Uploaded" className="max-w-xs rounded-lg" />}
						</div>
					))
				) : (
					<div className="flex flex-col items-center justify-center h-full text-center text-white">
						<h2 className="text-2xl font-extrabold">How can we help you today?</h2>
						<p className="text-gray-400">Start a conversation with us</p>
					</div>
				)}
				<div ref={chatEndRef} />
			</article>

			<article className="absolute bg-white bottom-0 left-0 right-0 p-4 rounded-3xl md:w-1/2 md:mx-auto">
				<form className="relative" onSubmit={createChat}>
					<textarea rows="3" placeholder="Send a message..." className="w-full outline-none rounded-[27px] p-2 md:p-4 placeholder:text-green-30 resize-none" name="message"></textarea>
					<div className="flex items-center justify-between absolute bottom-0 left-0 right-4 w-full bg-white">
						<button type="button" onClick={() => fileInputRef.current.click()}>
							<FaPlusCircle className="text-green-30 text-3xl cursor-pointer" />
						</button>
						<input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
						<Link className="flex items-center gap-1 text-xs" to="/history">
							<FaClock className="text-green-30" />
							<span>Recent search</span>
						</Link>
						<button type="submit" disabled={loading}><FaArrowUp className="bg-green-30 text-white rounded-full p-1 text-3xl" /></button>
					</div>
				</form>
				{loading && <Loader />}
				{error && <p className="text-red-500">{error}</p>}
			</article>
		</div>
	);
}

export default ChatBox;

