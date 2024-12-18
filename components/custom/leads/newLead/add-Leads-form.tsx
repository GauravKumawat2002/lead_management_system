"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddLeadsSchema,
  AddLeadsSchemaType as AddLeadsSchemaTypeSchema,
} from "@/schemas/add-leads-form-schema";
import CustomFormField from "../../shared/custom-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { camelToSnake, convertToDatetimeLocal } from "@/lib/utils";

export default function AddLeads({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (
    data: AddLeadsSchemaTypeSchema,
    resetForm: () => void,
    navigateRoute?: any,
  ) => void;
  defaultValues?: LeadData;
}) {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  const AddLeadsSchemaType = useForm<AddLeadsSchemaTypeSchema>({
    resolver: zodResolver(AddLeadsSchema),
    defaultValues: defaultValues
      ? {
          ...camelToSnake(defaultValues),
          follow_up: convertToDatetimeLocal(defaultValues.followUp),
          planned_travel_date: defaultValues.plannedTravelDate
            ? new Date(defaultValues.plannedTravelDate)
            : undefined,
          budget_per_adult: defaultValues.budgetPerAdult?.toString(),
          budget_per_child: defaultValues.budgetPerChild?.toString(),
          no_of_adults: defaultValues.noOfAdults?.toString(),
          no_of_children: defaultValues.noOfChildren?.toString(),
        }
      : {
          budget_per_adult: "",
          budget_per_child: "",
          client_contact_no: "",
          client_email_id: "",
          client_name: "",
          destination: "",
          enquiry_type: undefined,
          executive: "",
          follow_up: "",
          no_of_adults: "",
          no_of_children: "",
          package_name: "",
          planned_travel_date: undefined,
          stage: undefined,
          status: undefined,
        },
  });

  const primaryFormFields = [
    {
      control: AddLeadsSchemaType.control,
      label: "Client Name",
      name: "client_name",
      placeholder: "Enter client name",
      type: "text",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Client Contact No",
      name: "client_contact_no",
      placeholder: "Enter client contact no",
      type: "text",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Client Email",
      name: "client_email_id",
      placeholder: "Enter client email",
      type: "text",
      required: false,
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Executive",
      name: "executive",
      placeholder: "Enter executive name",
      type: "text",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Follow Up ",
      name: "follow_up",
      placeholder: "Enter follow up date & time",
      type: "datetime-local",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Stage",
      name: "stage",
      options: [
        { value: "hot", label: "Hot" },
        { value: "warm", label: "Warm" },
        { value: "cold", label: "Cold" },
        { value: "not interested", label: "Not Interested" },
        { value: "not answer", label: "Not Answer" },
        { value: "meeting fixed", label: "Meeting Fixed" },
        { value: "converted to clients", label: "Converted to Clients" },
        { value: "meeting completed", label: "Meeting Completed" },
        { value: "active", label: "Active" },
        { value: "converted to hot deals", label: "Converted to Hot Deals" },
      ],
      placeholder: "Select stage",
      type: "select",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Status",
      name: "status",
      options: [
        { value: "unattended", label: "Unattended" },
        { value: "blocked", label: "Blocked" },
        { value: "proposal sent", label: "Proposal Sent" },
        { value: "spoke", label: "Spoke" },
        { value: "meeting fixed", label: "Meeting Fixed" },
        { value: "met", label: "Met" },
        { value: "closed", label: "Closed" },
        { value: "lost", label: "Lost" },
        { value: "active", label: "Active" },
        { value: "converted", label: "Converted" },
      ],
      placeholder: "Select status",
      type: "select",
    },
  ];
  const travelDetailsFormFields = [
    {
      control: AddLeadsSchemaType.control,
      label: "Enquiry Type",
      name: "enquiry_type",
      options: [
        { value: "flight booking", label: "Flight Booking" },
        { value: "hotel booking", label: "Hotel Booking" },
        { value: "sight seeing", label: "Sight Seeing" },
        { value: "transport", label: "Transport" },
        { value: "other", label: "Other" },
      ],
      placeholder: "Select enquiry type",
      type: "select",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Package",
      name: "package_name",
      placeholder: "Enter package",
      type: "text",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Planned Travel Date",
      name: "planned_travel_date",
      placeholder: "Enter planned travel date",
      type: "date",
      required: false,
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Destination",
      name: "destination",
      placeholder: "Enter destination",
      type: "text",
      required: false,
    },
  ];
  const budgetFormFields = [
    {
      control: AddLeadsSchemaType.control,
      label: "No of Adults",
      name: "no_of_adults",
      placeholder: "Enter no of adults",
      type: "text",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Budget per Adult",
      name: "budget_per_adult",
      placeholder: "Enter budget per adult",
      type: "text",
    },
    {
      control: AddLeadsSchemaType.control,
      label: "No of Children",
      name: "no_of_children",
      placeholder: "Enter no of children",
      type: "text",
      required: false,
    },
    {
      control: AddLeadsSchemaType.control,
      label: "Budget per Child",
      name: "budget_per_child",
      placeholder: "Enter budget per child",
      type: "text",
      required: false,
    },
  ];

  return (
    <Card className="sticky top-80">
      <CardHeader>
        <CardTitle className="text-xl uppercase">
          {defaultValues ? defaultValues.leadId : "Add Lead"}
        </CardTitle>
      </CardHeader>
      <Form {...AddLeadsSchemaType}>
        <form
          onSubmit={AddLeadsSchemaType.handleSubmit((data) => {
            !showButton && setShowButton(true);
            onSubmit(data, AddLeadsSchemaType.reset);
          })}
          method="POST"
        >
          <CardContent className="flex flex-col justify-between gap-4 lg:flex-row">
            <div className="basis-1/3">
              <CardHeader className="pl-0 pt-0 text-primary">
                <CardTitle>PRIMARY DETAILS</CardTitle>
              </CardHeader>
              {primaryFormFields.map((field) => (
                <CustomFormField
                  key={field.name}
                  control={field.control}
                  label={field.label}
                  name={field.name as keyof AddLeadsSchemaTypeSchema}
                  options={field.options}
                  placeholder={field.placeholder}
                  type={field.type}
                  required={field.required}
                />
              ))}
            </div>
            <div className="basis-1/3">
              <CardHeader className="pl-0 pt-0 text-primary">
                <CardTitle>TRAVEL DETAILS</CardTitle>
              </CardHeader>
              {travelDetailsFormFields.map((field) => (
                <CustomFormField
                  key={field.name}
                  control={field.control}
                  label={field.label}
                  name={field.name as keyof AddLeadsSchemaTypeSchema}
                  options={field.options}
                  placeholder={field.placeholder}
                  type={field.type}
                  required={field.required}
                />
              ))}
            </div>
            <div className="basis-1/3">
              <CardHeader className="pl-0 pt-0 text-primary">
                <CardTitle>BUDGET</CardTitle>
              </CardHeader>
              {budgetFormFields.map((field) => (
                <CustomFormField
                  key={field.name}
                  control={field.control}
                  label={field.label}
                  name={field.name as keyof AddLeadsSchemaTypeSchema}
                  placeholder={field.placeholder}
                  type={field.type}
                  required={field.required}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full lg:w-fit">
              {defaultValues ? "Update Lead" : "Add Lead"}
            </Button>
            {showButton && !defaultValues && (
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  router.push(ROUTES.LEADS);
                  setTimeout(() => router.refresh(), 100);
                }}
                className="ml-4 w-full lg:w-fit"
              >
                View All Leads
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
