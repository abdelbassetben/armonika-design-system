"use client";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="sm"
        onClick={() => toast({ title: "Default toast" })}
      >
        Default
      </Button>
      <Button
        size="sm"
        variant="success"
        onClick={() => toast({ title: "Success", variant: "success" })}
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => toast({ title: "Error", variant: "error" })}
      >
        Error
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast({ title: "Warning", variant: "warning" })}
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="neutral"
        onClick={() => toast({ title: "Info", variant: "info" })}
      >
        Info
      </Button>
    </div>
  );
}

export function ToastWithActionDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="sm"
        onClick={() =>
          toast({
            title: "New message",
            variant: "info",
            action: {
              label: "View",
              onClick: () => console.log("Action clicked"),
            },
          })
        }
      >
        With Action
      </Button>
    </div>
  );
}
