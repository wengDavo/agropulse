import { Routes, Route } from "react-router"
import Chat from "./modules/chat"
import { Signup, Signin } from "./modules/auth"
import History from "./modules/history"
import Settings from "./modules/settings"
import Upgrade from "./modules/upgrade"

function App() {
	return (
		<section >
			<Routes>
				<Route index element={<Chat />} />
				<Route path="auth">
					<Route path="signin" element={<Signin />} />
					<Route path="signup" element={<Signup />} />
				</Route>
				<Route path="history" element={<History />} />
				<Route path="settings" element={<Settings />} />
				<Route path="upgrade" element={<Upgrade />} />
			</Routes>
		</section>
	)
}

export default App
