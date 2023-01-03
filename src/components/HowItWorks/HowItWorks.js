import './HowItWorks.css';
import signUp from '../../assets/signUp.png';
import availableCourt from '../../assets/availableCourt.png';
import reserve from '../../assets/reserve.png';
import result from '../../assets/result.png';

function HowItWorks() {
  const handleSubmit = () => {
    alert('how it work form was submitted');
  };

  return (
    <div className="HowItWorks">
      <form className="form" onSubmit={handleSubmit}>
        <div className="name-layer">
          <h2>How it works</h2>
          <button>Try it out! &nbsp;&rarr;</button>
        </div>
        <div className="section">
          <div className="description">
            <p className="label">1&#x29; Sign up with phone number and name.</p>
            <p className="text">
              Click Sign Up on the top right corner to add yourself into the
              <br />
              UCI Badminton database. All we need is your phone number
              <br />
              and name!
            </p>
          </div>
          <img src={signUp} className="images" />
        </div>
        <div className="section">
          <div className="description">
            <p className="label">2&#x29; Click on an available court.</p>
            <p className="text">Click any court that have no name or a missing player.</p>
          </div>
          <img src={availableCourt} className="images" />
        </div>
        <div className="section">
          <div className="description">
            <p className="label">3&#x29; Reserve your spot on the court.</p>
            <p className="text">
              Enter in your phone number. If you are the first person to
              <br />
              sign up, choose what event you want to play.
            </p>
          </div>
          <img src={reserve} className="images" />
        </div>
        <div className="section">
          <div className="description">
            <p className="label">4&#x29; See your name on the court!</p>
            <p className="text">
              Once you click reserve, you could see your name on
              <br />
              the court!
            </p>
          </div>
          <img src={result} className="images" />
        </div>
      </form>
    </div>
  );
}

export default HowItWorks;
