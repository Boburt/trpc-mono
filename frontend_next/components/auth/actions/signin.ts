'use server';

import { redirect } from "next/navigation";
import { signIn } from "@frontend_next/auth"

export const signInLocal = async (data: {
    login: string;
    password: string;
}) => {
    try {
        const signData = await signIn("credentials", {
            login: data.login,
            password: data.password,
            redirect: false
        });
        console.log("signData", signData);
        if (signData?.error) {
            throw new Error(signData.error);
        }
    } catch (error: any) {
        console.log('auth error', error);
        return { error: error.message || "Произошла ошибка. Пожалуйста, попробуйте снова." };
    }
    redirect("/");
}