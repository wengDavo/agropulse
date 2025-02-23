import { createContext, useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const SIGNIN_URL = `${BACKEND}/api/v1/auth/signin`;
const SIGNOUT_URL = `${BACKEND}/api/v1/auth/signout`;
const SIGNUP_URL = `${BACKEND}/api/v1/auth/signup`;

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		// Load user from localStorage when component mounts
		const savedUser = localStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [chatSessionId, setChatSessionId] = useState(() => {
		// Load chat session ID from localStorage
		return localStorage.getItem("chatSessionId") || null;
	});

	const navigate = useNavigate();
	const notify = (message) => toast(message);

	useEffect(() => {
		// Sync user state with localStorage
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	useEffect(() => {
		// Sync chat session ID with localStorage
		if (chatSessionId) {
			localStorage.setItem("chatSessionId", chatSessionId);
		} else {
			localStorage.removeItem("chatSessionId");
		}
	}, [chatSessionId]);

	const createNewChatSession = async (email) => {
		if (!isAuthenticated) {
			return notify("login to create more chats")
		}
		try {
			const response = await fetch(`${BACKEND}/api/v1/users/chats`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				const errData = await response.json();
				notify(errData.message);
				return null;
			}

			const data = await response.json();
			notify("New chat session created!");
			setChatSessionId(data.chat.id);
			navigate("/")
		} catch (error) {
			notify("Failed to create a chat session.", error);
			return null;
		}
	};

	const signup = async (payload) => {
		const response = await fetch(SIGNUP_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errData = await response.json();
			notify(errData.message);
			return;
		}

		const data = await response.json();
		notify(data.message);
		navigate("/auth/signin");
	};

	const signin = async (payload) => {
		const response = await fetch(SIGNIN_URL, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errData = await response.json();
			notify(errData.message);
			return;
		}

		const data = await response.json();

		setUser(data.user);
		notify(data.message);

		// Create a new chat session upon login
		createNewChatSession(data.user);
		navigate("/");
	};

	const signout = async () => {
		const response = await fetch(SIGNOUT_URL, {
			method: "GET",
			credentials: "include",
		});

		if (!response.ok) {
			const errData = await response.json();
			notify(errData.message);
			return;
		}

		const data = await response.json();

		// Clear user state and chat session ID
		setUser(null);
		setChatSessionId(null);
		localStorage.removeItem("chatSessionId");

		notify(data.message);
		navigate("/auth/signin");
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider value={{ signout, signin, signup, isAuthenticated, user, createNewChatSession, chatSessionId, setChatSessionId }}>
			<ToastContainer />
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;

