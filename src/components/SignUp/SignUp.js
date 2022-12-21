
import './SignUp.css';

function SignUp(props) {
  return (props.trigger) ? (
    <div className="Sign-Up">
        <div onClick={() => props.setTrigger()} className="overlay"></div>
        <div className="modal-content">
            { props.children }
            <h2>Hello Modal</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                perferendis suscipit officia recusandae, eveniet quaerat assumenda
                id fugit, dignissimos maxime non natus placeat illo iusto!
                Sapiente dolorum id maiores dolores? Illum pariatur possimus
                quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={() => props.setTrigger()}>
                CLOSE
            </button>
        </div>
    </div>
  ) : "";
}

export default SignUp;
