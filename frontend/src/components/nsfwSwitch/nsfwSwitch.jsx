import { useSelector } from "react-redux"
import NsfwSwitchTransferer from "./holders/nsfwSwitchTransferer";

function NsfwSwitch() {
    const show_nsfw = useSelector((state)=>state.auth.show_nsfw);

    return (
        <NsfwSwitchTransferer
            show_nsfw = {show_nsfw}
        />
    )
}

export default NsfwSwitch;