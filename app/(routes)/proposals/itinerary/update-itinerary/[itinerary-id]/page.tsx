"use client";
import LoadingSpinner from "@/components/custom/shared/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { useGetItineraryById, useUpdateItineraryById } from "@/data/itinerary";
import AddItineraryForm from "@/components/custom/proposals/itinerary/newItinerary/add-itinerary-form";
import { AddItinerarySchemaType } from "@/schemas/add-itinerary-form-schema";

export default function page({
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
  const { mutate } = useUpdateItineraryById();
  const itineraryData: ItineraryData = data;

  useEffect(() => {
    isError &&
      toast({
        title: "Error fetching Itinerary",
        description: error.message,
        className: "text-xl font-semibold",
        variant: "destructive",
      });
  }, [isError, error, toast]);

  function handleUpdateItinerary(
    data: AddItinerarySchemaType,
    onReset: () => void,
  ) {
    mutate(
      { itineraryId, data },
      {
        onSuccess: (response) => {
          if (response.status !== 200) {
            console.log("problem aa rhi h");
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
              description: "Itinerary updated successfully",
              className: "text-xl font-semibold",
            });
            queryClient.invalidateQueries();
            router.push(ROUTES.ITINERARY);
          }
        },
        onError: (error) => {
          toast({
            title: error.message,
            description: "Error updating Itinerary",
            className: "text-xl font-semibold",
            variant: "destructive",
          });
        },
      },
    );
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
            onSubmit={handleUpdateItinerary}
            defaultValues={itineraryData}
          />
        </section>
      )}
    </div>
  );
}
