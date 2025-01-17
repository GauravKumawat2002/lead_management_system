import { AddLeadsSchemaType } from "@/schemas/add-leads-form-schema";
import {
  addLead,
  getAllLeads,
  getLeadById,
  updateLeadById,
} from "@/services/leadsService";
import { useMutation, useQuery } from "@tanstack/react-query";

function useAddLeads() {
  return useMutation({
    mutationKey: ["addLeads"],
    mutationFn: async (data: AddLeadsSchemaType) => {
      return await addLead(data);
    },
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.error("Error adding lead", error);
    },
  });
}

function useGetAllLeads() {
  return useQuery({
    queryKey: ["getAllLeads"],
    queryFn: async () => {
      return await getAllLeads();
    },
  });
}

function useGetLeadById(leadId: string) {
  return useQuery({
    queryKey: ["getLeadById", leadId],
    queryFn: async () => {
      try {
        const response = await getLeadById(leadId);
        if (response.status !== 200) {
          throw new Error(response.data);
        }
        return response.data as LeadData;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });
}
function useUpdateLeadById() {
  return useMutation({
    mutationKey: ["updateLeadById"],
    mutationFn: async ({
      leadId,
      data,
    }: {
      leadId: string;
      data: AddLeadsSchemaType;
    }) => {
      return await updateLeadById(leadId, data);
    },
  });
}

export { useAddLeads, useGetAllLeads, useGetLeadById, useUpdateLeadById };
