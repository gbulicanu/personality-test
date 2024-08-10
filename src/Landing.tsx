import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Landing.scss';

function Landing() {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button type='button' className='btn btn-primary' onClick={() => navigate('/questions')}>
          Start Personality Test
        </button>
        <hr />
        <p className='h6'>The current time is {new Date(currentTime*1000).toTimeString()}.</p>
      </header>
    </div>
  );
}

export default Landing;
