"use client";
import { useToast } from "@/hooks/use-toast";
import { useAddLeads } from "@/data/leads";
import { AddLeadsForm } from "@/schemas/add-leads-form-schema";
import AddLeads from "@/components/custom/leads/newLead/add-Leads-form";

export default function page() {
  const { toast } = useToast();
  const { mutate, isSuccess } = useAddLeads();
  function handleAddLead(data: AddLeadsForm, onReset: () => void) {
    isSuccess;
    mutate(data, {
      onSuccess: (response) => {
        if (response.status !== 200) {
          toast({
            title: response.data,
            // description: "Error adding lead",
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
      <AddLeads onSubmit={handleAddLead} />
    </div>
  );
}
