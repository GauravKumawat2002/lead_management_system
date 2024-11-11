import { z } from "zod";

const AddLeadsSchema = z.object({
  budget_per_adult: z
    .number()
    .positive({ message: "Budget per adult expected" }),

  budget_per_child: z
    .number()
    .nonnegative({ message: "Budget per child " })
    .optional(), // Optional if no children

  client_contact_no: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be no more than 15 digits" })
    .regex(/^\d+$/, { message: "Phone number should only contain digits" }),

  client_email_id: z
    .string()
    .email({ message: "Invalid Email address" })
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

  follow_up_date: z.date({ message: "Invalid date" }),

  follow_up_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time" }),

  no_of_adults: z
    .number()
    .int()
    .min(1, { message: "Must have at least 1 adult" }),

  no_of_children: z
    .number()
    .int()
    .min(0, { message: "Number of children cannot be negative" })
    .optional(),

  package: z
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

type AddLeadsForm = z.infer<typeof AddLeadsSchema>;
export { AddLeadsSchema };
export type { AddLeadsForm };
