import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router';
import axios from 'src/axios'
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(5),
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
});



const AddUser = () => {
	const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    // defaultValues: {
    //   email: "test@email.com",
    // },
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData) => {
    try {
      let { data } = await axios.post('/admin/create-user',{
        username:formData.username,
        password:formData.password,
        email:formData.email,
        name:formData.name
      })
      toast.success("User Created Successfully !", {
        position: "top-center"
      });
      navigate('/admin/allusers')
    } catch (e) {
      
      let error = 'Error'
      if(e?.response?.data?.message) {
        error = e?.response?.data?.message
        if(error.includes('duplicate')) {
          error = 'Either username or email is already taken'
        }
      }
      console.log(e)
      setError("root", {
        message: error,
      });
      toast.error(error, {
        position: "top-center",
        autoClose:1000
      });
    }
  };

  return (
    <>
    <form  onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Name
            </label>
            <input {...register("name")} className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p> }
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Username
            </label>
            <input {...register("username")} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p> }
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Email
            </label>
            <input {...register("email")} className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p> }
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
            </label>
            <input {...register("password")} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="***" />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p> }
          </div>
        </div>
        <button disabled={isSubmitting} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" type="submit">
         {isSubmitting ? "Loading..." : "Submit"}
      </button>
          {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
    </>
  )

  // return (
  //   <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
  //     <input {...register("email")} type="text" placeholder="Email" />
  //     {errors.email && (
  //       <div className="text-red-500">{errors.email.message}</div>
  //     )}
  //     <input {...register("password")} type="password" placeholder="Password" />
  //     {errors.password && (
  //       <div className="text-red-500">{errors.password.message}</div>
  //     )}
  //     <button disabled={isSubmitting} type="submit">
  //       {isSubmitting ? "Loading..." : "Submit"}
  //     </button>
  //     {errors.root && <div className="text-red-500">{errors.root.message}</div>}
  //   </form>
  // );
};

export default AddUser;