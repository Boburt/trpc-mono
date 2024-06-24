import { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}
export default function ProfileLayout({
  children,
  sidebar,
}: ProfileLayoutProps) {
  return (
    <div className="flex space-x-6">
      {sidebar && <div>{sidebar}</div>}
      <div className="w-full">{children}</div>
    </div>
  );
}
