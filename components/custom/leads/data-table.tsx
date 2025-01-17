"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Settings2, PlusSquare, Trash2 } from "lucide-react";

import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { handleButtonInteraction } from "@/lib/utils";

interface DataTableProps<
  TData extends ItineraryTableData | LeadsTableData,
  TValue,
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleButtonInteractionType: "Lead" | "Itinerary" | "Qoutation";
}

export function DataTable<
  TData extends ItineraryTableData | LeadsTableData,
  TValue,
>({
  columns,
  data,
  handleButtonInteractionType,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();
  const { state: sideBarState } = useSidebar();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnVisibility, rowSelection },
  });
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <Card
      className={
        sideBarState === "expanded"
          ? "data-table-shrinked"
          : "data-table-expanded"
      }
    >
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>
          <span className="font-bold italic text-primary">
            {table.getRowModel().rows?.length ?? "No"}{" "}
          </span>{" "}
          Records Found!
        </CardTitle>
        <div className="!mt-0 flex gap-2 md:flex-row">
          <Button
            onClick={async () => {
              const path = await handleButtonInteraction(
                "Add New",
                handleButtonInteractionType,
                [],
              );
              router.push(path as string);
            }}
            size={window.innerWidth < 640 ? "icon" : "default"}
            className="sm:mr-2"
          >
            {window.innerWidth < 640 ? null : "Add New"}
            <PlusSquare className="h-4 w-4 sm:ml-2" />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              handleButtonInteraction(
                "Delete",
                handleButtonInteractionType,
                selectedRows,
                table,
              );
              router.refresh();
            }}
            size={window.innerWidth < 640 ? "icon" : "default"}
            className="sm:mr-2"
          >
            {window.innerWidth < 640 ? null : "Delete Selected"}
            <Trash2 className="h-4 w-4 sm:ml-2" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto font-medium">
                {window.innerWidth < 640 ? null : "View"}{" "}
                <Settings2 className="h-4 w-4 sm:ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {
                <>
                  <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        column.getCanHide() && column.id !== "actions",
                    )
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </>
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-gray-200 dark:bg-slate-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:!bg-gray-200 dark:hover:!bg-slate-900"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="mt-4 flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">Show Rows: </span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="mx-4 w-20">
              <SelectValue placeholder="Show Rows" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Show Rows</SelectLabel>
                <SelectSeparator />
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
// In future, when filter option will be included then I have to make this table flexible enough so that it can take the input fields as parameter based on which filter will be applied.
