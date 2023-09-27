import { React, useRef, useState } from 'react'
import { useAuth } from "./authContext";
import { useNavigate } from 'react-router-dom'
import "../index.css"

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { logIn } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSummit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            console.log(emailRef.current.value);
            console.log(passwordRef.current.value);
            await logIn(emailRef.current.value, passwordRef.current.value);
            navigate('/calendar');
            console.log("Login Success");
        } catch {
            setError('Failed to sign in');
        }
        setLoading(false);

    }
    return (
        <>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSummit}>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            ref={emailRef}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            ref={passwordRef}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-start">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="summit" disabled={loading}>
                            Login
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-4" href="/signup">
                            Need an account? Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
}
