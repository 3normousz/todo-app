import { useRef, useState } from "react";
import { useAuth } from "./authContext";
import "../index.css"
import { set } from "date-fns";

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { signUp, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSummit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('');
            setLoading(true);
            console.log(emailRef.current.value);
            console.log(passwordRef.current.value);
            await signUp(emailRef.current.value, passwordRef.current.value);
            console.log("Success");
        } catch {
            setError('Failed to create an account');
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
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="passwordConfirmation">
                            Password Confirmation
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password-confirmation"
                            type="password"
                            placeholder="******************"
                            ref={passwordConfirmationRef}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-start">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="summit" disabled={loading}>
                            Sign Up
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-4" href="#">
                            Already have an account? Log in
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp