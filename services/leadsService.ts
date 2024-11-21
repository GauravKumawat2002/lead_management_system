"use server";
import { AddLeadsForm } from "@/schemas/add-leads-form-schema";
import httpClient from "./httpClient";
type AddLeadsResponse =
  | {
      data: any;
      status: number;
      statusText: string;
    }
  | {
      data: any;
      status: number;
    };

export const addLead = async (
  lead: AddLeadsForm,
): Promise<AddLeadsResponse> => {
  try {
    const response = await httpClient.post("/leads/create", lead);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
};
