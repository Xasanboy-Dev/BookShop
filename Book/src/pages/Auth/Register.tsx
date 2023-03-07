import React from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { RegisterFile } from "./../../TypescriptFiles/Auth"
function Register() {
    let name: string
    let surname: string
    let email: string
    let password: string
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const answer = RegisterFile(name, surname, email, password)
    }
    return (
        <MDBContainer fluid style={{ height: window.innerHeight }} className='d-flex align-items-center  justify-content-center bg-purple-900 '>
            <div className='mask gradient-custom-3'></div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}>
                <MDBCard className='m-5' style={{ maxWidth: '1024px' }}>
                    <MDBCardBody className='px-[60px]'>
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                        <MDBInput wrapperClass='mb-4' onChange={(e) => (name = e.target.value)} label='Your Name' size='lg' id='form1' type='text' />
                        <MDBInput wrapperClass='mb-4' onChange={(e) => (surname = e.target.value)} label='Your Surname' size='lg' id='form1' type='text' />
                        <MDBInput wrapperClass='mb-4' onChange={(e) => (email = e.target.value)} label='Your Email' size='lg' id='form2' type='email' />
                        <MDBInput wrapperClass='mb-4' onChange={(e) => (password = e.target.value)} label='Password' size='lg' id='form3' type='password' />
                        <button className='mb-4 w-100 gradient-custom-4 border border-dark
                     p-2 rounded bg-blue-700 text-2xl text-light'
                            type='submit' >Register</button>
                    </MDBCardBody>
                </MDBCard>
            </form>
        </MDBContainer>
    );
}

export default Register;