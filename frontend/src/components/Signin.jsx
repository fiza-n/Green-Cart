import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Signin = () => {
 const [state, setState] = React.useState("Signin");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const{setShowUserSignin, setUser, axios} = useAppContext()



    const handleSubmit = async (e) =>{
        try {
            e.preventDefault()
            if(state === "Signin"){

                const { data } = await axios.post("/api/user/signin", {email, password})
                setUser(true)
                toast.success(data.message)
            }
            else{
                const { data } = await axios.post("/api/user/signup", { fullname: name, email, password })
                setUser(true)
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
      
        setShowUserSignin(false)
    }

    return (
<div onClick={()=> setShowUserSignin(false)} className="fixed inset-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50">          
       <form onSubmit={handleSubmit} onClick={(e)=> e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "Signin" ? "Signin" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} name='fullname' placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} name='email' placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} name='password' placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("Signin")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Signin"}
            </button>
        </form>
    
        </div>
    );

}

export default Signin