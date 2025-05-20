
//* Get access to profile name or id from redux state
//* display in the profile component

import { useSelector } from "react-redux"
import { userSelector } from "../features/auth"

export default function Profile() {
    const { user } = useSelector(userSelector)
    return (
        <div>
            profile - {user.username}, {user.id}
        </div>
    )
}
