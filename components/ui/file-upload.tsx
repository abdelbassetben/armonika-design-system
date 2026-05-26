"use client";

import { useState, useCallback, forwardRef } from "react";
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

export interface FileUploadItem extends FileWithPreview {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export interface FileUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  value?: FileUploadItem[];
  onChange?: (files: FileUploadItem[]) => void;
  onUpload?: (
    file: File | FileMetadata,
    onProgress: (progress: number) => void,
  ) => Promise<void>;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      maxFiles = 5,
      maxSize = 10 * 1024 * 1024, // 10MB
      accept = "*",
      multiple = true,
      className,
      disabled = false,
      value,
      onChange,
      onUpload,
    },
    ref,
  ) => {
    const [internalFiles, setInternalFiles] = useState<FileUploadItem[]>(
      value || [],
    );
    const uploadFiles = value !== undefined ? value : internalFiles;

    const setUploadFiles = useCallback(
      (
        updater:
          | FileUploadItem[]
          | ((prev: FileUploadItem[]) => FileUploadItem[]),
      ) => {
        if (value === undefined) {
          setInternalFiles(updater);
        }
        if (onChange) {
          onChange(
            typeof updater === "function" ? updater(uploadFiles) : updater,
          );
        }
      },
      [value, onChange, uploadFiles],
    );

    const handleUpload = useCallback(
      async (fileItem: FileUploadItem) => {
        if (!onUpload) return;

        try {
          await onUpload(fileItem.file, (progress) => {
            setUploadFiles((prev) =>
              prev.map((f) =>
                f.id === fileItem.id
                  ? {
                      ...f,
                      progress,
                      status: progress === 100 ? "completed" : "uploading",
                    }
                  : f,
              ),
            );
          });
          // Ensure completion
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? { ...f, progress: 100, status: "completed" }
                : f,
            ),
          );
        } catch (error: any) {
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? {
                    ...f,
                    status: "error",
                    error: error.message || "Upload failed",
                  }
                : f,
            ),
          );
        }
      },
      [onUpload, setUploadFiles],
    );

    const [
      { isDragging },
      {
        removeFile,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        openFileDialog,
        getInputProps,
      },
    ] = useFileUpload({
      maxFiles,
      maxSize,
      accept,
      multiple,
      onFilesChange: (newFiles) => {
        let itemsToUpload: FileUploadItem[] = [];

        const newItems = newFiles.map((file) => {
          const existingFile = uploadFiles.find(
            (existing) => existing.id === file.id,
          );
          if (existingFile) {
            return { ...existingFile, ...file };
          }

          const newItem: FileUploadItem = {
            ...file,
            progress: 0,
            status: onUpload ? "uploading" : "completed",
          };

          if (onUpload) {
            itemsToUpload.push(newItem);
          }

          return newItem;
        });

        // Set the state synchronously calculated above
        setUploadFiles(newItems);

        // Trigger uploads for only the new items
        itemsToUpload.forEach((item) => handleUpload(item));
      },
    });

    const retryUpload = (fileId: string) => {
      const fileToRetry = uploadFiles.find((f) => f.id === fileId);
      if (!fileToRetry) return;

      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? { ...f, progress: 0, status: "uploading", error: undefined }
            : f,
        ),
      );
      handleUpload(fileToRetry);
    };

    const removeUploadFile = (fileId: string) => {
      setUploadFiles((prev) => prev.filter((file) => file.id !== fileId));
      removeFile(fileId);
    };

    const getFileIcon = (file: File | FileMetadata) => {
      const type = file.type?.toLowerCase() || "";
      const name = file.name?.toLowerCase() || "";

      if (type.startsWith("video/") || name.endsWith(".mp4"))
        return <Icon name="mp4" className="w-10 h-10" />;
      if (type.startsWith("audio/") || name.endsWith(".mp3"))
        return <Icon name="mp3" className="w-10 h-10" />;
      if (type.includes("pdf") || name.endsWith(".pdf"))
        return <Icon name="pdf" className="w-10 h-10" />;
      if (
        type.includes("presentation") ||
        type.includes("powerpoint") ||
        name.endsWith(".ppt") ||
        name.endsWith(".pptx")
      )
        return <Icon name="ppt" className="w-10 h-10" />;
      if (
        type.includes("word") ||
        type.includes("document") ||
        name.endsWith(".doc") ||
        name.endsWith(".docx")
      )
        return <Icon name="doc" className="w-10 h-10" />;
      if (type.includes("csv") || name.endsWith(".csv"))
        return <Icon name="csv" className="w-10 h-10" />;
      if (
        type.includes("excel") ||
        type.includes("sheet") ||
        name.endsWith(".xls") ||
        name.endsWith(".xlsx")
      )
        return <Icon name="xls" className="w-10 h-10" />;
      if (type.includes("zip") || name.endsWith(".zip"))
        return <Icon name="zip" className="w-10 h-10" />;
      if (type.includes("rar") || name.endsWith(".rar"))
        return <Icon name="rar" className="w-10 h-10" />;
      if (
        type.includes("exe") ||
        name.endsWith(".exe") ||
        type.includes("msdownload")
      )
        return <Icon name="exe" className="w-10 h-10" />;

      return <Icon name="txt" className="w-10 h-10" />;
    };

    return (
      <div className={cn("w-full max-w-100", className)} ref={ref}>
        {/* Upload Area */}
        <div
          className={cn(
            "rounded-xl max-h-29 relative border border-dashed bg-s-l1-d3 p-4 text-center transition-colors",
            isDragging
              ? "border-primary-high-em"
              : "border-outline-med-em hover:bg-hover-overlay-inverse",
            disabled && "pointer-events-none bg-disabled-base-em",
          )}
          onDragEnter={disabled ? undefined : handleDragEnter}
          onDragLeave={disabled ? undefined : handleDragLeave}
          onDragOver={disabled ? undefined : handleDragOver}
          onDrop={disabled ? undefined : handleDrop}
        >
          <input {...getInputProps()} className="sr-only" disabled={disabled} />

          <div className="flex flex-col items-center gap-3">
            <Button
              variant={"secondary"}
              size={"icon-sm"}
              onClick={openFileDialog}
              disabled={disabled}
              type="button"
            >
              <Icon
                name="upload"
                className={cn(
                  "size-5",
                  isDragging ? "text-primary" : "text-foreground",
                )}
              />
            </Button>

            <div className="space-y-0">
              <p
                className={cn(
                  "text-sm font-medium",
                  disabled && "text-disabled-high-em",
                )}
              >
                <span
                  onClick={disabled ? undefined : openFileDialog}
                  className={cn(
                    "text-primary cursor-pointer",
                    disabled && "pointer-events-none text-primary-low-em",
                  )}
                >
                  Browser files
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-muted text-xs font-medium">
                Support for multiple file types up to {formatBytes(maxSize)}{" "}
                each
              </p>
            </div>
          </div>
        </div>

        {/* File List */}
        {uploadFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadFiles.map((fileItem) => (
              <div
                key={fileItem.id}
                className="border-outline-low-em rounded-xl shadow-xs bg-s-l0-d3 border relative overflow-hidden p-4 gap-2"
              >
                {fileItem.status === "uploading" && (
                  <div
                    className="bg-s1 absolute inset-y-0 left-0 transition-all duration-300 ease-linear"
                    style={{ width: `${Math.round(fileItem.progress)}%` }}
                  />
                )}
                <div className="relative z-10 flex items-start gap-2.5">
                  {/* File Icon */}
                  <div className="shrink-0">
                    {fileItem.preview &&
                    fileItem.file.type.startsWith("image/") ? (
                      <img
                        src={fileItem.preview}
                        alt={fileItem.file.name}
                        className="rounded-lg h-10 w-10 border object-cover"
                      />
                    ) : (
                      <div>
                        {getFileIcon(fileItem.file)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mt-0.75 flex items-start justify-between">
                      <div className="inline-flex flex-col justify-center gap-1 truncate font-medium">
                        <span className="text-sm font-bold truncate">
                          {fileItem.file.name}
                        </span>
                        <div className="flex items-center ">
                          <span className="text-muted font-medium text-xs">
                            {formatBytes(fileItem.file.size)}
                          </span>
                          <Separator
                            orientation="vertical"
                            className="mx-1.5 h-3 my-auto"
                          />
                          <div>
                            {fileItem.status === "uploading" && (
                              <div className="flex items-center">
                                <Spinner className="text-primary size-3.5" />
                                <span className="text-muted text-xs ml-1">
                                  Uploading... ({Math.round(fileItem.progress)}
                                  %)
                                </span>
                              </div>
                            )}
                            {fileItem.status === "completed" && (
                              <div className="flex items-center">
                                <Icon
                                  name="alertSuccess"
                                  className="text-success-high-em size-3.25"
                                />
                                <span className="text-success-high-em text-xs ml-1">
                                  Completed
                                </span>
                              </div>
                            )}
                            {fileItem.status === "error" && (
                              <div className="flex items-center">
                                <Icon
                                  name="closeCircle"
                                  className="text-danger-med-em size-3.5"
                                />
                                <span className="text-danger-med-em text-xs ">
                                  Failed
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Remove Button */}
                        <Button
                          onClick={() => removeUploadFile(fileItem.id)}
                          variant="ghost"
                          size="icon-xs"
                          className="text-muted-foreground size-6 hover:bg-transparent hover:opacity-100"
                          type="button"
                        >
                          <Icon name="trash" className="size-4 text-muted" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Error Message */}
                {fileItem.status === "error" && fileItem.error && (
                  <div className="relative z-10">
                    <Button
                      onClick={() => retryUpload(fileItem.id)}
                      variant="ghost"
                      size="sm"
                      className="text-danger-high-em mt-2"
                      type="button"
                    >
                      try again
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
