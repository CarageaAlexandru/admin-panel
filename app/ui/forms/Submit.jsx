import {useFormStatus} from "react-dom";

function Submit() {
    const {pending} = useFormStatus()
    return (
        <button className="btn btn-accent" type="submit" disabled={pending}>
            {pending ? <span className="loading loading-dots loading-lg"></span> : "Submit"}
        </button>
    )
}

export default Submit