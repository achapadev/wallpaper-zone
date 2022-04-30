import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from './assets/logo_transparent.png';
import { Router, Route, Link } from 'react-router-dom';

function App() {
  const [text, setText] = useState('');
  const [resolution, setResolution] = useState('');
  const [wallpapers, setWallpapers] = useState([]);

  console.log(wallpapers);

  const fetchWallpapers = async () => {
    const response = await fetch(
      `http://localhost:8000/api?q=${text}&resolutions=${resolution}`
    );
    const data = await response.json();
    setWallpapers(data.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWallpapers();
  };

  const onSelectChange = (e) => {
    setResolution(e.target.value);
  };

  return (
    <>
      <Header>
        <Link to="/">
          <Img src={Logo} alt="" />
        </Link>
        <ul>
          <li>Sign In</li>
          <li>Sign Out</li>
        </ul>
      </Header>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id=""
          placeholder="Search Here"
        />
        <input type="submit" value="submit" />
        <select
          name="res-selection"
          value={resolution}
          id=""
          onChange={onSelectChange}
        >
          <option value="">choose resolution</option>
          <option value="1920x1080">1920x1080</option>
          <option value="2560x1440">2560x1440</option>
          <option value="3440x1440">3440x1440</option>
          <option value="3840x2160">3840x2160</option>
          <option value="5120x1440">5120x1440</option>
        </select>
      </Form>
      <Grid>
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id}>
            <img src={wallpaper.thumbs.small} alt="" />
          </div>
        ))}
      </Grid>
    </>
  );
}

const Header = styled.header`
  ul {
    display: flex;
    justify-content: right;
    gap: 2rem;
    margin-right: 2rem;
  }
  li {
    list-style: none;
    color: white;
    font-size: 1.1rem;
  }
`;

const Img = styled.img`
  height: 220px;
  display: block;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  input[type='submit'] {
    padding: 1rem 2rem;
    background-color: rgba(36, 198, 224, 1);
    border: 1.5px solid white;
    color: black;
    border-radius: 1.2rem;
    font-size: 1.3rem;
    margin-left: 1rem;
  }
  input[type='text'] {
    padding: 1rem 3rem;
    border-radius: 1.2rem;
    font-size: 1.1rem;
    text-align: center;
  }
  select {
    margin-left: 1rem;
    border-radius: 1.2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1em;
  img {
    width: 300px;
    display: block;
    height: 200px;
  }
`;

export default App;
