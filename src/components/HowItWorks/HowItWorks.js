import './HowItWorks.css';
import { Parallax } from 'react-parallax';
import register from '../../assets/registerFull.png';
import signUp from '../../assets/signUpFull.png';
import queue from '../../assets/queueFull.png';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function HowItWorks() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/Freeplay-Tracker');
  }

  return (
    <div className="HowItWorks">
      <Parallax strength={100} bgImage={register}>
        <div className="content">
          <div className="text-content">Register with UCINETID and name (Scroll down)</div>
        </div>
      </Parallax>
      <Parallax strength={10} bgImage={queue}>
        <div className="content">
          <div className="text-content">
            <span>
              ⋅ Press the (+) button to sign-up for a court <br />
              ⋅ (→) to finish game <br />⋅ ( x ) to clear line or spot in line
            </span>
          </div>
        </div>
      </Parallax>
      <Parallax strength={10} bgImage={signUp}>
        <div className="content">
          <div className="text-content">
            ⋅ Choose between singles or doubles
            <br />
            ⋅ Enter UCINETID (not including domain)
            <br /> ⋅ Toggle between merging or not (for incomplete sign-ups)
          </div>
        </div>
      </Parallax>
      <Parallax strength={200} blur={{ min: -5, max: 5 }} bgImage={queue}>
        <div className="content">
          <div className="text-content">Wait in line and play (scroll down)</div>
        </div>
      </Parallax>
      <div className="content">
        <Button onClick={handleClick} className="tryIt-button">
          Try Freeplay!
        </Button>
      </div>
    </div>
  );
}

export default HowItWorks;
