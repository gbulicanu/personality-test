import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import './Landing.scss';

function Landing() {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    axios.get('/api/time').then(response => {
      setCurrentTime(response.data.time);
    });
  }, []);

  return (
    <div className="Landing container">
      <header>
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
