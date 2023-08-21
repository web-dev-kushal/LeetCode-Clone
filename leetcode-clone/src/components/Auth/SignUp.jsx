import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";

// eslint-disable-next-line react/prop-types
function SignUp({ handleToggle, isSignIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email + " " + password);
    if(!email || !username || !password)
      return alert("Please enter all the fields to register");
    try {
      const newUser = await createUserWithEmailAndPassword(email, password);
      console.log(newUser);
      if (!newUser)
        return;
      navigate('/auth');
    } catch (error) {
      alert(error.message);
    }
    // const data = await res.json();
    // if(data.status === 'ok') {
    //   navigate('/auth');
    // }
  }

  useEffect(() => {
    if(error) {
      alert(error.message);
    }
  }, [error])

  return (
    <div>
      <form>
        <div className="mb-3" style={{ width: "386px" }}>
          <input type="username" className="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPass(e.target.value)} value={password} />
        </div>
        {/* <div className="mb-3">
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
        </div> */}
        <div className="mb-3" style={{ width: "386px" }}>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <button type="submit" style={{ width: "386px", backgroundColor: "#455a64" }} className="btn btn-primary" onClick={handleSubmit}>
          { loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div className="change-auth2">
        <p style={{ textDecoration: "none", color: "#455a64" }}>Have an Account?</p>
        <span style={{ cursor: "pointer" }} onClick={handleToggle}>
          {isSignIn ? 'Sign up' : 'Sign in'}
        </span>
      </div>
    </div>
  )
}

export default SignUp