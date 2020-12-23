import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [tech, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
}, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('tech', tech);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('./dashboard');
    }
        
    return (
        <form onSubmit={handleSubmit}>
            <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select image" />
            </label>

            <label htmlFor="company">COMPANY *</label>
            <input
                id="company"
                placeholder="Your company"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="tech">TECHNOLOGIES *<span>(csv format)</span></label>
            <input
                id="tech"
                placeholder="Technologies used"
                value={tech}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">DAILY PRICE *<span>(blank if FREE)</span></label>
            <input
                id="price"
                placeholder="Price in CAD"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

        <button type="submit" className="btn">ADD</button>
        </form>
    )
}