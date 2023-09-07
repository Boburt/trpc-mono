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
  const { data: session } = useSession();
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

  const { data: assetsData } = trpc.assets.list.useQuery(
    {
      where: {
        model,
        model_id,
        code,
      },
    },
    {
      enabled: !!model_id,
      cacheTime: 1,
      staleTime: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
    }
  );

  useEffect(() => {
    if (assetsData?.items && assetsData?.items[0]) {
      setPath(
        `${process.env.TRPC_API_URL}/public/${assetsData.items[0]?.path}/${assetsData.items[0]?.id}/${assetsData.items[0]?.name}`
      );
    }
  }, [assetsData?.items]);

  return (
    <div>
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
            token={session?.accessToken}
            path={path}
            code={code}
          />
        </UploadDropZone>
      </Uploady>
    </div>
  );
}
