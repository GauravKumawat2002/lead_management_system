export const ROUTES = {
  HOME: "/",
  LEADS: "/leads",
  NEW_LEADS: "/leads/new-lead",
  LEADS_DETAILS: (leadId: string) => `/leads/lead-detail/${leadId}`,
  UPDATE_LEAD: (leadId: string) => `/leads/update-lead/${leadId}`,
  FOLLOW_UP_LEADS: "/leads/follow-up-leads",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  LOGOUT: "/log-out",
};
