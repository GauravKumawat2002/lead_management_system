export const ROUTES = {
  HOME: "/",
  // routes for leads
  LEADS: "/leads",
  NEW_LEADS: "/leads/new-lead",
  LEADS_DETAILS: (leadId: string) => `/leads/lead-detail/${leadId}`,
  UPDATE_LEAD: (leadId: string) => `/leads/update-lead/${leadId}`,
  FOLLOW_UP_LEADS: "/leads/follow-up-leads",
  // routes for itineraries
  ITINERARY: "/proposals/itinerary",
  NEW_ITINERARY: "/proposals/itinerary/new-itinerary",
  UPDATE_ITINERARY: (itineraryId: string) =>
    `/proposals/itinerary/update-itinerary/${itineraryId}`,
  DUPLICATE_ITINERARY: (itineraryId: string) =>
    `/proposals/itinerary/duplicate-itinerary/${itineraryId}`,
  // routes for quotaions
  QUOTATIONS: "/proposals/quotations",
  NEW_QUOTATION: (id?: string) =>
    id
      ? `/proposals/quotations/new-quotation/${id}`
      : "/proposals/quotations/new-quotation",
  UPDATE_QUOTATION: (quotationId: string) =>
    `/proposals/quotations/update-quotation/${quotationId}`,
  DUPLICATE_QUOTATION: (quotationId: string) =>
    `/proposals/quotations/duplicate-quotation/${quotationId}`,
  // routes for auth
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  LOGOUT: "/log-out",
};
