import { columns } from "@/components/custom/leads/columns";
import { DataTable } from "@/components/custom/leads/data-table";
import ErrorDisplay from "@/components/custom/shared/error-display";
import { getAllLeads } from "@/services/leadsService";

export default async function page() {
  try {
    const response = await getAllLeads();
    if (response.status !== 200) throw response.data;
    return (
      <>
        <div className="mx-auto">
          <DataTable
            columns={columns}
            data={response.data}
            handleButtonInteractionType="Lead"
          />
        </div>
      </>
    );
  } catch (error) {
    return <ErrorDisplay message={error as string} />;
  }
}
