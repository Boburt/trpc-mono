"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileData } from "../sign-up/queries";
import { useSession } from "next-auth/react";
import { InferSelectModel } from "drizzle-orm";
import ProfileCard from "@frontend_next/app/profile/card/profile-card";

export default function Profile() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data: profileInfo } = useQuery({
    queryKey: ["profile_info"],
    queryFn: async () => await getProfileData(session?.accessToken!),
    enabled: !!session?.accessToken,
  });

  return (
    <div>
      <ProfileCard />
    </div>
  );
}
