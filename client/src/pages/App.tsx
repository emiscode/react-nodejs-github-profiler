import React, {useState} from 'react';
import './App.css';

interface UserInfo {
    picture: string,
    stars: number
}

function App() {
    const [username, setUsername] = useState("");
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
    const [error, setError] = useState<boolean>(false);

    async function getGitHubUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const url = `http://localhost:3001/repositories/${username}`;

        fetch(url)
            .then(async data => {
                setError(false);
                setUserInfo(await data.json());
            })
            .catch(_ => {
                setError(true);
                setUserInfo(undefined);
            });
    }

    return (
        <div className="App">
            <div className="container">
                <form onSubmit={getGitHubUser}>
                    <div>
                        <label htmlFor='github'> github.com/ </label>
                        <input
                            required
                            id='github'
                            type='text'
                            name='github'
                            value={username}
                            placeholder='username'
                            onChange={event => setUsername(event.target.value)}
                        />
                        <button type="submit" className="btnGo"> Go</button>
                    </div>
                </form>
                {userInfo &&
                  <div className="container-picture">
                    <img src={userInfo.picture} alt='avatar' className="picture" />
                  </div>
                }
                {userInfo &&
                  <div className="container-stars">
                    <span className="stars"> {userInfo.stars} </span>
                  </div>
                }
                {error &&
                  <div className="container-error">
                    <span className="error"> User not found! </span>
                  </div>
                }
            </div>
        </div>
    );
}

export default App;
