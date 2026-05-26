"use client";

import { useEffect, useState } from "react";
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  VideoIcon,
  HeadphonesIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FileArchiveIcon,
} from "lucide-react";
import { Icon } from "../ui/icon";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

interface FileUploadItem extends FileWithPreview {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface ProgressUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onFilesChange?: (files: FileWithPreview[]) => void;
  simulateUpload?: boolean;
  disabled?: boolean;
}

export function Pattern({
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = "*",
  multiple = true,
  className,
  onFilesChange,
  simulateUpload = true,
  disabled = false,
}: ProgressUploadProps) {
  // Create default images using FileMetadata type
  const defaultImages: FileMetadata[] = [
    {
      id: "default-3",
      name: "image-1.png",
      size: 42048,
      type: "image/png",
      url: "https://picsum.photos/1000/800?grayscale&random=10",
    },
    {
      id: "default-4",
      name: "image-2.png",
      size: 62807,
      type: "image/png",
      url: "https://picsum.photos/1000/800?grayscale&random=11",
    },
  ];

  // Convert default images to FileUploadItem format
  const defaultUploadFiles: FileUploadItem[] = defaultImages.map((image) => ({
    id: image.id,
    file: {
      name: image.name,
      size: image.size,
      type: image.type,
    } as File,
    preview: image.url,
    progress: 100,
    status: "completed" as const,
  }));

  const [uploadFiles, setUploadFiles] =
    useState<FileUploadItem[]>(defaultUploadFiles);

  const [
    { isDragging, errors },
    {
      removeFile,
      clearFiles,
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
    initialFiles: defaultImages,
    onFilesChange: (newFiles) => {
      // Convert to upload items when files change, preserving existing status
      const newUploadFiles = newFiles.map((file) => {
        // Check if this file already exists in uploadFiles
        const existingFile = uploadFiles.find(
          (existing) => existing.id === file.id,
        );

        if (existingFile) {
          // Preserve existing file status and progress
          return {
            ...existingFile,
            ...file, // Update any changed properties from the file
          };
        } else {
          // New file - set to uploading
          return {
            ...file,
            progress: 0,
            status: "uploading" as const,
          };
        }
      });
      setUploadFiles(newUploadFiles);
      onFilesChange?.(newFiles);
    },
  });

  // Simulate upload progress
  useEffect(() => {
    if (!simulateUpload) return;

    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((file) => {
          if (file.status !== "uploading") return file;

          const increment = Math.random() * 15 + 5; // 5-20% increment
          const newProgress = Math.min(file.progress + increment, 100);

          // Simulate occasional errors (10% chance when progress > 50%)
          if (newProgress > 50 && Math.random() < 0.1) {
            return {
              ...file,
              status: "error" as const,
              error: "Upload failed. Please try again.",
            };
          }

          // Complete when progress reaches 100%
          if (newProgress >= 100) {
            return {
              ...file,
              progress: 100,
              status: "completed" as const,
            };
          }

          return {
            ...file,
            progress: newProgress,
          };
        }),
      );
    }, 500);

    return () => clearInterval(interval);
  }, [simulateUpload]);

  const retryUpload = (fileId: string) => {
    setUploadFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? {
              ...file,
              progress: 0,
              status: "uploading" as const,
              error: undefined,
            }
          : file,
      ),
    );
  };

  const removeUploadFile = (fileId: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== fileId));
    removeFile(fileId);
  };

  const getFileIcon = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type;
    if (type.startsWith("image/")) return <ImageIcon className="size-4" />;
    if (type.startsWith("video/")) return <VideoIcon className="size-4" />;
    if (type.startsWith("audio/")) return <HeadphonesIcon className="size-4" />;
    if (type.includes("pdf")) return <FileTextIcon className="size-4" />;
    if (type.includes("word") || type.includes("doc"))
      return <FileTextIcon className="size-4" />;
    if (type.includes("excel") || type.includes("sheet"))
      return <FileSpreadsheetIcon className="size-4" />;
    if (type.includes("zip") || type.includes("rar"))
      return <FileArchiveIcon className="size-4" />;
    return <FileTextIcon className="size-4" />;
  };

  const completedCount = uploadFiles.filter(
    (f) => f.status === "completed",
  ).length;
  const errorCount = uploadFiles.filter((f) => f.status === "error").length;
  const uploadingCount = uploadFiles.filter(
    (f) => f.status === "uploading",
  ).length;

  return (
    <div className={cn("w-full max-w-100 ", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "rounded-xl max-h-29 relative border border-dashed bg-s-l1-d3 p-4 text-center transition-colors",
          isDragging
            ? "border-primary-high-em"
            : "border-outline-med-em hover:bg-hover-overlay-inverse",
          disabled && "pointer-events-none bg-disabled-base-em",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input {...getInputProps()} className="sr-only" />

        <div className="flex flex-col items-center gap-3">
          <Button
            variant={"secondary"}
            size={"icon-sm"}
            // className={cn(
            //   "flex h-16 w-16 items-center justify-center rounded-full",
            //   isDragging ? "bg-primary/10" : "bg-muted",
            // )}
            onClick={openFileDialog}
          >
            <Icon
              name="upload"
              className={cn(
                "size-5",
                isDragging ? "text-primary" : "text-foreground",
              )}
            />
            {/* <UploadIcon
              className={cn(
                "h-6",
                isDragging ? "text-primary" : "text-foreground",
              )}
            /> */}
          </Button>

          <div className="space-y-0">
            <p
              className={cn(
                "text-sm font-medium",
                disabled && "text-disabled-high-em",
              )}
            >
              <span
                onClick={openFileDialog}
                className={cn(
                  "text-primary cursor-pointer",
                  disabled && "pointer-events-none text-primary-low-em",
                )}
              >
                Browser files
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-muted text-xs  font-medium">
              Support for multiple file types up to {formatBytes(maxSize)} each
            </p>
          </div>

          {/* <Button onClick={openFileDialog}>
            <UploadIcon className="h-4 w-4" />
            Select files
          </Button> */}
        </div>
      </div>

      {/* File List */}
      {uploadFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadFiles.map((fileItem: FileUploadItem) => (
            <div
              key={fileItem.id}
              className="border-outline-low-em rounded-xl shadow-xs bg-s-l0-d3 border relative overflow-hidden p-4 gap-2"
            >
              {fileItem.status === "uploading" && (
                <div
                  className="bg-s-1 absolute inset-y-0 left-0 transition-all duration-300 ease-linear"
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
                    <div className="border-border text-muted-foreground rounded-lg flex h-10 w-10 items-center justify-center border">
                      {getFileIcon(fileItem.file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="min-w-0 flex-1">
                  <div className="mt-0.75 flex items-start justify-between">
                    <p className="inline-flex flex-col justify-center gap-1 truncate font-medium">
                      <span className="text-sm font-bold">
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
                                Uploading... ({Math.round(fileItem.progress)}%)
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
                    </p>
                    <div className="flex items-center gap-2">
                      {/* Remove Button */}
                      <Button
                        onClick={() => removeUploadFile(fileItem.id)}
                        variant="ghost"
                        size="icon-xs"
                        className="text-muted-foreground size-6 hover:bg-transparent hover:opacity-100"
                      >
                        <Icon name="trash" className="size-4 text-muted" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Error Message */}
              {fileItem.status === "error" && fileItem.error && (
                <Button
                  onClick={() => retryUpload(fileItem.id)}
                  variant="ghost"
                  size="sm"
                  className={"text-danger-high-em mt-2"}
                >
                  try again
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
