import './Router.css';
import React, { useState, useEffect } from 'react';
import { Link, Routes, useParams, Route } from 'react-router-dom';

export default function App() {
  const [singers] = useState([
    { "singer_person": "first" },
    { "singer_person": "second" },
    { "singer_person": "third" },
    { "singer_person": "fourth" }
  ]);

  const { singer_person } = useParams();
  const [lyric, setLyric] = useState('');
  const [totallyrics, setTotalLyrics] = useState([]);

  const changeValue = (e) => {
    if (!singer_person) {
      return;
    }
    setLyric(e.target.value);
  }

  useEffect(() => {
    setLyric("");
  }, [singer_person])

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      let tmp = [...totallyrics];
      let loadValues = { id: singer_person, value: lyric };
      tmp.push(loadValues);
      setTotalLyrics(tmp);
      setLyric('');
    }
  }

  return (
    <div className="App">
      <h1>Complete the Lyrics</h1>
      {singers.map((singer) => (
        <Link key={singer.singer_person} to={`/singer/${singer.singer_person}`}>
          <button className={`Singer-${singer.singer_person}`}>{`${singer.singer_person.toUpperCase()} SINGER`}</button>
        </Link>
      ))}
      <div>
        <input type="text" value={lyric} className="inputBox" onChange={changeValue} onKeyPress={handleEnter} />
      </div>

      <div className='ResultBox'>
        {lyric && (
          <div className={`singer-${singer_person} preview`}>
            <b>Preview Lyric:</b> {lyric}
          </div>
        )}
        {totallyrics.map((lyricItem, index) => (
          <div key={index} className={`singer-${lyricItem.id}`}>{lyricItem.value}</div>
        ))}
      </div>
    </div>
  );
}
