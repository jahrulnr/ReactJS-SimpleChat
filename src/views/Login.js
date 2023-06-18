import axios from 'axios'
import toastr from 'reactjs-toastr/lib/react-toast'
import { useEffect, useState } from 'react'
import { AccessToken, Auth } from '../helpers/cookie'
import page from '../helpers/page'
import apiConfig from '../config/api'
import logo from '../assets/reactjs.png'

function Login() {
  new page().setTitle("Login")

  const [dataForm, setDataForm] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setDataForm({
      email: email || document.getElementById('email').value,
      password: password || document.getElementById('password').value
    })
  }, [email, password, dataForm])

  const doLogin = async (form) => {
    form.preventDefault()
  
    const resp = await axios({
      method: 'post',
      url: apiConfig.LOGIN,
      responseType: 'json',
      data: dataForm,
    })

    if(resp.status === 200){
      AccessToken().set(resp.data.token)
      Auth().set(resp.data)

      toastr.success(`Selamat Datang ${Auth().get().name}! Mengalihkan halaman ...`)

      setTimeout(() => window.location.reload(), 2000)
    }
    else if(resp.status === 500) {
      toastr.error(`Server bermasalah`)
    }
    else if(resp.status !== 204 && resp.status !== 500) {
      toastr.error(`Email/Password tidak benar`)
    }
  }

  return (
    <main className="d-flex w-100 h-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">

              <div className="text-center mt-4">
                <img src={logo} className='col-6' alt='Logo'/>
                <p className="lead">
                  Sign in to your account to continue
                </p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <form onSubmit={doLogin}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control form-control-lg" id='email' type="email" ref={(input) => setEmail(input?.value)} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="form-control form-control-lg" id='password' type="password" ref={(input) => setPassword(input?.value)} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <button type='submit' className="btn btn-lg btn-primary">Login</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main> 
  );
}

export default Login;
