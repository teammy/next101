'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username,password)

    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ username, password })
    // });

    // if (response.ok) {
    //   router.push('/dashboard');
    // } else {
    //   const data = await response.json();
    //   setErrorMessage(data.message);
    // }
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;