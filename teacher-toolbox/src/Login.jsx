// src/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function Login() {
  const { login, signup, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-field mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {(formError || error) && <p className="text-red-600 mb-2">{formError || error}</p>}
        <button
          className="btn-primary w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button
        className="btn-secondary mt-4 w-full"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? 'Have an account? Login' : 'Need an account? Sign Up'}
      </button>
    </div>
  );
}

