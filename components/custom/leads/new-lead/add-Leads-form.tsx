"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddLeadsSchema,
  AddLeadsForm as AddLeadsFormSchema,
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
export default function AddLeads() {
  const addLeadsForm = useForm<AddLeadsFormSchema>({
    resolver: zodResolver(AddLeadsSchema),
    defaultValues: {
      budget_per_adult: undefined,
      budget_per_child: undefined,
      client_contact_no: "",
      client_email_id: "",
      client_name: "",
      enquiry_type: undefined,
      executive: "",
      follow_up_date: undefined,
      follow_up_time: "",
      no_of_adults: undefined,
      no_of_children: undefined,
      package: "",
      planned_travel_date: undefined,
      stage: undefined,
      status: undefined,
    },
  });

  const primaryFormFields = [
    {
      control: addLeadsForm.control,
      label: "Client Name",
      name: "client_name",
      placeholder: "Enter client name",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "Client Contact No",
      name: "client_contact_no",
      placeholder: "Enter client contact no",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "Client Email",
      name: "client_email_id",
      placeholder: "Enter client email",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "Executive",
      name: "executive",
      placeholder: "Enter executive name",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "Follow Up Date",
      name: "follow_up_date",
      placeholder: "Enter follow up date",
      type: "date",
    },
    {
      control: addLeadsForm.control,
      label: "Follow Up Time",
      name: "follow_up_time",
      placeholder: "Enter follow up time (24 hour format)",
      type: "text",
    },

    {
      control: addLeadsForm.control,
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
      control: addLeadsForm.control,
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
      control: addLeadsForm.control,
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
      control: addLeadsForm.control,
      label: "Package",
      name: "package",
      placeholder: "Enter package",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "Planned Travel Date",
      name: "planned_travel_date",
      placeholder: "Enter planned travel date",
      type: "date",
    },
  ];
  const budgetFormFields = [
    {
      control: addLeadsForm.control,
      label: "Destination",
      name: "destination",
      placeholder: "Enter destination",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "No of Adults",
      name: "no_of_adults",
      placeholder: "Enter no of adults",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "Budget per Adult",
      name: "budget_per_adult",
      placeholder: "Enter budget per adult",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "No of Children",
      name: "no_of_children",
      placeholder: "Enter no of children",
      type: "text",
    },
    {
      control: addLeadsForm.control,
      label: "Budget per Child",
      name: "budget_per_child",
      placeholder: "Enter budget per child",
      type: "text",
    },
  ];

  function onSubmit(data: AddLeadsFormSchema) {
    console.log(data);
    addLeadsForm.reset();
  }

  return (
    <Card className="sticky top-80">
      <CardHeader>
        <CardTitle className="text-xl uppercase">Add Lead</CardTitle>
      </CardHeader>
      <Form {...addLeadsForm}>
        <form onSubmit={addLeadsForm.handleSubmit(onSubmit)} method="POST">
          <CardContent className="flex justify-between gap-4">
            <div className="basis-1/3">
              <CardHeader className="pl-0 pt-0 text-primary">
                <CardTitle>PRIMARY DETAILS</CardTitle>
              </CardHeader>
              {primaryFormFields.map((field) => (
                <CustomFormField
                  key={field.name}
                  control={field.control}
                  label={field.label}
                  name={field.name as keyof AddLeadsFormSchema}
                  options={field.options}
                  placeholder={field.placeholder}
                  type={field.type}
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
                  name={field.name as keyof AddLeadsFormSchema}
                  options={field.options}
                  placeholder={field.placeholder}
                  type={field.type}
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
                  name={field.name as keyof AddLeadsFormSchema}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
