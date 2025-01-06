"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddItinerarySchema,
  AddItinerarySchemaType,
} from "@/schemas/add-itinerary-form-schema";
import { ROUTES } from "@/routes/routes";
import { camelToSnake } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/custom/shared/custom-form-field";
import { RichTextEditorRef } from "@/components/custom/shared/custom-rich-text-editor";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function AddItineraryForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (
    data: AddItinerarySchemaType,
    resetForm: () => void,
    navigateRoute?: any,
  ) => void;
  defaultValues?: ItineraryData;
}) {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const form = useForm<AddItinerarySchemaType>({
    resolver: zodResolver(AddItinerarySchema),
    defaultValues: defaultValues
      ? camelToSnake(defaultValues)
      : {
          template_name: "",
          subject: "",
          trip_details: "",
          thank_you_note: "",
          terms_and_conditions: "",
        },
  });
  // 2. Create refs for each RTE field
  const tripDetailsRef = useRef<RichTextEditorRef>(null);
  const thankYouNoteRef = useRef<RichTextEditorRef>(null);
  const termsConditionsRef = useRef<RichTextEditorRef>(null);

  const formFields = [
    {
      control: form.control,
      label: "Template Name",
      name: "template_name",
      placeholder: "Enter template name",
      type: "text",
      required: true,
    },
    {
      control: form.control,
      label: "Subject",
      name: "subject",
      placeholder: "Enter subject",
      type: "text",
      required: true,
    },
  ];
  // 3. Update rteFormFields with refs
  const rteFormFields = [
    {
      control: form.control,
      label: "Trip Details",
      name: "trip_details",
      placeholder: "Enter Trip Details",
      type: "rich-text",
      required: false,
      ref: tripDetailsRef,
    },
    {
      control: form.control,
      label: "Thank You Note",
      name: "thank_you_note",
      placeholder: "Enter thank you note",
      type: "rich-text",
      required: false,
      ref: thankYouNoteRef,
    },
    {
      control: form.control,
      label: "Terms and Conditions",
      name: "terms_and_conditions",
      placeholder: "Enter terms and conditions",
      type: "rich-text",
      required: false,
      ref: termsConditionsRef,
    },
  ];

  return (
    <Card className="sticky top-80">
      <CardHeader>
        <CardTitle>New Template</CardTitle>
      </CardHeader>{" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
            !showButton && setShowButton(true); // Clear RTEs after submission
            onSubmit(data, form.reset);
            tripDetailsRef.current?.setData("");
            thankYouNoteRef.current?.setData("");
            termsConditionsRef.current?.setData("");
          })}
          method="POST"
        >
          <CardContent className="flex flex-col justify-between gap-4">
            <div className="flex flex-col lg:flex-row lg:gap-4">
              {formFields.map((field) => (
                <div className="w-full" key={field.name}>
                  <CustomFormField
                    key={field.name}
                    control={field.control}
                    label={field.label}
                    name={field.name as keyof AddItinerarySchemaType}
                    placeholder={field.placeholder}
                    type={field.type}
                    required={field.required}
                  />
                </div>
              ))}
            </div>
            <div>
              {rteFormFields.map((field) => (
                <CustomFormField
                  key={field.name}
                  control={field.control}
                  label={field.label}
                  name={field.name as keyof AddItinerarySchemaType}
                  placeholder={field.placeholder}
                  type={field.type}
                  required={field.required}
                  ref={field.ref}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full lg:w-fit">
              {defaultValues ? "Update Itinerary" : "Add Itinerary"}
            </Button>
            {showButton && !defaultValues && (
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  router.push(ROUTES.ITINERARY);
                  setTimeout(() => router.refresh(), 100);
                }}
                className="ml-4 w-full lg:w-fit"
              >
                View All Itinerary
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
