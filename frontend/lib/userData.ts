import { $userData } from "@frontend/src/store/auth";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

export function useUserData() {
    const [user, setUser] = useState(null);
    const userData = useStore($userData);

    useEffect(() => {
        if (globalThis.window) {
            setUser(userData);
        } else {
            const accessToken = globalThis.astroAccessToken;
        }
    }, [])


    return user;
}