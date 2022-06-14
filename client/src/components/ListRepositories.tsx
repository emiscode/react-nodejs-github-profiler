import { useEffect, useState } from "react";

function ListRepositories() {
    const [repositories, setRepo] = useState<any[]>([]);

    useEffect(() => {
        async function loadRepos() {
            const response = await fetch('http://localhost:3001/repositories');
            const responseJSON = await response.json();

            setRepo(responseJSON);
        }

        loadRepos();
    }, []);
    
    return (
        <ul>
            {repositories.map((repository, index) => (
                <li key={index}>
                    {repository.name}
                </li>
            ))}
        </ul>
    )
}

export default ListRepositories;