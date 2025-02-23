import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdPerson, MdSettings, MdHistory, MdUpgrade, MdLogout, MdLogin } from "react-icons/md";
import { Link } from "react-router";
import { useAuth } from "../utils/AuthProvider";

const MenuItem = ({ label, url, icon, css }) => (
	<li className={`${css}`}>
		{icon}
		<Link to={url}>{label}</Link>
	</li>
);

function Menu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);
	const { signout, isAuthenticated, user } = useAuth();

	const menuItems = [
		{ label: "Sign in", url: "/auth/signin", display: !isAuthenticated, icon: <MdLogin /> },
		{ label: "Sign up", url: "/auth/signup", display: !isAuthenticated, icon: <MdLogin /> },
		{ label: "Upgrade", url: "/upgrade", display: !isAuthenticated, icon: <MdUpgrade /> },
		{ label: "Settings", url: "/settings", display: isAuthenticated, icon: <MdSettings /> },
		{ label: "History", url: "/history", display: isAuthenticated, icon: <MdHistory /> },
	];

	return (
		<>
			<section className="md:hidden">
				<FaBars
					size={20}
					color="var(--color-green-30)"
					onClick={toggleMenu}
					className="cursor-pointer"
					aria-label="Toggle Menu"
				/>

				{isMenuOpen && (
					<div className="fixed inset-0 bg-black/40" onClick={toggleMenu}>
						<div
							className="fixed top-0 bottom-0 left-0 w-[70%] p-4 pt-20 z-20 bg-green-30"
							onClick={(e) => e.stopPropagation()}
						>
							<menu className="grid gap-y-8">
								{isAuthenticated && (
									<p className="text-white hover:text-gray-300 mt-auto cursor-pointer flex items-center gap-x-3">
										<MdPerson />
										<span>{user}</span>
									</p>
								)}
								{menuItems.map(({ label, url, display, icon }, idx) =>
									display && <MenuItem key={idx} label={label} url={url} icon={icon} css={"text-white hover:text-gray-300 flex items-center gap-2"} />
								)}
								{isAuthenticated && (
									<p
										className="text-white hover:text-gray-300 mt-auto cursor-pointer flex items-center gap-x-3"
										onClick={signout}
									>
										<MdLogout />
										Log out
									</p>
								)}
							</menu>
						</div>
					</div>
				)}
			</section>
			<section className="hidden md:grid text-green-30 order-3">
				<menu className="flex gap-4 justify-evenly items-center">
					{isAuthenticated && (
						<p className="cursor-pointer flex items-center gap-x-3">
							<MdPerson />
							<span>{user}</span>
						</p>
					)}
					{menuItems.map(({ label, url, display, icon }, idx) =>
						display && <MenuItem key={idx} label={label} url={url} icon={icon}
							css={"text-green-30 hover:text-green-400 text-xl hover:bg-green-20 py-1 px-3 rounded-full flex items-center gap-2"} />
					)}
					{isAuthenticated && (
						<p
							className="hover:text-green-400 cursor-pointer flex items-center gap-x-3"
							onClick={signout}
						>
							<MdLogout />
							Log out
						</p>
					)}
				</menu>
			</section>
		</>
	);
}

export default Menu;

