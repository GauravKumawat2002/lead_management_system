import { columns } from "@/components/custom/leads/columns";
import { DataTable } from "@/components/custom/leads/data-table";
import { getAllLeads } from "@/services/leadsService";

export default async function page() {
  const { data: leads } = await getAllLeads();
  return (
    <>
      <div className="mx-auto">
        <DataTable columns={columns} data={leads} />
      </div>
    </>
  );
}
