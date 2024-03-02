"use client";

import {
  MultiImageDropzoneTwoSingle,
  type FileState,
} from "@/components/MultiImageDropzoneTwoSingle";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useState,
} from "react";

export function MultiImageDropzoneUsageTwoSingle({
  fileStates,
  setFileStates,
  startTransition,
}: {
  fileStates: FileState[];
  startTransition: TransitionStartFunction;

  setFileStates: Dispatch<SetStateAction<FileState[]>>;
}) {
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (fileStates[0] && fileStates[0].progress === "PENDING")
      console.warn(fileStates);
    if (fileStates[0] && fileStates[0].progress === "COMPLETE")
      console.warn(fileStates);
  }, [fileStates]);

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  function updateFileProgressAndUrlAndName(
    key: string,
    url: string,
    progress: FileState["progress"]
  ) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
        const name = extractNameFromUrl(url);
        fileState.file = url;
        fileState.key = name ? name : fileState.key;
      }
      return newFileStates;
    });
  }

  function extractNameFromUrl(url: string) {
    const filename = url.split("/").pop()?.split(".")[0];
    if (filename) return filename;
  }

  return (
    <div>
      <MultiImageDropzoneTwoSingle
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 1,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFileRemoved={async (removedFile) => {
          setFileStates((prev) =>
            prev.filter((v) => v.key !== removedFile.key)
          );
          startTransition(async () => {
            try {
              const res = await edgestore.publicFiles.delete({
                url: removedFile.file as string,
              });
            } catch (err) {
              console.log(err);
            }
          });
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          startTransition(async () => {
            await Promise.all(
              addedFiles.map(async (addedFileState) => {
                try {
                  const res = await edgestore.publicFiles.upload({
                    file: addedFileState.file as File,
                    onProgressChange: async (progress) => {
                      updateFileProgress(addedFileState.key, progress);
                      if (progress === 100) {
                        // wait 1 second to set it to complete
                        // so that the user can see the progress bar at 100%

                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        updateFileProgressAndUrlAndName(
                          addedFileState.key,
                          res.url,
                          "COMPLETE"
                        );
                      }
                    },
                    options: {
                      temporary: true,
                    },
                  });
                } catch (err) {
                  updateFileProgress(addedFileState.key, "ERROR");
                }
              })
            );
          });
        }}
      />
    </div>
  );
}
