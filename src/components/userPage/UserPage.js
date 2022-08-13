import { useParams } from "react-router-dom";

export default function UserPage() {
    const { id } = useParams();
    return(
        <div>Eu sou a UserPage com id = {id}</div>
    );
}