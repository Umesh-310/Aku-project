import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconHomeMove,
} from "@tabler/icons-react";

export const mockdata = [
  { label: "My Dashboard", icon: IconGauge },
  { label: "My Profile", icon: IconGauge, link: "profile" },
  {
    label: "Attendance",
    icon: IconCalendarStats,
    links: [{ label: "Add Attendance", link: "addattendance" }],
  },
  {
    label: "Leave",
    icon: IconHomeMove,
    links: [
      { label: "Leave Request", link: "leaverequest" },
      // { label: "Update Leave", link: "updateleave" },
    ],
  },
];
