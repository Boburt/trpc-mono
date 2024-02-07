import { Button, ButtonGroup } from "@nextui-org/button";
import Providers from "../../store/provider";
import { useCookieState } from "use-cookie-state";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../utils/eden";
import { toast } from "sonner";
import { MessageSquareText } from "lucide-react";

export const ChatNow = ({
  manufacturerId,
  userId,
}: {
  manufacturerId?: string;
  userId?: string;
}) => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const createConversations = useMutation({
    mutationFn: async (newTodo: Record<string, any>) => {
      const { data, error, status } = await apiClient.api.conversations.post({
        manufacturer_id: manufacturerId,
        user_id: userId,
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (status === 200) {
        return data;
      } else {
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      if (data && "id" in data) location.href = `/profile/messages/${data.id}`;
    },
    onError: (error: any) => {
      toast.error(
        error.value && error.value.message
          ? error.value.message
          : JSON.stringify(error.value)
      );
    },
  });
  return (
    <Button
      color="primary"
      variant="solid"
      isLoading={createConversations.isPending}
      startContent={<MessageSquareText />}
      onClick={() => {
        createConversations.mutate({});
      }}
    >
      Написать
    </Button>
  );
};

export const ChatNowProvider = ({
  manufacturerId,
  userId,
}: {
  manufacturerId?: string;
  userId?: string;
}) => {
  return (
    <Providers>
      <ChatNow manufacturerId={manufacturerId} userId={userId} />
    </Providers>
  );
};
