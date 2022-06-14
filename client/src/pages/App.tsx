import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [gitHubUser, setGitHubUser] = useState<any[]>();

  async function getGitHubUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/repositories');
    const responseJSON = await response.json();

    setGitHubUser(responseJSON);
  }

  return (
    <div className="App">
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
          <button type="submit">Go</button>
        </div>
      </form>
      {gitHubUser && <ul>
        {gitHubUser.map((repository, index) => (
          <li key={index}>
            {repository.name}
          </li>
        ))}
      </ul>
      }
    </div>
  );
}

export default App;