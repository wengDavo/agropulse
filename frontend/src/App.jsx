import Chat from "./modules/chat"
import { Routes, Route } from "react-router"

function App() {
	return (
		<section style={{
			backgroundImage: "url(agroBackground.png)",
			backgroundRepeat: "no-repeat",
			backgroundAttachment: "fixed",
			backgroundSize: "cover",
			zIndex: -20
		}}>
			<Routes>
				<Route index element={<Chat />} />
			</Routes>
		</section>
	)
}

export default App
