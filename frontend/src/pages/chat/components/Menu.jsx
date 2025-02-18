import { useState } from "react"
import { FaBars } from "react-icons/fa"

const MenuItem = ({ label, url }) => (
	<li className="text-white hover:text-gray-300">
		<a href={url}>{label}</a>
	</li>
)

function Menu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const toggleMenu = () => setIsMenuOpen((prev) => !prev)

	const menuItems = [
		{ label: "Sign up / Sign in", url: "#" },
		{ label: "History", url: "#" },
		{ label: "Settings", url: "#" },
		{ label: "Upgrade Plan", url: "#" },
		{ label: "Log out", url: "#" }
	]

	return (
		<section className="">
			<FaBars
				size={20}
				color="var(--color-green-30)"
				onClick={toggleMenu}
				className="cursor-pointer"
				aria-label="Toggle Menu"
			/>

			{isMenuOpen && (
				<div className="fixed inset-0 z-40" onClick={toggleMenu}>
					<div className="fixed top-0 bottom-0 left-0 w-[70%] z-40 p-4 pt-20 bg-green-30" onClick={toggleMenu}>
						<menu className="grid gap-y-8">
							{menuItems.map((item, idx) => (
								<MenuItem key={idx} {...item} />
							))}
						</menu>
					</div>
				</div>
			)}
		</section>
	)
}

export default Menu

