import React, { useState, useEffect } from 'react';
import TextSlider from 'src/components/TextAnimation';
import backgroundimage from '../assets/image/bg1.jpg'
import Input from 'src/components/UI/Input'
import {EmailSvg,PasswordSvg} from 'src/components/UI/Svg'
import axios ,{setAxiosToken} from 'src/axios'
import { toast } from "react-toastify";
import {useSelector,useDispatch} from 'react-redux'
import {setUserData} from 'src/redux/user/userActions'
import { useNavigate } from 'react-router';

export const AdminLogin = () => {
  const userData = useSelector((state) => state.user)
  const dispatch = useDispatch()
	const navigate = useNavigate();

  useEffect(()=>{
    if(userData.token) {
      navigate('/admin/dashboard')
    }
  },[userData])

  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")

  const doLogin = async() => {
    try {
      let { data } = await axios.post('/admin/login',{
        username:username,
        password:password
      })
      dispatch(setUserData(data.data,data.token,data.role))
      setAxiosToken(data.token)
      toast.success("Loggedin Successfully !", {
        position: "top-center"
      });
    }catch(e) {
      let error = 'Error'
      if(e?.response?.data?.message) {
        error = e?.response?.data?.message
      }
      toast.error(error, {
        position: "top-center",
        autoClose:1000
      });
    }
  }

  
  return (
    <div className="h-screen flex">
      <div className="relative flex w-1/2 bg-gradient-to-tr from-gray-800 to-gray-700 i justify-around items-center" style={{ backgroundImage: `url(${backgroundimage})`, backgroundSize: 'cover' }}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-gray-900 to-gray-700 opacity-90"></div>
      <div className="relative z-10">
        <TextSlider 
        slides={[
          { title: 'Admin Login', description: ' One of The Best Translation AI  ' },
          // { title: 'Developed By', description: 'Dialogmakers International Ltd' },
        ]}
        />
      </div>
    </div>
    <div className="flex w-1/2 justify-center items-center bg-white">
      <form className="bg-white">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
        <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back To <span className='uppercase font-bold'>MAZU GPT</span> </p>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <EmailSvg/>
          <Input
            onChange={setUserName}
            value={username}
            type={'text'}
            placeholder={'Username'}
          />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
          <PasswordSvg/>
          <Input
            onChange={setPassword}
            value={password}
            type={'password'}
            placeholder={'password'}
          />
        </div>
      <a onClick={(e)=> {e.preventDefault(); doLogin()}}> <button
          type="submit"
          className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          Login
        </button></a> 
        {/* <a onClick={(e)=> {e.preventDefault(); dispatch(logoutUser())}}> <button
          type="submit"
          className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          Login
        </button></a>  */}
      </form>
    </div>
  </div>
  
  );
};

export default AdminLogin;
