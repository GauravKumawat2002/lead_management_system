import { z } from "zod";

const currencies = [
  { label: "Indian Rupee (₹)", value: "INR" },
  { label: "US Dollar ($)", value: "USD" },
  { label: "Euro (€)", value: "EUR" },
] as const;

// Base Products Schema for Product Schema
const BaseProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string({ required_error: "Product name is mandatory." })
    .min(2, { message: "Product name must have at least 2 characters." }),
  description: z
    .string()
    .min(15, { message: "Description must contain at least 15 characters." })
    .optional(),
  quantity: z
    .string({ required_error: "Quantity is mandatory." })
    .min(1, { message: "Quantity must be at least 1." }),
  price: z.string({ required_error: "Price is mandatory." }),
});

// Products schema related to transportation medium
const CarSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  number_of_cars: z
    .string({ required_error: "Number of cars is mandatory." })
    .min(1, { message: "Number of cars must be at least 1." }),
  number_of_days: z
    .string({ required_error: "Rental duration is mandatory." })
    .min(1, { message: "Rental duration must be at least 1 day." }),
});

const TrainSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  name: z
    .string({ required_error: "Train name is required" })
    .min(2, { message: "Train name should be at least 2 characters" }),
  no_of_children: z
    .number({ required_error: "Number of children is required" })
    .nonnegative({ message: "Number of children cannot be negative" }),
  no_of_adults: z
    .number({ required_error: "Number of adults is required" })
    .positive({ message: "There must be at least one adult" }),
  from: z
    .string({ required_error: "Starting location is required" })
    .min(2, { message: "Starting location should be at least 2 characters" }),
  to: z
    .string({ required_error: "Destination is required" })
    .min(2, { message: "Destination should be at least 2 characters" }),
});

const PlaneSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  name: z
    .string({ required_error: "Flight name is required" })
    .min(2, { message: "Flight name should be at least 2 characters" }),
  no_of_children: z
    .number({ required_error: "Number of children is required" })
    .nonnegative({ message: "Number of children cannot be negative" }),
  no_of_adults: z
    .number({ required_error: "Number of adults is required" })
    .positive({ message: "There must be at least one adult" }),
  from: z
    .string({ required_error: "Departure location is required" })
    .min(2, { message: "Departure location should be at least 2 characters" }),
  to: z
    .string({ required_error: "Arrival location is required" })
    .min(2, { message: "Arrival location should be at least 2 characters" }),
});

// Product Schema related to stay & travel places
const HotelSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  name: z
    .string({ required_error: "Hotel name is mandatory." })
    .min(2, { message: "Hotel name must have at least 2 characters." }),
  room_type: z
    .string({ required_error: "Room type is mandatory." })
    .min(4, { message: "Room type must have at least 4 characters." }),
  number_of_rooms: z
    .string({ required_error: "Number of rooms is mandatory." })
    .min(1, { message: "Number of rooms must be at least 1." }),
  number_of_days: z
    .string({ required_error: "Number of days is mandatory." })
    .min(1, { message: "Number of days must be at least 1." }),
  check_in_date: z.date({ required_error: "Check-in date is mandatory." }),
  check_out_date: z.date({ required_error: "Check-out date is mandatory." }),
});

const RestaurantSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  name: z
    .string({ required_error: "Restaurant name is mandatory." })
    .min(2, { message: "Restaurant name must have at least 2 characters." }),
  number_of_adult: z
    .string({ required_error: "Number of adults is mandatory." })
    .min(1, { message: "There must be at least one adult." }),
  number_of_children: z.string().optional(),
  avg_price: z.string({ required_error: "Average price is mandatory." }),
});

const PlaceSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  name: z
    .string({ required_error: "Visiting place name is mandatory." })
    .min(2, {
      message: "Visiting place name must have at least 2 characters.",
    }),
  number_of_adult: z
    .string({ required_error: "Number of adults is mandatory." })
    .min(1, { message: "There must be at least one adult." }),
  number_of_children: z.string().optional(),
});

const ProductSchema = z.object({
  base_products: z.array(BaseProductSchema).optional(),
  cars: z.array(CarSchema).optional(),
  trains: z.array(TrainSchema).optional(),
  planes: z.array(PlaneSchema).optional(),
  hotels: z.array(HotelSchema).optional(),
  places: z.array(PlaceSchema).optional(),
  restaurants: z.array(RestaurantSchema).optional(),
});

type ProductsType = z.infer<typeof ProductSchema>;
type ProductKeysType = keyof ProductsType;

const AddQuotationSchema = z.object({
  client_contact_no: z
    .string({ required_error: "Contact number is mandatory." })
    .min(10, { message: "Contact number must be at least 10 digits." })
    .max(15, { message: "Contact number cannot exceed 15 digits." })
    .regex(/^\d+$/, { message: "Enter a valid numeric contact number." }),
  client_email_id: z
    .union([
      z.string().email({ message: "Enter a valid email address." }),
      z.string().length(0),
    ])
    .optional(),
  client_name: z
    .string({ required_error: "Client name is mandatory." })
    .min(3, { message: "Client name must have at least 3 characters." }),
  currency: z.enum(["INR", "USD", "EUR"], {
    required_error: "Currency type selection is mandatory.",
  }),
  destination: z.string().optional(),
  executive: z
    .string({ required_error: "Executive name is mandatory." })
    .min(3, { message: "Executive name must have at least 3 characters." }),
  no_of_adults: z
    .string({ required_error: "Number of adults is mandatory." })
    .min(1, { message: "There must be at least one adult." }),
  no_of_children: z.string().optional(),
  products: ProductSchema.refine(
    (products) =>
      Object.keys(products).some(
        (key) =>
          Array.isArray(products[key as ProductKeysType]) &&
          (products[key as ProductKeysType]?.length ?? 0) > 0,
      ),
    { message: "At least one product must be included." },
  ),
  proposal_date: z.date({
    message: "Enter a valid proposal date.",
    required_error: "Proposal date is mandatory.",
  }),
  subject: z
    .string({ required_error: "Quotation subject is mandatory." })
    .min(3, { message: "Subject must have at least 3 characters." }),
  terms_and_conditions: z.string().optional(),
  thank_you_note: z.string().optional(),
  trip_details: z.string().optional(),
  valid_upto: z.date({
    message: "Enter a valid expiry date.",
    required_error: "Quotation validity date is mandatory.",
  }),
  sub_total: z
    .string({ required_error: "Sub-total is required" })
    .regex(/^\d{1,3}(,\d{2})*(\.\d+)?$/, {
      message: "Sub-total must be a valid number format",
    }),
  discount: z
    .string({ required_error: "Discount is required" })
    .regex(/^\d{1,3}(,\d{2})*(\.\d+)?$/, {
      message: "Discount must be a valid number format",
    }),
  total: z
    .string({ required_error: "Total is required" })
    .regex(/^\d{1,3}(,\d{2})*(\.\d+)?$/, {
      message: "Total must be a valid number format",
    }),
});

type CurrencyType = typeof currencies;
type AddQuotationSchemaType = z.infer<typeof AddQuotationSchema>;

export type { CurrencyType, AddQuotationSchemaType };
export { AddQuotationSchema, currencies };
