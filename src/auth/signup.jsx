import { useRef, useState } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from 'react-router-dom'
import InputField from "../loginComponents/inputField";
import "../index.css"

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSummit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            navigate('/', { state: { value: 1 } });
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);

    }
    return (
        <>
            <div className="w-full max-w-xs">
                <form className="bg-neutral-400 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSummit}>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                        <span className="block sm:inline">{error}</span>
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
                    <div className="mb-6">
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="******"
                            refProp={passwordRef}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <InputField
                            label="Password Confirmation"
                            type="password"
                            placeholder="******"
                            refProp={passwordConfirmationRef}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-center mt-6">
                        <button className="bg-white hover:bg-neutral-500 text-black font-bold py-2 px-6 mt-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>
                            Sign Up
                        </button>
                        <a className="inline-block mt-4 font-bold text-sm text-neutral-700 hover:text-black" href="/">
                            Already have an account? Log in
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp