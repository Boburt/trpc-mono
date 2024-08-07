"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileData } from "../sign-up/queries";
import { useSession } from "next-auth/react";
import { InferSelectModel } from "drizzle-orm";
import ProfileCard from "@frontend_next/app/profile/card/profile-card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useBreadCrumbs } from "@frontend_next/components/breadcrumbs/breadcrumbs-context";

export default function Profile() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const router = useRouter();

  useBreadCrumbs("Профиль");

  const { data: profileInfo, isLoading } = useQuery({
    queryKey: ["profile_info"],
    queryFn: async () => await getProfileData(session?.accessToken!),
    enabled: !!session?.accessToken,
  });

  console.log(profileInfo);

  useEffect(() => {
    if (
      profileInfo &&
      profileInfo.data &&
      Array.isArray(profileInfo.data) &&
      !profileInfo.data.length
    ) {
      return router.push("sign-up");
    }
  }, [profileInfo, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ProfileCard />
    </div>
  );
}
