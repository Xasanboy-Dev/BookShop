import { async } from "@firebase/util"
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signInWithCredential } from "firebase/auth"
import { useState } from "react"
import { LoginFile } from "../../TypescriptFiles/Auth"

export default function Login() {
  function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = LoginFile(email, password)
    result.then(res => {
      if (res == 200) {
        return window.location.href = '/'
      } else {
        alert(res.response.data.message)
      }
    })
  }

  const auth = getAuth()

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  const signInWithGitHub = async () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then(res => {
        console.log(res.user)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  const signInWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(res => {
        setEmail(res.user.email!)
        setPassword(res.user.uid)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <section className=" text-center">
        <div className=" p-5 bg-image div "></div>
        <div className=" card div1 mx-4  mx-md-5 shadow-5-strong">
          <div className=" card-body py-5  px-md-5">
            <div className=" row d-flex justify-content-center">
              <div className=" col-lg-8">
                <h2 className="fw-bold mb-5">Log in now</h2>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => Submit(e)}>
                  <div className="form-outline mb-4">
                    <input type="email" id="form3Example3" value={email} onChange={(e) => (setEmail(e.target.value))} className="form-control" />
                    <label className="form-label" vocab={email} htmlFor="form3Example3">Email address</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" id="form3Example4" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" />
                    <label className="form-label" htmlFor="form3Example4" >Password</label>
                  </div>
                  <div className="my-3 text-2xl">
                    <h1 className="block">You can also log in with:</h1>
                    <ul className="flex justify-content-center">
                      <li onClick={() => signInWithGoogle()}>
                        <i className="bi bi-google"></i>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-content-center gap-5">
                    <a href={`/register`} className="text-light btn btn-primary  btn-block mb-4">
                      Register
                    </a>
                    <button type="submit" className="text-dark btn btn-primary btn-block mb-4">
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section >
    </div >
  )
}