'use client';
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { apiClient } from "./eden";

export function useCanAccess(permission: string) {
    const { data: session } = useSession();
    const [canAccess, setCanAccess] = useState(false);

    const {
        data
    } = useQuery({
        queryKey: ["check-permission", session?.accessToken],
        queryFn: async () => {
            const {
                data
            } = await apiClient.api.users.my_permissions.get({
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            })

            return data;
        },
    });

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setCanAccess(data.includes(permission));
        }
    }, [data, permission]);

    return canAccess;
}
