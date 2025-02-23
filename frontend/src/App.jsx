import { Routes, Route } from "react-router"
import Chat from "./modules/chat"
import { Signup, Signin } from "./modules/auth"
import History from "./modules/history"
import Settings from "./modules/settings"
import Upgrade from "./modules/upgrade"
import PrivateRoutes from "./modules/core/utils/PrivateRoutes"
import AuthProvider from "./modules/core/utils/AuthProvider"
import PageNotFound from "./modules/core/components/PageNotFound"


function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route index element={<Chat />} />
				<Route path="auth">
					<Route path="signin" element={<Signin />} />
					<Route path="signup" element={<Signup />} />
				</Route>
				<Route path="upgrade" element={<Upgrade />} />
				<Route element={<PrivateRoutes />}>
					<Route path="history" element={<History />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="*" element={<PageNotFound />}
				/>
			</Routes>
		</AuthProvider>
	)
}

export default App
