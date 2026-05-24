"use client";

import { Copy, Trash2, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarMoreAction,
  ActionBarSelection,
  ActionBarSeparator,
} from "@/components/ui/action-bar";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

interface Task {
  id: string;
  name: string;
}

const INITIAL_TASKS: Task[] = [
  { id: crypto.randomUUID(), name: "Weekly Status Report" },
  { id: crypto.randomUUID(), name: "Client Invoice Review" },
  { id: crypto.randomUUID(), name: "Product Roadmap" },
  { id: crypto.randomUUID(), name: "Team Standup Notes" },
];

function useActionBarState(initialTasks: Task[] = INITIAL_TASKS) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [selectedTaskIds, setSelectedTaskIds] = React.useState<Set<string>>(
    new Set(),
  );

  const open = selectedTaskIds.size > 0;

  const onOpenChange = React.useCallback((open: boolean) => {
    if (!open) {
      setSelectedTaskIds(new Set());
    }
  }, []);

  const onItemSelect = React.useCallback(
    (id: string, checked: boolean) => {
      const newSelected = new Set(selectedTaskIds);
      if (checked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      setSelectedTaskIds(newSelected);
    },
    [selectedTaskIds],
  );

  const onDuplicate = React.useCallback(() => {
    const selectedItems = tasks.filter((task) => selectedTaskIds.has(task.id));
    const duplicates = selectedItems.map((task) => ({
      ...task,
      id: crypto.randomUUID(),
      name: `${task.name} (copy)`,
    }));
    setTasks([...tasks, ...duplicates]);
    setSelectedTaskIds(new Set());
  }, [tasks, selectedTaskIds]);

  const onDelete = React.useCallback(() => {
    setTasks(tasks.filter((task) => !selectedTaskIds.has(task.id)));
    setSelectedTaskIds(new Set());
  }, [tasks, selectedTaskIds]);

  return {
    tasks,
    selectedTaskIds,
    open,
    onOpenChange,
    onItemSelect,
    onDuplicate,
    onDelete,
  };
}

function TaskList({
  tasks,
  selectedTaskIds,
  onItemSelect,
}: {
  tasks: Task[];
  selectedTaskIds: Set<string>;
  onItemSelect: (id: string, checked: boolean) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <h3 className="font-semibold text-lg">Tasks</h3>
      <div className="flex max-h-72 flex-col gap-1.5 overflow-y-auto">
        {tasks.map((task) => (
          <Label
            key={task.id}
            className={cn(
              "flex cursor-pointer items-center gap-2.5 rounded-md border bg-card/70 px-3 py-2.5 transition-colors hover:bg-accent/70",
              selectedTaskIds.has(task.id) && "bg-accent/70",
            )}
          >
            <Checkbox
              checked={selectedTaskIds.has(task.id)}
              onCheckedChange={(checked) =>
                onItemSelect(task.id, checked === true)
              }
            />
            <span className="truncate font-medium text-sm">{task.name}</span>
          </Label>
        ))}
      </div>
    </div>
  );
}

export function ActionBarDemo() {
  const state = useActionBarState();

  return (
    <>
      <TaskList
        tasks={state.tasks}
        selectedTaskIds={state.selectedTaskIds}
        onItemSelect={state.onItemSelect}
      />
      <ActionBar open={state.open} onOpenChange={state.onOpenChange}>
        <ActionBarClose>
          <X />
        </ActionBarClose>
        <ActionBarSelection>
          {state.selectedTaskIds.size} selected
        </ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
          <ActionBarItem onSelect={state.onDuplicate}>
            <Copy />
            Duplicate
          </ActionBarItem>
          <ActionBarItem onSelect={state.onDuplicate}>
            <Copy />
            Duplicate
          </ActionBarItem>
          <ActionBarItem onSelect={state.onDuplicate}>
            <Copy />
            Duplicate
          </ActionBarItem>
        </ActionBarGroup>
        <ActionBarSeparator />
        <ActionBarMoreAction>
          <DropdownMenuItem onSelect={() => console.log("select all")}>
            Select all
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("archive")}>
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => console.log("clear")}
          >
            Clear selection
          </DropdownMenuItem>
        </ActionBarMoreAction>
      </ActionBar>
    </>
  );
}

export function ActionBarVerticalDemo() {
  const state = useActionBarState();

  return (
    <>
      <TaskList
        tasks={state.tasks}
        selectedTaskIds={state.selectedTaskIds}
        onItemSelect={state.onItemSelect}
      />
      <ActionBar
        open={state.open}
        onOpenChange={state.onOpenChange}
        orientation="vertical"
      >
        <ActionBarClose>
          <X />
        </ActionBarClose>
        <ActionBarSelection>
          {state.selectedTaskIds.size} selected
        </ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
          <ActionBarItem onSelect={state.onDuplicate}>
            <Copy />
            Duplicate
          </ActionBarItem>
          <ActionBarItem variant="destructive" onSelect={state.onDelete}>
            <Trash2 />
            Delete
          </ActionBarItem>
        </ActionBarGroup>
        <ActionBarMoreAction>
          <DropdownMenuItem onSelect={() => console.log("select all")}>
            Select all
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("archive")}>
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => console.log("clear")}
          >
            Clear selection
          </DropdownMenuItem>
        </ActionBarMoreAction>
      </ActionBar>
    </>
  );
}

export function ActionBarVariantsDemo() {
  const state = useActionBarState();

  return (
    <>
      <TaskList
        tasks={state.tasks}
        selectedTaskIds={state.selectedTaskIds}
        onItemSelect={state.onItemSelect}
      />
      <ActionBar open={state.open} onOpenChange={state.onOpenChange}>
        <ActionBarClose>
          <X />
        </ActionBarClose>
        <ActionBarSelection>
          {state.selectedTaskIds.size} selected
        </ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
          <ActionBarItem variant="default" onSelect={state.onDuplicate}>
            <Copy />
            Default
          </ActionBarItem>
          <ActionBarItem variant="primary-light" onSelect={state.onDuplicate}>
            <Copy />
            Primary light
          </ActionBarItem>
          <ActionBarItem variant="neutral" onSelect={state.onDuplicate}>
            <Copy />
            Neutral
          </ActionBarItem>
          <ActionBarItem variant="outline" onSelect={state.onDuplicate}>
            <Copy />
            Outline
          </ActionBarItem>
          <ActionBarItem variant="secondary" onSelect={state.onDuplicate}>
            <Copy />
            Secondary
          </ActionBarItem>
          <ActionBarItem variant="ghost" onSelect={state.onDuplicate}>
            <Copy />
            Ghost
          </ActionBarItem>
          <ActionBarItem variant="destructive" onSelect={state.onDelete}>
            <Trash2 />
            Destructive
          </ActionBarItem>
          <ActionBarItem variant="success" onSelect={state.onDuplicate}>
            <Copy />
            Success
          </ActionBarItem>
          <ActionBarItem variant="link" onSelect={state.onDuplicate}>
            <Copy />
            Link
          </ActionBarItem>
        </ActionBarGroup>
        <ActionBarMoreAction>
          <DropdownMenuItem onSelect={() => console.log("select all")}>
            Select all
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("archive")}>
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => console.log("clear")}
          >
            Clear selection
          </DropdownMenuItem>
        </ActionBarMoreAction>
      </ActionBar>
    </>
  );
}

export function ActionBarPlacementDemo() {
  const state = useActionBarState();

  return (
    <>
      <TaskList
        tasks={state.tasks}
        selectedTaskIds={state.selectedTaskIds}
        onItemSelect={state.onItemSelect}
      />
      <ActionBar open={state.open} onOpenChange={state.onOpenChange} side="top">
        <ActionBarGroup>
          <ActionBarItem onSelect={state.onDuplicate}>
            <Copy />
            Duplicate
          </ActionBarItem>
          <ActionBarItem variant="destructive" onSelect={state.onDelete}>
            <Trash2 />
            Delete
          </ActionBarItem>
        </ActionBarGroup>
      </ActionBar>
    </>
  );
}
