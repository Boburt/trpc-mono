import Uploady, {
  useRequestPreSend,
  UPLOADER_EVENTS,
  BatchItem,
  useItemProgressListener,
} from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { UploadCloudIcon } from "lucide-react";
import { Progress } from "@admin/components/ui/progress";
import { trpc } from "@admin/utils/trpc";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";
import { useQuery } from "@tanstack/react-query";

const UploadProgress = () => {
  const progressData = useItemProgressListener();
  if (progressData) {
    return <Progress value={progressData.completed} />;
  } else {
    return null;
  }
};

const UploadContainer = ({
  model,
  model_id,
  token,
  code,
  path,
}: {
  model: string;
  model_id?: string;
  token?: string;
  code?: string;
  path?: string;
}) => {
  useRequestPreSend(({ items }) => {
    const documentName = items[0].file.name;

    return {
      options: {
        destination: {
          params: {
            name: documentName,
            model,
            model_id,
            code,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        inputFieldName: "file",
      },
    };
  });

  return (
    <div className="w-full h-28 bg-gray-400 rounded-xl border-2 px-4 border-dashed border-white flex justify-around items-center relative">
      <div>
        <UploadCloudIcon className="w-12 h-12 mx-auto" />
        <div className="font-bold uppercase">Upload Here</div>
        <UploadProgress />
      </div>
      {path && (
        <div className="absolute bg-white left-2 overflow-hidden rounded-full top-1">
          <img src={path} className="aspect-square h-24" />
        </div>
      )}
    </div>
  );
};

export default function FileUploadField({
  model,
  model_id,
  code,
  onValueChange,
}: {
  model: string;
  model_id?: string;
  code?: string;
  onValueChange: (value: string) => void;
}) {
  const token = useToken();
  const [path, setPath] = useState<string | undefined>(undefined);

  const listeners = useMemo(
    () => ({
      //add a param (request field) that will be sent to the serve alongside the uploaded file
      [UPLOADER_EVENTS.ITEM_FINISH]: (item: BatchItem) => {
        //returned object can be wrapped with a promise
        if (item.uploadResponse?.data?.id) {
          const responseData = item.uploadResponse?.data;
          setPath(
            (value) =>
              `${process.env.TRPC_API_URL}/public/${responseData?.path}/${responseData?.id}/${responseData?.name}`
          );
          onValueChange(responseData?.id);
        }
      },
    }),
    [onValueChange]
  );

  const queryParams = {
    limit: "1",
    offset: "0",
    fields: "id,name,path,model,model_id,code",
    filters: JSON.stringify([
      {
        field: "model",
        operator: "=",
        value: model,
      },
      {
        field: "model_id",
        operator: "=",
        value: model_id,
      },
      {
        field: "code",
        operator: "=",
        value: code,
      },
      {
        field: "path",
        operator: "=",
        value: "sources",
      },
    ]),
  };

  const { data: assetsData, isLoading } = useQuery({
    enabled: !!token && !!model_id,
    gcTime: 1,
    staleTime: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
    queryKey: ["manufacturer_assets", queryParams],
    queryFn: async () => {
      const { data } = await apiClient.api.assets.get({
        $query: queryParams,
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    if (assetsData?.data && assetsData?.data[0]) {
      setPath(
        `${process.env.TRPC_API_URL}/public/${assetsData.data[0]?.path}/${assetsData.data[0]?.id}/${assetsData.data[0]?.name}`
      );
    }
  }, [assetsData?.data]);

  return (
    <div>
      {token && (
        <Uploady
          destination={{
            url: `${process.env.TRPC_API_URL}/upload-assets`,
            params: {
              model: "",
              model_id: "",
              name: "",
              code: "",
            },
          }}
          method="POST"
          multiple={false}
          listeners={listeners}
        >
          <UploadDropZone
            className="upload-dropzone"
            onDragOverClassName="drag-over"
            grouped={false}
          >
            <UploadContainer
              model={model}
              model_id={model_id}
              token={token}
              path={path}
              code={code}
            />
          </UploadDropZone>
        </Uploady>
      )}
    </div>
  );
}
