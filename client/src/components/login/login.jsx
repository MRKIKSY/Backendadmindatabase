import  { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../components/Auth/Auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/api/users/login", {
                email: email,
                password: password,
            });
            if (response.data.token) {
                setToken(response.data.token);
                navigate('/');
            } else {
                setError("Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            setError(error.response?.data || "An error occurred during login. Please try again later.");
        }
    };


    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center"
            style={{ backgroundImage: 'url("my-app/public/loginimage.jpeg")', backgroundSize: 'cover', backgroundColor: '#D9DEDF' }}>
            <div className="row">
                <div className="col-md-6">
                    <img src="" alt="" className="img-fluid" />
                </div>
                <div className="col-md-35 d-flex justify-content-center align-items-center">
                    <form className="p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', maxWidth: '500px' }}>
                        <h1 className="text-center mb-4 fw-bold display-4">Admin Portal</h1>

                        <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{error && error}</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                style={{ width: '100%' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                style={{ width: '100%' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="/#" className="text-body mb-3 d-block">Forgot password?</a>
                        <div className="text-center">
                            <button type="button" className="btn btn-primary btn-lg" onClick={login}>Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Dont have an account? <a href="signup" className="link-danger">Sign Up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
