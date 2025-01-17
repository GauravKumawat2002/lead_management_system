"use client";
import LoadingSpinner from "@/components/custom/shared/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { useAddItinerary, useGetItineraryById } from "@/data/itinerary";
import AddItineraryForm from "@/components/custom/proposals/itinerary/newItinerary/add-itinerary-form";
import { AddItinerarySchemaType } from "@/schemas/add-itinerary-form-schema";
export default function DuplicateItineraryPage({
  params,
}: {
  params: { "itinerary-id": string };
}) {
  const itineraryId = params["itinerary-id"];
  const { data, isLoading, isSuccess, isError, error } =
    useGetItineraryById(itineraryId);
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useAddItinerary();
  const itineraryData: ItineraryData = data;

  useEffect(() => {
    if (isError)
      toast({
        title: "Error fetching Itinerary",
        description: error.message,
        className: "text-xl font-semibold",
        variant: "destructive",
      });
  }, [isError, error, toast]);

  function handleDuplicateItinerary(
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
          queryClient.invalidateQueries();
          router.push(ROUTES.ITINERARY);
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
  return (
    <div>
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {isSuccess && itineraryData && (
        <section>
          <AddItineraryForm
            key={itineraryData.itineraryId}
            onSubmit={handleDuplicateItinerary}
            defaultValues={{
              ...itineraryData,
              templateName: itineraryData.templateName + " (Duplicate)",
            }}
          />
        </section>
      )}
    </div>
  );
}
