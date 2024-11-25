import { AddLeadsForm } from "@/schemas/add-leads-form-schema";
import { addLead, getAllLeads, getLeadById } from "@/services/leadsService";
import { useMutation, useQuery } from "@tanstack/react-query";

function useAddLeads() {
  return useMutation({
    mutationKey: ["addLeads"],
    mutationFn: async (data: AddLeadsForm) => {
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
      return await getLeadById(leadId);
    },
  });
}

export { useAddLeads, useGetAllLeads, useGetLeadById };
