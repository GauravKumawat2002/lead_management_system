"use client";
import AddItineraryForm from "@/components/custom/proposals/itinerary/newItinerary/add-itinerary-form";
import { useAddItinerary } from "@/data/itinerary";
import { useToast } from "@/hooks/use-toast";
import { AddItinerarySchemaType } from "@/schemas/add-itinerary-form-schema";

export default function NewItineraryPage() {
  const { toast } = useToast();
  const { mutate } = useAddItinerary();
  function handleAddItinerary(
    data: AddItinerarySchemaType,
    onReset: () => void,
  ) {
    mutate(data, {
      onSuccess: (response) => {
        if (response.status !== 200) {
          toast({
            title: response.data,
            className: "text-xl font-semibold",
            variant: "destructive",
          });
        }
        if (response.status === 200) {
          onReset();
          toast({
            title: response.data,
            description: "Itinerary added successfully",
            className: "text-xl font-semibold",
          });
        }
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: "Error adding Itinerary",
          className: "text-xl font-semibold",
          variant: "destructive",
        });
      },
    });
  }
  return <AddItineraryForm onSubmit={handleAddItinerary} />;
}
