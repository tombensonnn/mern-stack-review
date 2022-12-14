import React,{useState,useEffect} from 'react'
import {MDBCard,MDBCardBody,MDBInput, MDBCardFooter,MDBValidation,MDBBtn,MDBIcon,MDBSpinner} from "mdb-react-ui-kit"
import {Link , useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {toast} from "react-toastify"
import { login } from '../redux/features/authSlice'

// import { login , googleSignIn} from '../redux/features/authSlice'
// import {GoogleLogin} from "react-google-login"

const initialState={
    email:"",
    password:"",
}

function Login() {
    const [formValue,setFormValue]=useState(initialState);
    const {loading,error} = useSelector((state) => ({...state.auth}))

    const {email,password} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    }, [error])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password){
            dispatch(login({formValue,navigate,toast}))
        }

    }

    const onInputChange = (e) => {
        let {name,value} = e.target;
        setFormValue({...formValue,[name]:value})

    }

    // const googleOnSuccess = (resp) => {
    //     const email = resp?.profileObj?.email;
    //     const name = resp?.profileObj?.name;
    //     const token = resp?.tokenId;
    //     const googleId = resp?.googleId;
    //     const result = { email, name, token, googleId };
    //     dispatch(googleSignIn({ result, navigate, toast }));
    //     console.log(resp)
    //   };
    //   const googleOnFailure = (error) => {
    //     toast.error(error);
    //   };


    //   const profile = localStorage.getItem("profile")
    //   if(profile){
    //     navigate("/")
    //   }

    useEffect(() => {
        const profile = localStorage.getItem("profile")
          if(profile){
            navigate("/")
          }
        }, [navigate])

  return (

    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon="user-circle" className='fa-2x' style={{marginTop:"10px",color:"#203a43"}} />
            <h5>Giri?? Yap</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>

                    <div className='col-md-12'>
                        <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required invalid validation="Please provide your email" />
                    </div>

                    <div className='col-md-12'>
                        <MDBInput label="??ifre" type="password" value={password} name="password" onChange={onInputChange} required invalid validation="Please provide your password" />
                    </div>

                    <div className='col-12'>
                        <MDBBtn style={{width:"100%"}} className="mt-2">
                            {loading ? (
                                <MDBSpinner size='sm' role="status" tag="span" className='me-2' /> 
                            ) : "Giri?? Yap"}
                        </MDBBtn>
                    </div>

                </MDBValidation>
                {/* <br/> */}

                {/* <GoogleLogin 
                clientId="55144607704-9b857eim1h88bg044fr8pdvbgecaup3j.apps.googleusercontent.com" 
                render={(renderProps) => (
                    <MDBBtn style={{width:"100%"}}  
                    color="danger" 
                    onClick={(renderProps.onClick)} 
                    disabled={renderProps.disabled}>
                        <MDBIcon className='me-2' fab icon='google' /> Google Sign In
                    </MDBBtn>
                )}
                onSuccess={googleOnSuccess}
                onFailure={googleOnFailure}
                cookiePolicy="single_host_origin"
                 /> */}

            </MDBCardBody>

            <MDBCardFooter>
                <Link to="/register">
                    <p style={{margin:"0px"}}>Hesab??n yok mu? Kay??t ol</p>
                </Link>
                <hr style={{margin:"8px",color:"blue"}}/>
                <Link to="/forgotPassword">
                    <p style={{margin:"0px"}}>??ifreni mi unuttun?</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Login