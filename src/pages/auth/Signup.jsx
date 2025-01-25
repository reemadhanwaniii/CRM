import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {signup} from '../../Redux/Slices/AuthSlice';

function Signup() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [signupDetails, setSignupDetails] = useState({
        email: '',
        password: '',
        name: '',
        userType: '',
        userStatus: '',
        clientName: ''
    });
    

    function resetSignupState(){
        setSignupDetails({
            email: '',
            password: '',
            name: '',
            userType: '',
            userStatus: '',
            clientName: ''
        });
    }



    async function onSubmit() {
        if(!signupDetails.email || 
            !signupDetails.password || 
            !signupDetails.clientName || 
            !signupDetails.userStatus || 
            !signupDetails.name || 
            !signupDetails.userType) return;
         const response = await dispatch(signup(signupDetails));
         console.log(response);
         if(response.payload) navigate('/login');
        else resetSignupState();
    }

    function handleInputChange(e) {
        const {name,value} = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    }


    function handleUserType(e) {
        const userTypeSelected = e.target.textContent;
        setSignupDetails({
            ...signupDetails,
            userType: userTypeSelected,
            userStatus: (userTypeSelected === 'customer')?'approved':'suspended',
        });
        const dropdown = document.getElementById("userTypeDropdown");
        dropdown.open = !dropdown.open;
    }

    return(
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center"><h2 className="card-title text-white text-3xl">Signup</h2></div>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            name="name"
                            autoComplete="one-time-code"
                            type="text"
                            placeholder="name"
                            value={signupDetails.name}
                            className="input input-bordered input-primary text-white w-full max-w-xs" 
                         />
                    </div>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            name="email"
                            autoComplete="one-time-code"
                            type="text"
                            placeholder="email"
                            value={signupDetails.email}
                            className="input input-bordered input-primary text-white w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            name="password"
                            autoComplete="one-time-code"
                            type="password"
                            placeholder="password"
                            value={signupDetails.password}
                            className="input input-bordered input-primary text-white w-full max-w-xs" 
                         />
                    </div>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            name="clientName"
                            autoComplete="one-time-code"
                            type="text"
                            placeholder="clientName"
                            value={signupDetails.clientName}
                            className="input input-bordered input-primary text-white w-full max-w-xs" 
                         />
                    </div>
                    
                    <details className="dropdown" id="userTypeDropdown">
                        <summary className="btn m-1">{(!signupDetails.userType)?'User Type':signupDetails.userType}</summary>
                        <ul onClick= {handleUserType} className="menu dropdown-content bg-base-100 text-white rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>customer</a></li>
                            <li><a>engineer</a></li>
                            <li><a>admin</a></li>
                        </ul>
                    </details>
               
                    <div className="card-actions w-full mt-4">
                    <button onClick={onSubmit} className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">Submit</button>
                    </div>
                    <p className="text-l text-white">
                        Already have an account ? <Link className="text-yellow-200 font-semibold hover:text-white" to="/login">Login Instead</Link>
                    </p>
                </div>
            </div>
        </div>
    
    );
}

export default Signup;