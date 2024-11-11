"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
const actions = ["View Lead", "Delete Lead", "Update Lead"];

export const columns: ColumnDef<LeadsData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mr-2 flex self-center"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mr-2 flex self-center"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client_name",
    header: ({ column }) => (
      <Button
        variant="link"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!p-0 !py-0 font-semibold text-primary"
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="font-semibold text-primary">ID</div>,
  },

  {
    accessorKey: "client_email_id",
    header: () => <div className="font-semibold text-primary">Email</div>,
  },
  {
    accessorKey: "client_contact_no",
    header: () => <div className="font-semibold text-primary">Phone</div>,
  },
  {
    accessorKey: "executive",
    header: () => <div className="font-semibold text-primary">Executive</div>,
  },

  {
    accessorKey: "stage",
    header: () => <div className="font-semibold text-primary">Stage</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="font-semibold text-primary">Status</div>,
  },
  {
    accessorKey: "enquiry_type",
    header: () => (
      <div className="font-semibold text-primary">Enquiry Type</div>
    ),
  },
  {
    accessorKey: "package",
    header: () => <div className="font-semibold text-primary">Package</div>,
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {actions.map((action) => (
              <DropdownMenuItem key={action}>{action}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
