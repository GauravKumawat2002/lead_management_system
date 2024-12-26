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
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { deleteItineraryById } from "@/services/itineraryService";
export const columns: ColumnDef<ItineraryTableData>[] = [
  {
    id: "serialNumber",
    header: () => (
      <div className="text-center font-semibold text-primary">S.No.</div>
    ),
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => {
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
    header: () => (
      <div className="font-semibold text-primary">Template Name</div>
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
      const id: string = row.getValue("itineraryId");
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
                const result = await deleteItineraryById(id);
                console.log(result);
                router.refresh();
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
