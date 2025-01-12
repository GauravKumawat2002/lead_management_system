import { z } from "zod";

const currencies = [
  { label: "Indian Rupee (₹)", value: "INR" },
  { label: "US Dollar ($)", value: "USD" },
  { label: "Euro (€)", value: "EUR" },
  // { label: "British Pound (£)", value: "GBP" },
  // { label: "Japanese Yen (¥)", value: "JPY" },
  // { label: "Chinese Yuan (¥)", value: "CNY" },
  // { label: "UAE Dirham (د.إ)", value: "AED" },
  // { label: "Singapore Dollar (S$)", value: "SGD" },
] as const;

const BaseProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string({ required_error: "Name field is required" })
    .min(2, { message: "Name should be at least 2 characters" }),
  description: z
    .string()
    .min(15, { message: "Product description should be minimum 15 words" })
    .optional(),
  quantity: z
    .string({ required_error: "Specify the quantity" })
    .min(1, { message: "Minimum amount to be entered is one" }),
  price: z.string({ required_error: "Please specify the price" }),
});

const CarSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  number_of_cars: z
    .string({ required_error: "Number of cars is required" })
    .min(1, { message: "Minimun number of cars is one" }),
  number_of_days: z
    .string({ required_error: "Rental duration is required" })
    .min(1, { message: "Minimum rental period is one day" }),
});

const HotelSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  name: z
    .string({ required_error: "Hotel name is required" })
    .min(2, { message: "Hotel name should be at least 2 characters" }),
  room_type: z
    .string({ required_error: "Room type is required" })
    .min(4, { message: "Room type should be at least 4 characters " }),
  number_of_rooms: z
    .string({ required_error: "Number of Rooms are required" })
    .min(1, { message: "Minimum number of rooms is 1" }),
  number_of_days: z
    .string({ required_error: "Number of days is required" })
    .min(1, { message: "Number of days should be at least 1" }),
  check_in_date: z.date({ required_error: "Check in date is requried" }),
  check_out_date: z.date({ required_error: "Check out date is required" }),
});

const PlaceSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  name: z
    .string({ required_error: "Name of visiting place is required" })
    .min(2, {
      message: "Visiting place name should be at least 2 characters ",
    }),
  number_of_adult: z
    .string({ required_error: "Number of Adults is required" })
    .min(1, { message: "Should have atleast one adult" }),
  number_of_children: z.string().optional(),
});

const RestaurentSchema = BaseProductSchema.omit({
  quantity: true,
  description: true,
}).extend({
  name: z
    .string({ required_error: "Restaurent Name is required" })
    .min(2, { message: "Restaurent name should be at least 2 characters" }),
  number_of_adult: z
    .string({ required_error: "Number of Adults is required" })
    .min(1, { message: "Should have atleast one adult" }),
  number_of_children: z.string().optional(),
  avg_price: z.string({ required_error: "Price is required" }),
});

const ProductSchema = z.object({
  base_products: z.array(BaseProductSchema).optional(),
  cars: z.array(CarSchema).optional(),
  hotels: z.array(HotelSchema).optional(),
  places: z.array(PlaceSchema).optional(),
  restaurents: z.array(RestaurentSchema).optional(),
});

const AddQuotationSchema = z.object({
  client_contact_no: z
    .string({ required_error: "Contact number is required" })
    .min(10, { message: "Contact number must be at least 10 digits" })
    .max(15, { message: "Contact number cannot exceed 15 digits" })
    .regex(/^\d+$/, { message: "Please enter a valid contact number" }),
  client_email_id: z
    .union([
      z.string().email({ message: "Please enter a valid email address" }),
      z.string().length(0),
    ])
    .optional(),
  client_name: z
    .string({ required_error: "Client name is required" })
    .min(3, { message: "Client name should be at least 3 characters" }),
  currency: z.enum(
    [
      "INR",
      "USD",
      "EUR",
      //  "GBP", "JPY", "CNY", "AED", "SGD"
    ],
    {
      required_error: "Please select a currency type",
    },
  ),
  destination: z.string().optional(),
  executive: z
    .string({ required_error: "Executive name is required" })
    .min(3, { message: "Executive name should be at least 3 characters" }),
  no_of_adults: z
    .string({ required_error: "Number of adults is required" })
    .min(1, { message: "Please specify at least one adult" }),
  no_of_children: z.string().min(0).optional(),
  products: ProductSchema.refine(
    (product) =>
      (product.cars && product.cars?.length > 0) ||
      (product.hotels && product.hotels?.length > 0) ||
      (product.places && product.places?.length > 0),
    { message: "Atleast one product must be included" },
  ),
  proposal_date: z.date({
    message: "Please enter a valid date",
    required_error: "Proposal date is required",
  }),
  subject: z
    .string({ required_error: "Quotation subject is required" })
    .min(3, { message: "Subject should be at least 3 characters" }),
  terms_and_conditions: z.string().optional(),
  thank_you_note: z.string().optional(),
  trip_details: z.string().optional(),
  valid_upto: z.date({
    message: "Please enter a valid expiry date",
    required_error: "Quotation validity date is required",
  }),
});

type Currency = typeof currencies;
type AddQuotationSchemaType = z.infer<typeof AddQuotationSchema>;

export type { Currency, AddQuotationSchemaType };
export { AddQuotationSchema, currencies };
