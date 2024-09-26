import { useEffect, useRef } from "react"
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
const options = [
  { label: "German", value: "de" },
  { label: "French", value: "fr" },
];
function ChangePassword(props) {
  const { userData , updateLang} = props

  const [selected, setSelected] = useState(options);
  let userLangs = options.filter((lang)=>{
    return userData.langs.split(",").includes(lang.value)
  })
  useEffect(()=>{
    setSelected(()=> userLangs)
  },[])
  let name = useRef('')
  const add = () =>{
    if(name.current.value == '') return toast.error("Please enter a password", {
      position: "top-center"
    });
    if(name.current.value.length < 8) return toast.error("Password should a min of 8 chars", {
      position: "top-center"
    });
    props.onModalData({
      password:name.current.value,
    })
  }
  return (
  <div>
   <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform  rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <center className="mt-4">{userData.username}</center>
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                    Languages
                  </label>
                </div>
                <div className="md:w-2/3">
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                    hasSelectAll={false}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button onClick={()=>updateLang(selected)} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Update Languages</button>
              <button onClick={()=>{props.setModal(false)}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input ref={name} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="New Password" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button onClick={add} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Change Password</button>
              <button onClick={()=>{props.setModal(false)}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ChangePassword