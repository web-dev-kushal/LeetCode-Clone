import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";

// eslint-disable-next-line react/prop-types
function SignIn({ handleToggle, isSignIn }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    async function handleSubmit(e) {
        e.preventDefault();
        if(!email || !password)
            return alert("Please fill all the fields")
            try {
                const newUser = await signInWithEmailAndPassword(email, password);
                if (!newUser)
                  return;
                navigate('/problems');
              } catch (error) {
                alert(error.message);
              }
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
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="username or email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" style={{ width: "386px", backgroundColor: "#455a64" }} className="btn btn-primary" onClick={handleSubmit}>
                    { loading ? "Signing In..." : "Sign In" }
                </button>
            </form>
            <div className="change-auth">
                <a href="" style={{ textDecoration: "none", color: "#455a64" }}>Forgot Password?</a>
                <span style={{ cursor: "pointer" }} onClick={handleToggle}>
                    {isSignIn ? 'Sign up' : 'Sign in'}
                </span>
            </div>
        </div>
    )
}

export default SignIn