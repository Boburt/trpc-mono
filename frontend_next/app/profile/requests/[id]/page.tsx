import { auth } from "@frontend_next/auth";
import { apiClient } from "@frontend_next/lib/eden";

export default async function ProfileRequestsDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const { data: spTicket } = await apiClient.api.sp_tickets({ id }).get({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (spTicket && "id" in spTicket) {
    return (
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] w-full">
        <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-slate-900 dark:border-gray-700">
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            {spTicket.name}
          </p>
        </div>
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {spTicket.name}
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {spTicket.description}
          </p>
        </div>
      </div>
    );
  } else {
    // render beautiful not found message
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Not found</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Request not found
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
