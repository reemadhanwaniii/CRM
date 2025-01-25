import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {login} from '../../Redux/Slices/AuthSlice';

function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });
    

    function resetLoginState(){
        setLoginDetails({
            email: '',
            password: ''
        });
    }



    async function onSubmit() {
        if(!loginDetails.email || !loginDetails.password) return;
        const response = await dispatch(login(loginDetails));
        console.log(response.payload?.data);
        if(response.payload) navigate('/');
        else resetLoginState();
    }

    function handleInputChange(e) {
        const {name,value} = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value
        });
    }

    return(
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center"><h2 className="card-title text-white text-3xl">Login</h2></div>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            name="email"
                            autoComplete="one-time-code"
                            type="text"
                            placeholder="email ..."
                            value={loginDetails.email}
                            className="input input-bordered input-primary text-white w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            name="password"
                            autoComplete="one-time-code"
                            type="password"
                            placeholder="password ..."
                            value={loginDetails.password}
                            className="input input-bordered input-primary text-white w-full max-w-xs" 
                         />
                    </div>
               
                    <div className="card-actions w-full mt-4">
                    <button onClick={onSubmit} className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">Submit</button>
                    </div>
                    <p className="text-l text-white">
                        Donot have an account ? <Link className="text-yellow-200 font-semibold hover:text-white" to="/signup">Signup Instead</Link>
                    </p>
                </div>
            </div>
        </div>
    
    );
}

export default Login;