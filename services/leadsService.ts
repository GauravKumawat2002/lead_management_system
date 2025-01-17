"use server";
import { AddLeadsSchemaType } from "@/schemas/add-leads-form-schema";
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
type GetAllLeadsResponse =
  | {
      data: LeadData[];
      status: number;
      statusText: string;
    }
  | {
      data: any;
      status: number;
    };
type GetLeadByIdResponse =
  | {
      data: LeadData;
      status: number;
      statusText: string;
    }
  | {
      data: any;
      status: number;
    };
type deleteLeadByIdResponse =
  | {
      data: LeadData[];
      status: number;
      statusText: string;
    }
  | {
      data: any;
      status: number;
    };

async function addLead(lead: AddLeadsSchemaType): Promise<AddLeadsResponse> {
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
}
async function getAllLeads(): Promise<GetAllLeadsResponse> {
  try {
    const response = await httpClient.get("/leads/fetch");
    // console.dir(response.data, { depth: null });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    // console.error(error);
    return {
      data: error.response?.data ?? "An error occured!!",
      status: error.response?.status ?? 500,
    };
  }
}
async function getLeadById(id: string): Promise<GetLeadByIdResponse> {
  try {
    const response = await httpClient.get(`/leads/fetch-by-id`, {
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
async function deleteAllLeads() {
  try {
    const response = await httpClient.delete("/leads/delete-all");
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}
async function deleteLeadById(id: string): Promise<deleteLeadByIdResponse> {
  try {
    const response = await httpClient.delete(`/leads/delete-by-id`, {
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
async function deleteLeadByIds(ids: string[]): Promise<deleteLeadByIdResponse> {
  try {
    const response = await httpClient.delete(`/leads/delete-by-ids`, {
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
async function updateLeadById(id: string, lead: AddLeadsSchemaType) {
  try {
    const response = await httpClient.put("/leads/update", lead, {
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

export {
  addLead,
  getAllLeads,
  getLeadById,
  deleteAllLeads,
  deleteLeadById,
  deleteLeadByIds,
  updateLeadById,
};
