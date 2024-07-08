"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileData } from "../sign-up/queries";
import { useSession } from "next-auth/react";
import { InferSelectModel } from "drizzle-orm";
import ProfileCard from "@frontend_next/app/profile/card/profile-card";
import { useRouter } from "next/navigation";

export default function Profile() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const router = useRouter();

  const { data: profileInfo } = useQuery({
    queryKey: ["profile_info"],
    queryFn: async () => await getProfileData(session?.accessToken!),
    enabled: !!session?.accessToken,
  });

  if (
    profileInfo &&
    profileInfo.data &&
    Array.isArray(profileInfo.data) &&
    !profileInfo.data.length
  ) {
    return router.push("sign-up");
  }

  return (
    <div>
      <ProfileCard />
    </div>
  );
}
