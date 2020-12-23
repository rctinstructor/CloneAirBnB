import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
      event.preventDefault();
  
      const response = await api.post('./sessions', { email });
  
      const { _id } = response.data;
  
      localStorage.setItem('user', _id);

      history.push('/dashboard');
     }

    return (
        <>
        <p>
        Spots available for <strong>developers</strong>. Find a new talent for your department
        </p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email *</label>
            <input 
            type="email" 
            id="email" 
            placeholder="Your business email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            />
            <button className="btn" type="submit">Submit</button>
        </form>
        </>
    )
}