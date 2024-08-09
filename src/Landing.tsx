import { useEffect, useState } from 'react';
import './Landing.scss';

function Landing() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button type='button' className='btn btn-primary'>
          Start Personality Test
        </button>
        <hr />
        <p className='h6'>The current time is {new Date(currentTime*1000).toTimeString()}.</p>
      </header>
    </div>
  );
}

export default Landing;
