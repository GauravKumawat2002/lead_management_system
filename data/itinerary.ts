import { AddItinerarySchemaType } from "@/schemas/add-itinerary-form-schema";
import {
  addItinerary,
  getItineraryById,
  updateItineraryById,
} from "@/services/itineraryService";
import { useMutation, useQuery } from "@tanstack/react-query";

function useAddItinerary() {
  return useMutation({
    mutationKey: ["addItinerary"],
    mutationFn: async (data: AddItinerarySchemaType) => {
      return await addItinerary(data);
    },
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.error("Error adding lead", error);
    },
  });
}
function useGetItineraryById(itineraryId: string) {
  return useQuery({
    queryKey: ["getItineraryById", itineraryId],
    queryFn: async () => {
      try {
        const response = await getItineraryById(itineraryId);
        if (response.status !== 200) {
          throw new Error(
            typeof response.data === "string"
              ? response.data
              : JSON.stringify(response.data),
          );
        }
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });
}
function useUpdateItineraryById() {
  return useMutation({
    mutationKey: ["updateItineraryById"],
    mutationFn: async ({
      itineraryId,
      data,
    }: {
      itineraryId: string;
      data: AddItinerarySchemaType;
    }) => {
      const response = await updateItineraryById(itineraryId, data);
      console.log(response);
      return response;
    },
  });
}
export { useAddItinerary, useGetItineraryById, useUpdateItineraryById };
