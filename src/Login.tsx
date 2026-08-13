import {useState, type FormEvent} from 'react'
import axios from 'axios'
import './App.css'
import NavBar from "./NavBar.tsx";

function Login() {
    const [isRegistering, setIsRegistering] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isRegistering) {
            const r = await axios.post('/users', {username, password})
            switch (r.status) {
                case 201:
                    setResponse('Registration Successful')
                    break
                case 500: setResponse('Server Error'); break
                case 409: setResponse('Username Already Exists'); break
                default:  setResponse('Invalid Username or Password')
            }
        } else {
            const r = await axios.post('/login', {username, password})
            switch (r.status) {
                case 200:
                    setResponse('Login Success')
                    break
                case 500: setResponse('Server Error'); break
                default: setResponse('Invalid Username or Password')
            }
        }
    }

    return (
        <>
            <NavBar />
            <h1>{isRegistering ? "Register" : "Login"}</h1>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={e => setUsername(e.target.value)}/>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">{isRegistering ? "Register" : "Login"}</button>
            </form>
            <p>{response}</p>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Login Instead" : "Register Instead"}
            </button>
        </>
    )
}

export default Login