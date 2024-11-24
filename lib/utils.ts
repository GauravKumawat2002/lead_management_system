import { ROUTES } from "@/routes/routes";
import { deleteLeadByIds } from "@/services/leadsService";
import { Row } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getErrorMessage(
  errorData: string,
  errorMessages: { [key: string]: string },
): string {
  const errorMessageKey = Object.keys(errorMessages).find((key) =>
    errorData.includes(key),
  );
  return errorMessageKey ? errorMessages[errorMessageKey] : errorData;
}
export async function handleButtonInteraction<TData extends LeadsTableData>(
  action: "Delete" | "Add New",
  type: "Lead" | "Itinary",
  selectedRows: Row<TData>[],
) {
  // Determine actions based on type and action
  if (type === "Lead") {
    if (selectedRows.length) {
      if (action === "Delete") {
        const selectedLeadIds = selectedRows
          .map((row) => row.original.leadId)
          .filter(Boolean);
        await deleteLeadByIds(selectedLeadIds);
      }
    }
    if (action === "Add New") {
      return ROUTES.NEW_LEADS;
    }
  }
  // if (type === "Itinary") {
  //   if (action === "Delete") {
  //     const selectedItinaryIds = selectedRows
  //       .map((row) => row.original.itenaryId)
  //       .filter(Boolean);
  //     await deleteItinaryByIds(selectedItinaryIds);
  //   }
  //   if (action === "Add New") {
  //     return ROUTES.NEW_ITINARIES;
  //   }
  // }
  else {
    console.log("Unsuported type", type);
  }
}
