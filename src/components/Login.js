import React, { useState } from 'react' 
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5505/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMThiMDlkNzBiNDQ4NjQ5Y2VlNDFiIn0sImlhdCI6MTcwNTA5NzUxNH0.2l2d41rmYwZhjutC4TfCo-6EjRRDsJgMMrZ8b9dXb2A"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Logged in successfully", "success")
        }
        else {
            // alert("Invalid credentials")
            props.showAlert("Invalid details", "danger")
        }
        
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name= "password" value={credentials.password} onChange={onChange} id= "password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login