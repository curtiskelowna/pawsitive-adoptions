import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setError('');
    setIsLoggingIn(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const response = await axios.post('http://localhost:8080/login', { email, password: password });

      // Handle successful login and token response
      console.log('Login successful:', response.data.token);
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.message);
      setError(error.message); // Set the error message to display to the user
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogin} disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

export default Login;