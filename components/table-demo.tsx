"use client"

import * as React from "react"

import {
  DataTable,
  type ColumnDef,
} from "@/components/ui/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"

export type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  avatar?: string
}

const roles = ["Admin", "Editor", "Viewer"]

export const users: User[] = Array.from({ length: 48 }, (_, index) => {
  const id = String(index + 1)
  const status = index % 4 === 0 ? "inactive" : "active"

  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    role: roles[index % roles.length]!,
    status,
    avatar: index % 3 === 0 ? `https://i.pravatar.cc/150?u=${id}` : undefined,
  }
})

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="flex items-center gap-1.5">
        <Icon name="category" className="size-4 text-muted-foreground" />
        Name
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          {row.avatar ? <AvatarImage src={row.avatar} alt={row.name} /> : null}
          <AvatarFallback>{row.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <span className="flex items-center gap-1.5">
        <Icon name="alertInfo" className="size-4 text-muted-foreground" />
        Email
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: () => (
      <span className="flex items-center gap-1.5">
        <Icon name="shieldTick" className="size-4 text-muted-foreground" />
        Role
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="flex items-center gap-1.5">
        <Icon name="verificationTick" className="size-4 text-muted-foreground" />
        Status
      </span>
    ),
    cell: ({ value }) => (
      <Badge variant={value === "active" ? "green" : "gray"}>
        {String(value)}
      </Badge>
    ),
  },
]

export function TableMultiSelectDemo() {
  const [selected, setSelected] = React.useState<string[]>([])

  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable
        columns={columns}
        data={users}
        getRowId={(row) => row.id}
        toolbar={{
          sort: true,
          filters: [
            {
              id: "search",
              type: "text",
              placeholder: "Search users…",
            },
            {
              id: "status",
              type: "select",
              label: "Status",
              accessorKey: "status",
              options: [
                { label: "All", value: "" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ],
            },
            {
              id: "role",
              type: "select",
              label: "Role",
              accessorKey: "role",
              options: [
                { label: "All", value: "" },
                ...roles.map((role) => ({ label: role, value: role })),
              ],
            },
          ],
        }}
        pagination={{ pageSize: 8 }}
        selection={{
          mode: "multiple",
          value: selected,
          onChange: setSelected,
        }}
      />
      <p className="text-sm text-muted-foreground">
        Selected: {selected.length ? selected.join(", ") : "None"}
      </p>
    </div>
  )
}

export function TableSingleSelectDemo() {
  const [selected, setSelected] = React.useState<string[]>([])

  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable
        columns={columns}
        data={users}
        getRowId={(row) => row.id}
        toolbar={{
          sort: true,
          filters: [
            {
              id: "search",
              type: "text",
              placeholder: "Search users…",
            },
            {
              id: "status",
              type: "select",
              label: "Status",
              accessorKey: "status",
              options: [
                { label: "All", value: "" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ],
            },
            {
              id: "role",
              type: "select",
              label: "Role",
              accessorKey: "role",
              options: [
                { label: "All", value: "" },
                ...roles.map((role) => ({ label: role, value: role })),
              ],
            },
          ],
        }}
        pagination={{ pageSize: 8 }}
        selection={{
          mode: "single",
          value: selected,
          onChange: setSelected,
        }}
      />
      <p className="text-sm text-muted-foreground">
        Selected: {selected[0] ?? "None"}
      </p>
    </div>
  )
}

export function TableLoadingDemo() {
  return (
    <DataTable
      columns={columns}
      data={users}
      getRowId={(row) => row.id}
      loading
      skeletonRows={5}
    />
  )
}

export function TableEmptyDemo() {
  return (
    <DataTable
      columns={columns}
      data={[]}
      emptyMessage="No users found."
    />
  )
}
