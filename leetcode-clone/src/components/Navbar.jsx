import { useAuthState, useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import { Link } from "react-router-dom";
import profileImg from "../assets/Profile.png";
import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [signOut, loading, error] = useSignOut(auth);

    async function handleLogOut() {
        await signOut();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid" style={{ width: "90%" }}>
                    <img src="https://leetcode.com/static/images/LeetCode_logo.png" alt="" style={{ height: "40px", objectFit: "cover" }} />
                    <a className="navbar-brand" href="#">LeetCode Clone</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Explore</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Problems</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" style={{ gap: "20px"}}>
                            <button className="btn btn-outline-success" type="submit">Premium</button>
                            {!user && (
                                <Link href='/auth'>
                                    <button className="btn btn-outline-success" type="submit" onClick={navigate('/auth')}>Sign In</button>
                                </Link>
                            )}
                            {user && (
                                <div className="nav-profile" style={{ cursor: 'pointer', display: "flex", gap: "20px"}}>
                                    <img src={profileImg} style={{ height:"40px", objectFit: "cover" }}/>
                                    <button className="btn btn-outline-success" type="submit" onClick={handleLogOut}>Log Out</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar