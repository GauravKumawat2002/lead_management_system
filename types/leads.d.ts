import { AddLeadsSchemaType } from "@/schemas/add-leads-form-schema";

export declare global {
  type LeadsTableData = ConvertObjectKeysToCamel<
    Omit<
      AddLeadsSchemaType,
      | "budget_per_adult"
      | "budget_per_child"
      | "follow_up"
      | "no_of_adults"
      | "no_of_children"
      | "planned_travel_date"
    >
  > & { leadId: string };
  type LeadData = ConvertObjectKeysToCamel<AddLeadsSchemaType> & {
    leadId: string;
    createdAt: string;
    updatedAt: string;
  };
}
