import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { RegisterFile } from "./../../TypescriptFiles/Auth"
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
function Register() {
    let [name, setName] = useState("")
    let [surname, setSurname] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const answer = RegisterFile(name, surname, email, password)
        const response: number = await answer
        if (response == 201) {
            alert("Registered succesfully!")
            return window.location.href = '/login'
        } else if (response == 409) {
            alert("You have already registered. Please login!")
            return window.location.href = '/login'
        } else {
            alert("Internal error. Please try again later!")
        }
    }

    const auth = getAuth()
    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(res => {
                let fullName = res.user.displayName?.split(" ")
                setName(fullName ? fullName[0] : "")
                setSurname(fullName ? fullName[1] : "")
                setEmail(res.user.email!)
                alert("Please fill the password column!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <MDBContainer fluid style={{ height: window.innerHeight }} className='d-flex align-items-center  justify-content-center bg-purple-900 '>
            <div className='mask gradient-custom-3'></div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}>
                <MDBCard className='m-5' style={{ maxWidth: '1024px' }}>
                    <MDBCardBody className='px-[60px]'>
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                        <MDBInput wrapperClass='mb-4' value={name} onChange={(e) => (setName(e.target.value))} label='Your Name' className='text-2xl' size='lg' id='form1' type='text' />
                        <MDBInput wrapperClass='mb-4' value={surname} onChange={(e) => (setSurname(e.target.value))} label='Your Surname' size='lg' id='form1' type='text' />
                        <MDBInput wrapperClass='mb-4' value={email} onChange={(e) => (setEmail(e.target.value))} label='Your Email' size='lg' id='form2' type='email' />
                        <MDBInput wrapperClass='mb-2' value={password} onChange={(e) => (setPassword(e.target.value))} label='Password' size='lg' id='form3' type='password' />
                        <h1 className='mb-2 text-2xl'>
                            <span className='flex justify-content-center'>You can login with:</span>
                            <ul className='flex gap-5 justify-content-center text-3xl'>
                                <i onClick={() => signInWithGoogle()} className="cursor-pointer bi bi-google"></i>
                                {/* <i className="bi bi-github"></i> */}
                            </ul>
                        </h1>
                        <button className='mb-4 w-100 gradient-custom-4 border border-dark
                     p-2 rounded bg-blue-700 text-2xl text-light'
                            type='submit' >Register</button>
                    </MDBCardBody>
                </MDBCard>
            </form>
        </MDBContainer >
    );
}

export default Register;