"use client";
import AddLeads from "@/components/custom/leads/newLead/add-Leads-form";
import LoadingSpinner from "@/components/custom/shared/LoadingSpinner";
import { useAddLeads, useGetLeadById } from "@/data/leads";
import { useToast } from "@/hooks/use-toast";
import { AddLeadsForm } from "@/schemas/add-leads-form-schema";

export default function page({ params }: { params: { "lead-id": string } }) {
  const leadId = params["lead-id"];
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLeadById(leadId);
  const { toast } = useToast();
  const { mutate } = useAddLeads();
  const leadData: ConvertObjectKeysToCamel<LeadData> = response?.data;
  console.log(response?.data);

  function handleAddLead(data: AddLeadsForm, onReset: () => void) {
    mutate(data, {
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
        }
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: "Error adding lead",
          className: "text-xl font-semibold",
          variant: "destructive",
        });
      },
    });
  }
  return (
    <div>
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <section>
          <AddLeads onSubmit={handleAddLead} defaultValues={leadData} />
        </section>
      )}
    </div>
  );
}
