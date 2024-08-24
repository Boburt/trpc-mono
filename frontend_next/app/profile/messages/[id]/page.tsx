"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Send } from "lucide-react";

interface FormValues {
  text: string;
}

export default function ProfileMessagesPage({
  params: { id: conversationId },
}: {
  params: { id: string };
}) {
  const { data: session } = useSession();
  const parentRef = useRef<HTMLDivElement>(null);
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
    return process.env.NEXT_PUBLIC_WSS_URL + "?token=" + session?.accessToken;
  }, [session?.accessToken]);
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    sendJsonMessage({
      conversation_id: conversationId,
      message: data.text,
      type: "publish",
    });
    reset();
  };

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
      <ScrollShadow
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
      </ScrollShadow>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-2 items-center">
          <Input
            size="md"
            type="text"
            placeholder="Напишите сообщение"
            {...register("text", {
              required: "Message is required",
              minLength: { value: 3, message: "Слишком короткое сообщение" },
            })}
          />
          {errors.text && <span>{errors.text.message}</span>}
          <Button isIconOnly color="primary" type="submit">
            <Send />
          </Button>
        </div>
      </form>
    </div>
  );
}
