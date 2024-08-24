import { Suspense } from "react";

export default function ProfileRequestsLayout({
  children,
  timeline,
  messages,
}: {
  children: React.ReactNode;
  timeline: React.ReactNode;
  messages: React.ReactNode;
}) {
  return (
    <div className="flex justify-around">
      <div className="space-y-3 w-7/12">
        {children}
        {/* <TextSenderCard ticketId={id} /> */}
        <Suspense>{messages}</Suspense>
      </div>

      {/* <Timeline timeline={spTicketTimeline} /> */}
      <Suspense>{timeline}</Suspense>
    </div>
  );
}
