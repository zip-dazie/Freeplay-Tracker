import './HowItWorks.css';
import { Parallax } from 'react-parallax';
import register from '../../assets/registerFull.png';
import signUp from '../../assets/signUpFull.png';
import court from '../../assets/courtsFull.png';
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
      <Parallax strength={10} bgImage={court}>
        <div className="content">
          <div className="text-content">
            <span>
              ⋅ (+) sign-up for a court <br />
              ⋅ (→) finish game <br />⋅ (−) withdraw a player <br />⋅ (⊕) add-on to a queue slot
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
            <br /> ⋅ Toggle between merging or not (find incomplete sign-ups)
          </div>
        </div>
      </Parallax>
      <Parallax strength={200} blur={{ min: -5, max: 5 }} bgImage={court}>
        <div className="content">
          <div className="text-content">Wait in line and play (scroll down)</div>
        </div>
      </Parallax>
      <div className="content">
        <Button
          onClick={(e) => {
            e.preventDefault();
            setTimeout(() => {
              handleClick();
            }, 500);
          }}
          style={{
            fontSize: '5vh',
            height: '10vh',
            width: '40vh',
            borderRadius: '3vh',
            backgroundColor: '#343a40',
            borderColor: '#343a40',
            fontWeight: '500'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'skyblue';
            e.target.style.borderColor = 'skyblue';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#343a40';
            e.target.style.borderColor = '#343a40';
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.target.style.backgroundColor = 'skyblue';
            e.target.style.borderColor = 'skyblue';
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.target.style.backgroundColor = '#343a40';
            e.target.style.borderColor = '#343a40';
            handleClick();
          }}
        >
          Try Freeplay!
        </Button>
      </div>
    </div>
  );
}

export default HowItWorks;
