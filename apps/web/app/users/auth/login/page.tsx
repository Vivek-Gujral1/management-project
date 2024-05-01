
// "use client"
// import { useForm } from "react-hook-form";
// import { getSession, signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation"; // Import useRouter from next/router instead of next/navigation
// import { useDispatch } from "react-redux";
// import { login as authLogin } from "../../../../store/auth/authSlice";
// import { AppDispatch } from "../../../../store/store";


// function page() {
//   const { register, handleSubmit } = useForm();
//   const router = useRouter();
//   const dispatch : AppDispatch = useDispatch();
//   // const { data: session, status } = useSession(); // Call useSession hook directly
  
//   const login = async (data: any) => {
//     console.log(data);
    
//     const res = await signIn("credentials", {
//       redirect: false,
//       email: data.email,
//       password: data.password,
//     });
//     if (!res?.ok) {
//       console.log("something went wrong");
//       return;
//     }
//     console.log("login res", res);
//     const session =  await getSession() 
//     if (!session) {
//       return
//     }
//     const user = session.user
//     console.log( user, "session user");
    
//     if (!user) {
//       return;
//     }
//     dispatch(authLogin(user));
    
//     router.push("/");
//   };
  
//   return (
//     <div>
//       <form onSubmit={handleSubmit(login)}>
//         <input type="text" {...register("email")} />
//         <input type="password" {...register("password")} /> {/* Use type="password" for password input */}
//         <button>Login</button>
//       </form>
//     </div>
//   );
// }

// export default page;
"use client"
import React from 'react'
import LoginForm from '../../../../Components/LoginForm'

function LoginPage() {
  return (
  <LoginForm /> 
  )
}

export default LoginPage

