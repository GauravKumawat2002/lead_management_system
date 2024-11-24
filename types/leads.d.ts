import { AddLeadsForm } from "@/schemas/add-leads-form-schema";
type ConvertSnakeToCamel<StringType extends string> =
  StringType extends `${infer FirstPart}_${infer RestParts}`
    ? `${FirstPart}${Capitalize<ConvertSnakeToCamel<RestParts>>}`
    : StringType;

type ConvertObjectKeysToCamel<ObjectType> = {
  [KeyName in keyof ObjectType as ConvertSnakeToCamel<
    string & KeyName
  >]: ObjectType[KeyName];
};

export global {
  type LeadsTableData = ConvertObjectKeysToCamel<
    Omit<
      AddLeadsForm,
      | "budget_per_adult"
      | "budget_per_child"
      | "follow_up"
      | "no_of_adults"
      | "no_of_children"
      | "planned_travel_date"
    >
  > & { leadId: string };
  type LeadData = ConvertObjectKeysToCamel<AddLeadsForm> & {
    leadId: string;
    createdAt: string;
    updatedAt: string;
  };
}
