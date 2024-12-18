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
export const columns: ColumnDef<ItineraryTableData>[] = [
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
      const allSelectedIds: string[] = table
        .getSelectedRowModel()
        .rows.map((row) => row.getValue("itineraryId"));
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
    accessorKey: "itineraryId",
    header: () => <div className="font-semibold text-primary">ID</div>,
  },
  {
    accessorKey: "templateName",
    header: ({ column }) => (
      <Button
        variant="link"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!p-0 !py-0 font-semibold text-primary"
      >
        Template Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "subject",
    header: () => <div className="font-semibold text-primary">Subject</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
              key={"Duplicate Itinerary"}
              onClick={() => {
                router.push(ROUTES.DUPLICATE_ITINERARY(id));
              }}
            >
              Duplicate Itinerary
            </DropdownMenuItem>
            <DropdownMenuItem
              key={"Edit Itinerary"}
              onClick={() => {
                router.push(ROUTES.UPDATE_ITINERARY(id));
              }}
            >
              Edit Itinerary
            </DropdownMenuItem>
            <DropdownMenuItem
              key={"Delete Itinerary"}
              onClick={async () => {
                // will add functionality once Ashu exposes api's
                // await deleteLeadByIds([id]);
                // router.refresh();
              }}
            >
              Delete Itinerary
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
