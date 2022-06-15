import React, { useState } from 'react';
import './App.css';

function App() {
  const [stars, setStars] = useState<number>();
  const [picture, setPicture] = useState<string>();
  const [username, setUsername] = useState("");

  async function getGitHubUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = `http://localhost:3001/repositories/${username}`;
    const response = await fetch(url);
    const responseJSON = await response.json();

    setPicture(responseJSON[0].owner.avatar_url);
    setStars(responseJSON
        .map((repo: { stargazers_count: number; }) => repo.stargazers_count)
        .reduce((previous: number, current: number) => previous + current, 0));
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
              <button type="submit" className="btnGo"> Go </button>
            </div>
          </form>
          { picture &&
              <div className="container-picture">
                <img src={picture} alt='avatar' className="picture"/>
              </div>
          }
          { stars &&
              <div className="container-stars">
                <span className="stars"> {stars} </span>
              </div>
          }
        </div>
    </div>
  );
}

export default App;
