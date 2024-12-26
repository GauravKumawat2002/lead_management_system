"use server";

import { AddItinerarySchemaType } from "@/schemas/add-itinerary-form-schema";
import httpClient from "./httpClient";

type AddItineraryResponse =
  | { data: string; status: number; statusText: string }
  | { data: string; status: number };

type GetAllItineraryResponse =
  | {
      data: Omit<ItineraryData, "createdAt" | "updatedAt">[];
      status: number;
      statusText: string;
    }
  | {
      data: string;
      status: number;
    };

type GetItineraryByIdResponse =
  | {
      data: Omit<ItineraryData, "createdAt" | "updatedAt">;
      status: number;
      statusText: string;
    }
  | {
      data: string;
      status: number;
    };

type UpdateItineraryResponse =
  | { data: string; stauts: number; statusText: string }
  | { data: string; status: number };

type DeleteAllItineraryResponse =
  | { data: string; stauts: number; statusText: string }
  | { data: string; status: number };

type DeleteItineraryByIdResponse =
  | { data: string; stauts: number; statusText: string }
  | { data: string; status: number };

type DeleteItineraryByIdsResponse =
  | { data: string; stauts: number; statusText: string }
  | { data: string; status: number };

type GetAllItineraryNameResponse =
  | { data: string[]; stauts: number; statusText: string }
  | { data: string; status: number };

async function addItinerary(
  data: AddItinerarySchemaType,
): Promise<AddItineraryResponse> {
  try {
    const response = await httpClient.post("/itinerary/create", data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}
async function getAllItinerary() {
  try {
    const response = await httpClient.get("/itinerary/fetch");
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}
async function getItineraryById(id: string): Promise<GetItineraryByIdResponse> {
  try {
    const response = await httpClient.get("/itinerary/fetch-by-id", {
      params: { id },
    });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}
async function updateItineraryById(
  id: string,
  itinerary: AddItinerarySchemaType,
): Promise<UpdateItineraryResponse> {
  try {
    const response = await httpClient.post("/itinerary/update", itinerary, {
      params: { id },
    });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}
async function deleteAllItinerary(): Promise<DeleteAllItineraryResponse> {
  try {
    const response = await httpClient.delete("/itinerary/delete-all");
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}
async function deleteItineraryById(
  id: string,
): Promise<DeleteItineraryByIdResponse> {
  try {
    const response = await httpClient.delete(`/itinerary/delete-by-id`, {
      params: { id },
    });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}
async function deleteItineraryByIds(
  ids: string[],
): Promise<DeleteItineraryByIdsResponse> {
  try {
    console.log(ids);
    console.log(ids.join(","));
    const response = await httpClient.delete(`/itinerary/delete-by-ids`, {
      params: { ids: ids.join(",") },
    });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}
async function getAllItineraryNamesService(): Promise<GetAllItineraryNameResponse> {
  try {
    const response = await httpClient.get("/itinerary/fetch-itinerary-names");
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}

export {
  addItinerary,
  getAllItinerary,
  getItineraryById,
  updateItineraryById,
  deleteAllItinerary,
  deleteItineraryById,
  deleteItineraryByIds,
  getAllItineraryNamesService,
};
