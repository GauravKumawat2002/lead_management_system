import { z } from "zod";

const AddLeadsSchema = z.object({
  budget_per_adult: z.string().min(1, { message: "Budget per adult expected" }),

  budget_per_child: z.string().optional(), // Optional if no children

  client_contact_no: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be no more than 15 digits" })
    .regex(/^\d+$/, { message: "Phone number should only contain digits" }),

  client_email_id: z
    .union([
      z.string().email({ message: "Invalid email format" }),
      z.string().length(0),
    ])
    .optional(), // Optional if it’s not always required

  client_name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),

  destination: z.string().optional(),

  enquiry_type: z.enum([
    "flight booking",
    "hotel booking",
    "sight seeing",
    "transport",
    "other",
  ]),

  executive: z
    .string()
    .min(3, { message: "Executive name must be at least 3 characters" }),

  follow_up: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, {
    message: "Invalid datetime format. Expected format: YYYY-MM-DDThh:mm",
  }),

  no_of_adults: z.string().min(1, { message: "Must have at least 1 adult" }),

  no_of_children: z.string().min(0).optional(),

  package_name: z
    .string()
    .min(3, { message: "Package name must be at least 3 characters" }),

  planned_travel_date: z.date({ message: "Invalid date" }).optional(),

  stage: z.enum([
    "hot",
    "warm",
    "cold",
    "not interested",
    "not answer",
    "meeting fixed",
    "converted to clients",
    "meeting completed",
    "active",
    "converted to hot deals",
  ]),

  status: z.enum([
    "unattended",
    "blocked",
    "proposal sent",
    "spoke",
    "meeting fixed",
    "met",
    "closed",
    "lost",
    "active",
    "converted",
  ]),
});

type AddLeadsSchemaType = z.infer<typeof AddLeadsSchema>;
export { AddLeadsSchema };
export type { AddLeadsSchemaType };
