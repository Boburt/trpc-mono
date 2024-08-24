"use server";

import { signOut } from "@frontend_next/auth";
import { redirect } from "next/navigation";

export const logout = async () => {

    await signOut();
    redirect("/");
};