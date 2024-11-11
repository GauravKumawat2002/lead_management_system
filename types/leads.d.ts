import { AddLeadsForm } from "@/schemas/add-leads-form-schema";
export global {
  type LeadsData = Omit<
    AddLeadsForm,
    | "budget_per_adult"
    | "budget_per_child"
    | "follow_up_date"
    | "follow_up_time"
    | "no_of_adults"
    | "no_of_children"
    | "planned_travel_date"
    | "destination"
  > & {
    id: string;
  };
}
