import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from 'src/components/Admin/Breadcrumb'
import {UIBtn} from 'src/components/UI/CommonUi'
import axios from 'src/axios'
import ChangePassword from 'src/components/Admin/ChangePassword'
import { toast } from "react-toastify";
function  AllUsers() {
  const [allUsers,setAllUsers] = useState([])
  const [showPasswordModal,setModal] = useState(false)
  const [activeRow,setActiveRow] = useState(null)


  useEffect(()=>{
    fetchAllUsers()
  },[])

  const changeUserPassword = async (data) => {
    console.log(activeRow.username)
    console.log(data)
    try {
      await axios.patch(`/admin/user-password/${activeRow.id}`,{
        password:data.password
      })
      toast.success(`Password Updated for ${activeRow.username} Successfully !!`);
      setModal(false)
    }catch(e) {
      alert(e)
    }
  }

  const fetchAllUsers = async () => {
    try {
      let { data : {data} } = await axios.get('/admin/users')  
      setAllUsers(data)
    }catch(e) {
      alert(e)
    }
  }

  const deleteUser = async (data) => {
    let text = `Are you sure , you want to delete ${data.username}`;
    if (window.confirm(text) == true) {
      try {
        await axios.delete(`/admin/user/${data.id}`)
        toast.success("User deleted successfully");
        fetchAllUsers()
      }catch(e) {
        alert(e)
      }
    }
  }
  return (
    <>
    <BreadCrumb
      path={['Admin','All Users']}
      text={'All Users'}
    /> 
    {showPasswordModal && <ChangePassword
      setModal={setModal}
      onModalData={changeUserPassword}
    />}

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    {/* <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <div>
        <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
          <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
          </svg>
          Last 30 days
          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <div id="dropdownRadio" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden data-popper-escaped data-popper-placement="top" style={{position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate3d(522.5px, 3847.5px, 0px)'}}>
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input id="filter-radio-example-1" type="radio" defaultValue name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input defaultChecked id="filter-radio-example-2" type="radio" defaultValue name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="filter-radio-example-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input id="filter-radio-example-3" type="radio" defaultValue name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="filter-radio-example-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input id="filter-radio-example-4" type="radio" defaultValue name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="filter-radio-example-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input id="filter-radio-example-5" type="radio" defaultValue name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="filter-radio-example-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <label htmlFor="table-search" className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
        </div>
        <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
      </div>
    </div> */}
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Username
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
         
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user)=>{
          return (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </th>
              <td className="px-6 py-4">
                {user.username}
              </td>
              <td className="px-6 py-4">
                {user.email}
              </td>
            
              <td className="px-6 py-4">
                <UIBtn onClick={()=>deleteUser(user)} text={'Delete'}></UIBtn> &nbsp;
                <UIBtn onClick={() => { setActiveRow(user);setModal(true) }} text={'Change Password'}></UIBtn>
              </td>
           </tr>
          )
        })}
      </tbody>
    </table>
   </div>
   <br/>
    <div className="p4">
    <Link  to="/admin/adduser" type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Add New User</Link>
    
    </div>
  </>
  )
}
export default AllUsers