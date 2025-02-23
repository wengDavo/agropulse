import { useState, useEffect } from "react";
import Menu from "../core/components/Menu";
import LogoText from "../core/components/LogoText";
import NewChat from "../core/components/NewChat";
import { useAuth } from "../core/utils/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

function Settings() {
	const { user } = useAuth();
	const [formData, setFormData] = useState({ name: "", lastname: "", email: "" });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const notify = (message) => toast(message);

	useEffect(() => {
		if (!user) return;

		const fetchUserData = async () => {
			try {
				const response = await fetch(`${BACKEND}/api/v1/users?email=${user}`, {
					method: "GET",
					credentials: "include"
				});
				if (!response.ok) {
					throw new Error("Failed to fetch user data");
				}
				const data = await response.json();
				setFormData({
					name: data.user.name || "",
					lastname: data.user.lastname || "",
					email: data.user.email || ""
				});
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [user]);

	// Handle form input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		try {
			const response = await fetch(`${BACKEND}/api/v1/users`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					credentials: "include"
				},
				credentials: "include",
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				notify("Failed to update user details");
			}

			notify("User details updated successfully!");
		} catch (err) {
			notify(err.message);
		}
	};

	return (
		<>

			<ToastContainer />
			<section className="p-6 flex flex-col h-screen app-background-image">
				<article className="fixed flex justify-between items-center top-0 left-0 right-0 p-4 z-50">
					<Menu />
					<LogoText />
					<NewChat />
				</article>

				<article className="flex flex-col gap-2 h-full justify-center items-center">
					{loading ? (
						<p>Loading user data...</p>
					) : error ? (
						<p className="text-red-500">{error}</p>
					) : (
						<form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-[500px]">
							<label className="block text-sm font-semibold">First Name</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="w-full p-2 border rounded mb-3"
								required
							/>

							<label className="block text-sm font-semibold">Last Name</label>
							<input
								type="text"
								name="lastname"
								value={formData.lastname}
								onChange={handleChange}
								className="w-full p-2 border rounded mb-3"
								required
							/>

							<label className="block text-sm font-semibold">Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full p-2 border rounded mb-3 cursor-not-allowed"
								required
								disabled
							/>

							<button type="submit" className="bg-green-30 text-white w-full p-2 rounded mt-3 cursor-pointer">
								Update
							</button>

							{success && <p className="text-green-500 mt-2">{success}</p>}
							{error && <p className="text-red-500 mt-2">{error}</p>}
						</form>
					)}
				</article>
			</section>
		</>
	);
}

export default Settings;

