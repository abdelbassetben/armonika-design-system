"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuStackView,
  DropdownMenuTrigger,
  type DropdownMenuStackDirection,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

type TaskMenuView = "main" | "change-status";

export function DropdownMenuNestedDemo() {
  const [view, setView] = React.useState<TaskMenuView>("main");
  const [direction, setDirection] =
    React.useState<DropdownMenuStackDirection>("forward");

  const goToChangeStatus = () => {
    setDirection("forward");
    setView("change-status");
  };

  const goToMain = () => {
    setDirection("back");
    setView("main");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) setView("main");
      }}
    >
      <DropdownMenuTrigger
        render={<Button variant="outline">Manage Task</Button>}
      />
      <DropdownMenuContent className="min-w-48 overflow-x-hidden">
        <DropdownMenuStackView viewKey={view} direction={direction}>
          {view === "main" ? (
            <DropdownMenuGroup>
              <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="category" className="size-4" />
                Details
              </DropdownMenuItem>
              <DropdownMenuItem
                closeOnClick={false}
                onClick={goToChangeStatus}
              >
                <Icon name="verificationTick" className="size-4" />
                Change Status
                <Icon name="chevron" className="ml-auto size-3 rotate-90" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuGroup>
              <DropdownMenuItem
                closeOnClick={false}
                onClick={goToMain}
                className="text-muted-foreground!"
              >
                <Icon name="chevron" className="size-4 -rotate-90" />
                Previous
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="verificationTick" className="size-4" />
                Start
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="alertDanger" className="size-4" />
                Stop
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="moreAction" className="size-4" />
                Pause
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="shieldTick" className="size-4" />
                Complete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="alert" className="size-4" />
                Cancel
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuStackView>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
