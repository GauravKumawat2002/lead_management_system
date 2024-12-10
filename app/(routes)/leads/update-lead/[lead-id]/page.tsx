"use client";
import AddLeads from "@/components/custom/leads/newLead/add-Leads-form";
import LoadingSpinner from "@/components/custom/shared/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useGetLeadById, useUpdateLeadById } from "@/data/leads";
import { AddLeadsForm } from "@/schemas/add-leads-form-schema";
import { useQueryClient } from "@tanstack/react-query";
export default function page({ params }: { params: { "lead-id": string } }) {
  const leadId = params["lead-id"];
  const { data, isLoading, isSuccess, isError, error } = useGetLeadById(leadId);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useUpdateLeadById();
  const leadData: LeadData = data;

  useEffect(() => {
    isError &&
      toast({
        title: "Error fetching lead",
        description: error.message,
        className: "text-xl font-semibold",
        variant: "destructive",
      });
  }, [isError, error, toast]);

  function handleUpdateLead(data: AddLeadsForm, onReset: () => void) {
    mutate(
      { leadId, data },
      {
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
              description: "Lead added successfully",
              className: "text-xl font-semibold",
            });
            queryClient.invalidateQueries();
          }
        },
        onError: (error) => {
          toast({
            title: error.message,
            description: "Error updating lead",
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
      {isSuccess && leadData && (
        <section>
          <AddLeads
            key={leadData.leadId}
            onSubmit={handleUpdateLead}
            defaultValues={leadData}
          />
        </section>
      )}
    </div>
  );
}
