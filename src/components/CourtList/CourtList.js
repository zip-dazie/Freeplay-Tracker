import './CourtList.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CourtList({ courts, title, setCourtID }) {
  return (
    <div className="column">
      <p className="label">{title}</p>
      <div className="courts">
        {courts.map((court) => {
          return (
            <Link
              to={'/reserve/' + court.id}
              state={{ from: 'uh oh stinky' }}
              key={court.id}
              id={court.id}
              className="slots"
              onClick={() => setCourtID(court.id)}>
              {court.type === 'singles' &&
                !(court.players[0] === '' && court.players[1] === '') && (
                  <p>
                    {court.players[0]} vs. {court.players[1]}
                  </p>
                )}
              {court.type === 'doubles' &&
                !(
                  court.players[0] === '' &&
                  court.players[1] === '' &&
                  court.players[2] === '' &&
                  court.players[3] === ''
                ) && (
                  <p>
                    {court.players[0]}/{court.players[1]} vs. {court.players[2]}/{court.players[3]}
                  </p>
                )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

CourtList.propTypes = {
  courts: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  setCourtID: PropTypes.func.isRequired
};

export default CourtList;
