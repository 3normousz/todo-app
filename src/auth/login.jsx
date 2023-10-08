import { React, useRef, useState, useEffect } from 'react'
import { useAuth } from "./authContext";
import { useNavigate, useLocation } from 'react-router-dom'
import InputField from "../loginComponents/inputField";
import "../index.css"

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { logIn } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [signedUpSuccessValue, setSignedUpSuccessValue] = useState(0);

    async function handleSummit(e) {
        e.preventDefault();

        try {
            setError('');
            setSignedUpSuccessValue(0);
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value);
            navigate('/calendar');
        } catch {
            setError('Failed to sign in');
        }
        setLoading(false);

    }

    useEffect(() => {
        if (location.state && location.state.value) {
            setSignedUpSuccessValue(location.state.value);
        }
    }, [location]);

    return (
        <>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSummit}>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>}
                    {signedUpSuccessValue === 1 && <div className="bg-teal-100 border border-teal-500 text-teal-900 px-4 py-3 rounded relative mb-2" role="alert">
                        <span className="block sm:inline">Account Successfully Created ! </span>
                    </div>}
                    <div className="mb-6">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Email"
                            refProp={emailRef}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="******"
                            refProp={passwordRef}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-center mt-6">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mt-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>
                            Login
                        </button>
                        <a className="inline-block mt-4 font-bold text-sm text-blue-500 hover:text-blue-800" href="/signup">
                            Need an account? Sign Up
                        </a>
                    </div>

                </form>
            </div>
        </>
    )
}
