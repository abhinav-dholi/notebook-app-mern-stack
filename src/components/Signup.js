import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", mail: "", password: "", cpassword: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5505/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMThiMDlkNzBiNDQ4NjQ5Y2VlNDFiIn0sImlhdCI6MTcwNTA5NzUxNH0.2l2d41rmYwZhjutC4TfCo-6EjRRDsJgMMrZ8b9dXb2A"
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Account created successfully", "success")
        }
        else {
            // alert("Invalid credentials")
            props.showAlert("Invalid credentials", "danger")
        }


    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-2'>
            <h2>Sign up to use Notebook App</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup