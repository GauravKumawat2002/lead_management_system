import { z } from "zod";

const AddItinerarySchema = z.object({
  template_name: z
    .string()
    .min(3, { message: "Template name must be at least 3 characters" }),
  subject: z.string().min(3, { message: "Subject is required" }),
  trip_details: z.string().optional(),
  thank_you_note: z.string().optional(),
  terms_and_conditions: z.string().optional(),
});

type AddItinerarySchemaType = z.infer<typeof AddItinerarySchema>;
export { AddItinerarySchema };
export type { AddItinerarySchemaType };
