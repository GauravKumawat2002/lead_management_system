import LeadActions from "@/components/custom/shared/summary-card-with-actions";
import StageTimeline from "@/components/custom/leads/leadDetails/stage-timeline";
import DetailCard from "@/components/custom/shared/detail-card";
import { getLeadById } from "@/services/leadsService";

export default async function LeadDetailPage({
  params,
}: {
  params: { "lead-id": string };
}) {
  const leadId = params["lead-id"];
  let leadDetail: LeadData | undefined;
  // const [prvRecord, setPrvRecord] = useState(null);

  try {
    const response = await getLeadById(leadId);
    leadDetail = response.data;
    // setPrvRecord(leadDetail.prvRecord);
  } catch (error) {
    console.error("Error fetching lead by id", error);
  }

  if (!leadDetail) {
    return (
      <div className="mx-auto text-center">Error loading lead details.</div>
    );
  }

  return (
    <section className="">
      <LeadActions
        props={{
          Name: leadDetail.clientName,
          cardType: "viewLead",
          LeadStage: leadDetail.stage,
          LeadStatus: leadDetail.status,
          className: "sticky top-12",
        }}
      />
      <div className="flex gap-4">
        <StageTimeline stage={leadDetail.stage} />
        <div className="grid w-full grid-cols-2 gap-4">
          <DetailCard
            cardHeading="Executive Details"
            cardData={{
              creator: leadDetail.executive,
              created_at: new Date(leadDetail.createdAt).toDateString(),
              id: leadDetail.leadId,
              stage: leadDetail.stage,
              status: leadDetail.status,
            }}
          />
          <DetailCard
            cardHeading="Primary Details"
            cardData={{
              client_name: leadDetail.clientName,
              client_contact_no: leadDetail.clientContactNo,
              client_email_id: leadDetail.clientEmailId,
              follow_up_time: new Date(
                leadDetail.followUp,
              ).toLocaleTimeString(),
              follow_up_date: new Date(leadDetail.followUp).toDateString(),
              executive: leadDetail.executive,
            }}
          />
          <DetailCard
            cardHeading="Travel Details"
            cardData={{
              enquiry_type: leadDetail.enquiryType,
              package_name: leadDetail.packageName,
              planned_travel_date: new Date(
                leadDetail.plannedTravelDate as Date,
              ).toDateString(),
              destination: leadDetail.destination,
            }}
          />
          <DetailCard
            cardHeading="Budget Details"
            cardData={{
              budget_per_adult: leadDetail.budgetPerAdult,
              no_of_adults: leadDetail.noOfAdults,
              budget_per_child: leadDetail.budgetPerChild,
              no_of_children: leadDetail.noOfChildren,
            }}
          />
        </div>
      </div>
    </section>
  );
}
