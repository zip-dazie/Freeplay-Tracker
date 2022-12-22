import './CourtList.css';

function CourtList({ courts, title, signUp }) {
  return (
    <div className="column">
        <p className="label">{title}</p>
        <div className="courts">
            {courts.map((court) => {
                return (
                    <button key={court.id} id={court.id} className="slots" onClick={(event) => signUp(event.target.id)}>
                      {court.player != "" && (
                        <p>{court.player} vs. {court.other}</p>
                      )}
                    </button>
                );
            })}
        </div>
    </div>
  );
}

export default CourtList;
