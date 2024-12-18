import { AddItinerarySchemaType } from "@/schemas/add-itinerary-form-schema";

export declare global {
  type ItineraryTableData = ConvertObjectKeysToCamel<
    Omit<
      AddItinerarySchemaType,
      "introduction_message" | "thank_you_note" | "terms_and_conditions"
    >
  > & {
    itineraryId: string;
  };
  type ItineraryData = ConvertObjectKeysToCamel<AddItinerarySchemaType> & {
    itineraryId: string;
    createdAt: string;
    updatedAt: string;
  };
}
