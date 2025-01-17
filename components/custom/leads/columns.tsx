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
import { deleteLeadByIds } from "@/services/leadsService";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
export const columns: ColumnDef<LeadsTableData>[] = [
  {
    id: "sno",
    header: () => <div className="font-semibold text-primary">S.No.</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => {
      // const allSelectedIds: string[] = table
      //   .getSelectedRowModel()
      //   .rows.map((row) => row.getValue("leadId"));
      return (
        <Checkbox
          className="mr-2 flex self-center"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          className="mr-2 flex self-center"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "clientName",
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
    accessorKey: "leadId",
    header: () => <div className="font-semibold text-primary">ID</div>,
  },

  {
    accessorKey: "clientEmailId",
    header: () => <div className="font-semibold text-primary">Email</div>,
  },
  {
    accessorKey: "clientContactNo",
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
    accessorKey: "enquiryType",
    header: () => (
      <div className="font-semibold text-primary">Enquiry Type</div>
    ),
  },
  {
    accessorKey: "packageName",
    header: () => <div className="font-semibold text-primary">Package</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      const id: string = row.getValue("leadId");
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
            <DropdownMenuItem
              key={"View Lead"}
              onClick={() => {
                router.push(ROUTES.LEADS_DETAILS(id));
              }}
            >
              View Lead
            </DropdownMenuItem>
            <DropdownMenuItem
              key={"Delete Lead"}
              onClick={async () => {
                await deleteLeadByIds([id]);
                router.refresh();
              }}
            >
              Delete Lead
            </DropdownMenuItem>
            <DropdownMenuItem
              key={"Update Lead"}
              onClick={() => {
                router.push(ROUTES.UPDATE_LEAD(id));
              }}
            >
              Update Lead
            </DropdownMenuItem>
            <DropdownMenuItem
              key={"Create Quotation"}
              onClick={() => {
                router.push(ROUTES.NEW_QUOTATION(id));
              }}
            >
              Create Quotation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
