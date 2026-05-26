"use client";
import { Pattern } from "@/components/examples/c-file-upload-5";
import { FileUpload } from "@/components/ui/file-upload";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center p-30 w-full bg-white">
      {/* <Pattern/> */}
      <FileUpload
        maxFiles={3}
        maxSize={5 * 1024 * 1024}
        accept="*"
        onUpload={(file, onProgress) => {
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            // Using a public echo endpoint that accepts file uploads for testing
            xhr.open("POST", "https://httpbin.org/post");

            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                onProgress(percentComplete);
              }
            };

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
              } else {
                reject(new Error(`Upload failed with status ${xhr.status}`));
              }
            };

            xhr.onerror = () => {
              reject(new Error("Network error occurred during upload"));
            };

            const formData = new FormData();
            formData.append("file", file as File);

            xhr.send(formData);
          });
        }}
      />
    </div>
  );
};

export default page;
