import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router';
import axios from 'src/axios'
import { toast } from "react-toastify";
import { useRef, useState } from "react";


const AddUser = () => {
	const [isSubmitting,setIsSubmitting] = useState(false)
  const [text,setText] = useState()
  let toTranslateText = useRef(null)

  const getTranslation = async () => {
    try {
      if(!toTranslateText.current.value) return toast.error("Please enter text");
      setIsSubmitting(true)
      let { data } = await axios.post('/admin/huggingface-test',{
        text:toTranslateText.current.value
      })
      if(data?.data?.translation_text) {
        setText(`Translated Text  : ${data?.data?.translation_text}`)
      }else {
        alert("there was an error")
      }
      setIsSubmitting(false)
    console.log(data)
    }catch(e) {
      setIsSubmitting(false)
      alert(e)
    }
  }

  return (
    <>
        <div className="flex flex-wrap -mx-3 mb-6 p-4">
          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              HUGGING FACE TEST
            </label>
            <textarea  ref={toTranslateText} className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Input text here" ></textarea>
          </div>
            <button onClick={() => getTranslation()} disabled={isSubmitting} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
          {isSubmitting ? "Loading..." : "Submit"}
         </button>
        </div>
          <p>{text}</p>
    </>
  )

 
};

export default AddUser;