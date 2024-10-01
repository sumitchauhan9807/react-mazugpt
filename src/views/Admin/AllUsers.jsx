import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from 'src/components/Admin/Breadcrumb'
import {UIBtn} from 'src/components/UI/CommonUi'
import axios from 'src/axios'
import ChangePassword from 'src/components/Admin/ChangePassword'
import { toast } from "react-toastify";
const options = [
  { label: "German", value: "de" },
  { label: "French", value: "fr" },
  { label: "English", value: "en" },
];


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

  const updateUserLang = async (operation,value) => {
    console.log(operation,value)
    // if(!data.length) return toast.error(`Please select a language`);
    try {
      await axios.patch(`/admin/operation-langs/${activeRow.id}`,{
        lang:value[operation],
        operation:operation
      })
      toast.success(`Language Updated for ${activeRow.username} Successfully !!`);
      fetchAllUsers()
      // setModal(false)
    }catch(e) {
      alert(e)
    }
  }

  // const updateUserLang = async (data) => {
  //   if(!data.length) return toast.error(`Please select a language`);
  //   try {
  //     await axios.patch(`/admin/lang/${activeRow.id}`,{
  //       lang:data.map(lang => lang.value).join(",")
  //     })
  //     toast.success(`Language Updated for ${activeRow.username} Successfully !!`);
  //     fetchAllUsers()
  //     setModal(false)
  //   }catch(e) {
  //     alert(e)
  //   }
  // }
  return (
    <>
    <BreadCrumb
      path={['Admin','All Users']}
      text={'All Users'}
    /> 
    {showPasswordModal && <ChangePassword
      setModal={setModal}
      onModalData={changeUserPassword}
      userData={activeRow}
      updateLang={updateUserLang}
    />}

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            First Operation Lang
          </th>
          <th scope="col" className="px-6 py-3">
            Second Operation Lang
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
                { options.find(l => l.value == user.first_operation_lang).label  }
              </td>
              <td className="px-6 py-4">
              { options.find(l => l.value == user.second_operation_lang).label  }
              </td>
            
              <td className="px-6 py-4">
                <UIBtn onClick={()=>deleteUser(user)} text={'Delete'}></UIBtn> &nbsp;
                <UIBtn onClick={() => { setActiveRow(user);setModal(true) }} text={'Settings'}></UIBtn>
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