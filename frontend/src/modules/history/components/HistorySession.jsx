import { useAuth } from "../../core/utils/AuthProvider"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

function HistorySession({ chat }) {
	const { setChatSessionId } = useAuth()
	const navigate = useNavigate()

	const changeChatId = () => {
		setChatSessionId(chat.id)
		navigate("/")
	}
	return (<div className="p-2 overflow-clip bg-green-30 cursor-pointer rounded-md text-white hover:bg-green-20" onClick={changeChatId}>
		{chat.session_id}
	</div>)
}
export default HistorySession
