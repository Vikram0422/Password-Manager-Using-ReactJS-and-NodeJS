import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef(null);

    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/get")
        let passwords = await req.json()
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getpasswords()
    }, [])

    const copyText = (text) => {
        toast('copy to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }


    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? 'password' : 'text';
        }
    };

    const saveform = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            
            await fetch("http://localhost:3000/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            await fetch("http://localhost:3000/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            setform({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            toast('Password not saved!');
        }
    }

    const editform = (id) => {
        setform({...passwordArray.filter(item => item.id === id)[0], id: id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deleteform = async (id) => {
        let c = confirm("Do you really want to Delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch("http://localhost:3000/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHovermmmmmmmmmmmmm
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className='pt-4 md:mycontainer min-h-[84.5vh]'>
                <h1 className='text-4xl text-center font-bold'>
                    <span className='text-green-500'> &lt;</span>
                    <span>Key</span>
                    <span className='text-green-500'>Pod&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>
                <div className='text-black flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className="rounded-full border border-green-500 w-full p-4 py-1" name='site' id='site' type="text" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className="rounded-full border border-green-500 w-full p-4 py-1" name='username' id='username' type="text" />
                        <div className='relative'>
                            <input
                                value={form.password}
                                ref={passwordInputRef}
                                onChange={handlechange}
                                placeholder='Enter Password'
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                name='password'
                                id='password'
                                type="password"
                            />
                            <span
                                className='absolute right-2 top-[0.30rem] cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                    </div>
                    <button onClick={saveform} className='flex justify-center items-center gap-2 bg-green-400 w-fit px-8 py-2 hover:bg-green-300 rounded-full border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save
                    </button>
                </div>
                <div className="passwords px-4">
                    <h2 className='font-bold text-2xl py-4'>Your Details</h2>
                    {passwordArray.length === 0 && <div>No Details to show</div>}
                    {passwordArray.length != 0 && <div className="overflow-x-auto"><table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center border border-white py-2 '>
                                        <a href={item.site} target='_blank' className="flex items-center justify-center">
                                            <span>{item.site}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    trigger="hover"
                                                    stroke="bold">
                                                </lord-icon>
                                            </div>
                                        </a>
                                    </td>
                                    <td className='text-center border border-white py-2 '>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    trigger="hover"
                                                    stroke="bold">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center border border-white py-2 '>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    trigger="hover"
                                                    stroke="bold">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center border border-white py-2 '>
                                        <span className='cursor-pointer mx-1' onClick={() => { editform(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/ghhwiltn.json"
                                            style={{ "width": "25px", "height": "25px" }}
                                            trigger="hover"
                                            stroke="bold"
                                        >
                                        </lord-icon></span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deleteform(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/drxwpfop.json"
                                            style={{ "width": "25px", "height": "25px" }}
                                            trigger="hover"
                                            stroke="bold">
                                        </lord-icon></span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Manager
