import { Button } from "@nextui-org/button";
import { ScrollArea } from "../ui/scroll-area";
import { Send } from "lucide-react";
import { Input } from "@nextui-org/input";
import { useCookieState } from "use-cookie-state";
import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useForm } from "@tanstack/react-form";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import dayjs from "dayjs";

export const ConversationMessagesList = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const [messageHistory, setMessageHistory] = useState<
    {
      id: string;
      message: string;
      sent_at: string;
      user: {
        id: string;
        first_name: string | null;
        last_name: string | null;
      } | null;
      type: string;
    }[]
  >([]);
  const getSocketUrl = useCallback(() => {
    return import.meta.env.PUBLIC_WSS_URL + "?token=" + accessToken;
  }, [accessToken]);
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    readyState,
    lastJsonMessage,
    getWebSocket,
  } = useWebSocket<{
    id: string;
    message: string;
    sent_at: string;
    user: {
      id: string;
      first_name: string | null;
      last_name: string | null;
    } | null;
    type: string;
  }>(getSocketUrl, {
    onOpen(event) {
      sendJsonMessage({
        conversation_id: conversationId,
        message: "start",
        type: "subscribe",
      });
    },
  });

  const form = useForm<{
    text: string;
  }>({
    defaultValues: {
      text: "",
    },
    onSubmit: async ({ value }) => {
      sendJsonMessage({
        conversation_id: conversationId,
        message: value.text,
        type: "publish",
      });
      form.reset();
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.type === "message") {
        setMessageHistory((prev) => prev.concat(lastJsonMessage));
      }
    }
  }, [lastJsonMessage, setMessageHistory]);

  const virtualizer = useVirtualizer({
    count: messageHistory.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div className="h-full flex flex-col space-y-2">
      <ScrollArea
        className="h-auto flex-1 w-full rounded-md border p-4"
        ref={parentRef}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
            className="space-y-4"
          >
            {items.map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className="flex justify-end"
              >
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-300 bg-gray-200 rounded-s-xl rounded-ee-xl rounded-ss-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {messageHistory[virtualRow.index].user && (
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {messageHistory[virtualRow.index].user!.first_name}{" "}
                        {messageHistory[virtualRow.index].user!.last_name}
                      </span>
                    )}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {dayjs(messageHistory[virtualRow.index].sent_at).format(
                        "DD.MM.YYYY HH:mm:ss"
                      )}
                    </span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {messageHistory[virtualRow.index].message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className="flex space-x-2 items-center">
            <form.Field
              name="text"
              validators={{
                onChange({ value }) {
                  if (value.length < 3) {
                    return "Слишком короткое сообщение";
                  }
                },
              }}
            >
              {(field) => (
                <>
                  <Input
                    size="md"
                    type="text"
                    placeholder="Напишите сообщение"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>
            <Button isIconOnly color="primary" type="submit">
              <Send />
            </Button>
          </div>
        </form>
      </form.Provider>
    </div>
  );
};
