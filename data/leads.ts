import { AddLeadsForm } from "@/schemas/add-leads-form-schema";
import { addLead } from "@/services/leadsService";
import { useMutation } from "@tanstack/react-query";

export function useAddLeads() {
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
