import { useEffect, useState } from "react";
import Menu from "../core/components/Menu";
import LogoText from "../core/components/LogoText";
import NewChat from "../core/components/NewChat";
import HistorySession from "./components/HistorySession";
import { useAuth } from "../core/utils/AuthProvider";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

function History() {
	const { user } = useAuth();
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchChats = async () => {
			if (!user) return;

			try {
				const response = await fetch(`${BACKEND}/api/v1/users/chats?email=${user}`, {
					credentials: "include"
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || "Failed to fetch chats");
				}
				setChats(data.chats);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchChats();
	}, [user]);

	return (
		<section className="p-6 pt-20 flex justify-between flex-col h-screen app-background-image">
			{/* Top bar */}
			<article className="fixed flex justify-between items-center top-0 left-0 right-0 p-4 z-50">
				<Menu />
				<LogoText />
				<NewChat />
			</article>

			{/* Chat History */}
			<article className="flex flex-col gap-2 h-full py-10 px-4 md:px-20 overflow-scroll no-scrollbar">
				{loading ? (
					<p className="text-center text-gray-500">Loading chats...</p>
				) : error ? (
					<p className="text-center text-red-500">{error}</p>
				) : chats.length > 0 ? (
					chats.map((chat) => <HistorySession key={chat.id} chat={chat} />)
				) : (
					<p className="text-center text-3xl text-green-30 font-bold">No chats found</p>
				)}
			</article>
		</section>
	);
}

export default History;

