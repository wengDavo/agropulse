import { MdChatBubbleOutline } from "react-icons/md";
import { useAuth } from "../utils/AuthProvider";

function NewChat() {
	const { user, createNewChatSession } = useAuth();

	return (
		<div className="md:hidden" onClick={() => createNewChatSession(user)}>
			<MdChatBubbleOutline
				size={30}
				color="var(--color-green-30)"
				className="cursor-pointer"
			/>
		</div>
	);
}

export default NewChat;

