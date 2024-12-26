import { ROUTES } from "@/routes/routes";
import { deleteItineraryByIds } from "@/services/itineraryService";
import { deleteLeadByIds } from "@/services/leadsService";
import { Row, Table } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
function getErrorMessage(
  errorData: string,
  errorMessages: { [key: string]: string },
): string {
  const errorMessageKey = Object.keys(errorMessages).find((key) =>
    errorData.includes(key),
  );
  return errorMessageKey ? errorMessages[errorMessageKey] : errorData;
}

function camelToSnake<T extends object>(obj: T): ConvertObjectKeysToSnake<T> {
  if (!obj || typeof obj !== "object")
    return obj as ConvertObjectKeysToSnake<T>;

  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item)) as ConvertObjectKeysToSnake<T>;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      camelToSnake(value),
    ]),
  ) as ConvertObjectKeysToSnake<T>;
}

async function handleButtonInteraction<
  TData extends LeadsTableData | ItineraryTableData,
>(
  action: "Delete" | "Add New",
  type: "Lead" | "Itinerary" | "Qoutation",
  selectedRows: Row<TData>[],
  table?: Table<TData>,
) {
  // Determine actions based on type and action
  if (type === "Lead") {
    if (action === "Delete" && selectedRows.length) {
      const selectedLeadIds = selectedRows
        .map((row) => {
          const data = row.original as LeadsTableData;
          return data.leadId;
        })
        .filter(Boolean);
      await deleteLeadByIds(selectedLeadIds);
      table?.resetRowSelection();
    }
    if (action === "Add New") {
      return ROUTES.NEW_LEADS;
    }
  }
  if (type === "Itinerary") {
    if (action === "Delete" && selectedRows.length) {
      const selectedItineraryIds = selectedRows
        .map((row) => {
          const data = row.original as ItineraryTableData;
          return data.itineraryId;
        })
        .filter(Boolean);
      await deleteItineraryByIds(selectedItineraryIds);
      table?.resetRowSelection();
    }
    if (action === "Add New") {
      return ROUTES.NEW_ITINERARY;
    }
  } else {
    console.log("Unsuported type", type);
  }
}
function convertToDatetimeLocal(datetime: string) {
  const date = new Date(datetime);
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().slice(0, 16);
}

export {
  camelToSnake,
  handleButtonInteraction,
  getErrorMessage,
  cn,
  convertToDatetimeLocal,
};
