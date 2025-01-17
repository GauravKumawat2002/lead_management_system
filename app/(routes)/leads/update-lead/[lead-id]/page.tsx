"use client";
import AddLeads from "@/components/custom/leads/newLead/add-Leads-form";
import LoadingSpinner from "@/components/custom/shared/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useGetLeadById, useUpdateLeadById } from "@/data/leads";
import { AddLeadsSchemaType } from "@/schemas/add-leads-form-schema";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";

export default function UpdateLeadPage({
  params,
}: {
  params: { "lead-id": string };
}) {
  const leadId = params["lead-id"];
  const { data, isLoading, isSuccess, isError, error } = useGetLeadById(leadId);
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useUpdateLeadById();
  const leadData = data as LeadData;

  useEffect(() => {
    if (isError)
      toast({
        title: "Error fetching lead",
        description: error.message,
        className: "text-xl font-semibold",
        variant: "destructive",
      });
  }, [isError, error, toast]);

  function handleUpdateLead(data: AddLeadsSchemaType, onReset: () => void) {
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
              description: "Lead updated successfully",
              className: "text-xl font-semibold",
            });
            queryClient.invalidateQueries();
            router.push(ROUTES.LEADS);
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
