'use client'

import { FormEvent, useContext } from "react";
import { AuthContext } from "../_context/provider";
import { useRouter } from "next/navigation";
import { ToastContext, ToastIntent } from "@/app/(components)/toast/context";

function Signup() {
  const ctx = useContext(AuthContext);
  const toastCtx = useContext(ToastContext);
  const router = useRouter();

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          username: target.username.value,
          password: target.password.value
        })
      });
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      if(data.success) {
        ctx.loginUser(target.username.value);
        toastCtx.showToast({message: 'User Created', intent: ToastIntent.SUCCESS, delay: 2})
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toastCtx.showToast({message: 'User Creation Failed', intent: ToastIntent.ERROR, delay: 2})
    }

  }

  return (
    <form className="flex flex-col h-full justify-center px-[30%]" onSubmit={submitFormHandler}>
      <h1 className="text-4xl mb-[3rem] text-center">Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username" name="username" type="text" className="mb-[3rem] text-black p-[0.2rem]"/>
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" className="mb-[3rem] text-black p-[0.2rem]"/>
      <button className="border border-white w-[10rem] py-[0.4rem] mx-auto hover:bg-white/50">Confirm</button>
    </form>
  )
};

export default Signup;