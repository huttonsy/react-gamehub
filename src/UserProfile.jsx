import { useParams } from "react-router-dom";

export default function UserProfile() {
    let { username } = useParams(); 
    return (
        <>
            <h1>Welcome, {username}!</h1> 
        </>
    );
}
