import { ChatBubblesProviders } from "./chat-bubbles";

export default function ProfileRequestsDetailMessagesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="bg-gray-100 border-b rounded-t-xl pt-3 px-4 md:pt-4 md:px-5 dark:bg-slate-800 dark:border-gray-700">
          <nav className="flex space-x-2" aria-label="Tabs">
            <a
              className="-mb-px py-3 px-4 bg-white text-sm font-medium text-center border border-b-transparent text-gray-500 rounded-t-lg hover:text-gray-700 focus:z-10 dark:bg-slate-900 dark:border-gray-700 dark:border-b-gray-800 dark:hover:text-gray-400"
              href="#"
            >
              Comments
            </a>
          </nav>
        </div>
        <div className="p-4 text-center md:py-7 md:px-5">
          <ChatBubblesProviders ticket_id={id} />
        </div>
      </div>
    </div>
  );
}
