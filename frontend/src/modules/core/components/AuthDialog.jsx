import { useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import LogoText from "./LogoText";
import Logo from "./Logo";

function AuthDialog() {
	const dialogRef = useRef(null);

	const openDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const closeDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.close();
		}
	};

	// Close if user clicks outside the dialog content,
	// dialogRef is also the invisible backdrop and we close that if you click it
	const handleBackdropClick = (event) => {
		if (event.target === dialogRef.current) {
			closeDialog();
		}
	};

	useEffect(() => {
		setTimeout(openDialog, 0); // Ensures modal opens after mount
	}, []);

	return (
		<dialog
			ref={dialogRef}
			onClick={handleBackdropClick}
			className="z-50 backdrop:backdrop-blur-3xl outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm rounded-2xl"
		>
			<article className="rounded-2xl py-7 px-4 relative">
				<MdCancel
					className="text-green-30 absolute top-4 right-4 cursor-pointer w-[22px] aspect-square"
					onClick={closeDialog}
				/>
				<div className="grid gap-y-4">
					<figure className="grid justify-center">
						<h3
							className="text-[30px]"
							style={{
								fontFamily: "var(--font-logo)",
								color: "var(--color-green-30)",
							}}
						>
							Welcome to
						</h3>
						<Logo css={"mx-auto"} />
						<LogoText css={"mx-auto"} />
					</figure>
					<div className="text-xs text-center mx-auto w-[70%]">
						<p>Log in or sign up to get full access to our services.</p>
					</div>
					<div className="grid gap-y-2">
						<button className="bg-green-500 w-full rounded-3xl outline-none text-white p-2">
							Sign up
						</button>
						<button className="border border-green-30 w-full rounded-3xl outline-none text-green-30 p-2">
							Sign in
						</button>
					</div>
				</div>
			</article>
		</dialog>
	);
}

export default AuthDialog;

