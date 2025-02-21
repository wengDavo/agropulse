import { useState } from "react";
import Logo from "../../core/components/Logo";
import LogoText from "../../core/components/LogoText";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";


const BACKEND = import.meta.env.VITE_BACKEND_URL;
const SIGNIN_URL = `${BACKEND}/api/v1/auth/signin`;

function Signin() {
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordState = () => setShowPassword((prev) => !prev);
	const [watchForm, setWathForm] = useState(0);
	let navigate = useNavigate()

	const notify = (message) => toast(message);

	const handleSubmit = async (e) => {
		e.preventDefault()
		const form = e.currentTarget
		const formDataItterable = new FormData(form)
		const formDataObj = Object.fromEntries(formDataItterable)
		form.reset()
		setWathForm((prev) => prev + 1)
		let response = await fetch(SIGNIN_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formDataObj)
		})
		if (!response.ok) {
			let errData = await response.json()
			notify(errData.message)
			return;
		}
		const data = await response.json()
		notify(data.message)
		return navigate("/")
	}

	return (
		<>

			<ToastContainer />
			<section className="h-screen grid place-content-center gap-6 md:gap-8">
				<div className="grid gap-y-2 md:gap-y-4">
					<Logo css={"mx-auto"} />
					<LogoText css={"mx-auto"} />
				</div>
				<h3 className="text-3xl text-center">Welcome</h3>
				<form className="mx-auto grid gap-y-2 md:gap-y-4" onSubmit={handleSubmit}>
					<div className="border border-gray-10 outline-none rounded-md">
						<input type="email" required placeholder="Email Address*" className="outline-none p-4" name="email" />
					</div>
					<div className="border border-gray-10 outline-none rounded-md relative">
						<input
							type={showPassword ? "text" : "password"}
							required
							placeholder="Password*"
							className="outline-none p-4 w-full md:w-[400px]"
							name="password"
						/>
						{showPassword ? (
							<FaEye className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" onClick={togglePasswordState} />
						) : (
							<FaEyeSlash className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" onClick={togglePasswordState} />
						)}
					</div>
					<button className="rounded-md bg-green-30 p-4 text-white cursor-pointer" type="submit">Submit</button>
					<Link to="/" className="p-4 text-green-30 mx-auto cursor-pointer">Go Back</Link>
				</form>
				<div className="text-sm mx-auto">
					<span>Don&apos;t have an account? </span>
					<NavLink to="/auth/signup" className="text-green-30" >
						SIGNUP
					</NavLink>
				</div>
			</section>
		</>
	);
}

export default Signin;

