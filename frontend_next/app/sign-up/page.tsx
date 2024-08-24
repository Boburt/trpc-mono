"use client";

import { StepperOrientation } from "@frontend_next/components/stepper/examples";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getProfileData } from "./queries";

export default function SignUpPage() {
  const { data: session } = useSession();
  const { data: profileData } = useQuery({
    queryKey: ["profile_data"],
    queryFn: async () => await getProfileData(session?.accessToken!),
    enabled: !!session?.accessToken,
  });

  return <StepperOrientation />;
}
