import './CourtList.css';

function CourtList({ courts, title, signUp }) {
  return (
    <div className="column">
        <p className="label">{title}</p>
        <div className="courts">
            {courts.map((court) => {
                return (
                  <button key={court.id} id={court.id} className="slots" onClick={(event) => signUp(court.id)}>
                    {court.type === "singles" && !(court.player1 === "" && court.player2 === "") && (
                      <p>{court.player1} vs. {court.player2}</p>
                    )}
                    {court.type === "doubles" && !(court.player1 === "" && court.player2 === "" && court.player3 === "" && court.player4 === "") && (
                      <p>{court.player1}/{court.player2} vs. {court.player3}/{court.player4}</p>
                    )}
                  </button>
                );
            })}
        </div>
    </div>
  );
}

export default CourtList;
