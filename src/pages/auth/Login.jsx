function Login() {
    return(
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center"><h2 className="card-title text-white text-3xl">Login</h2></div>
                    <div className="w-full">
                        <input
                            autoComplete="one-time-code"
                            type="text"
                            placeholder="user id ..."
                            className="input input-bordered input-primary text-white w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full">
                        <input
                            autoComplete="one-time-code"
                            type="password"
                            placeholder="password ..."
                            className="input input-bordered input-primary text-white w-full max-w-xs" 
                         />
                    </div>
               
                    <div className="card-actions w-full mt-4">
                        <button className="btn btn-warning w-full font-bold hover:bg-accent text-xl">Login</button>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default Login;