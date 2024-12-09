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

async function addLead(lead: AddLeadsForm): Promise<AddLeadsResponse> {
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
    return { data: error.response.data, status: error.response.status };
  }
}
async function getLeadById(leadId: string): Promise<GetLeadByIdResponse> {
  try {
    const response = await httpClient.get(`/leads/fetch-by-id`, {
      params: { leadId },
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
async function deleteLeadById(leadId: string): Promise<deleteLeadByIdResponse> {
  try {
    const response = await httpClient.delete(`/leads/delete-by-id`, {
      params: { leadId },
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
async function deleteLeadByIds(
  leadIds: string[],
): Promise<deleteLeadByIdResponse> {
  try {
    const response = await httpClient.delete(`/leads/delete-by-ids`, {
      params: { leadIds: leadIds.join(",") },
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
async function updateLeadById(leadId: string, lead: AddLeadsForm) {
  try {
    const response = await httpClient.put("/leads/update", lead, {
      params: { lead_id: leadId },
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
