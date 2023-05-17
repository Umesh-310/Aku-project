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
    label: "Employee",
    icon: IconNotes,
    links: [
      { label: "Add Employee", link: "addemployee" },
      { label: "Delete Employee", link: "viewemployee" },
      { label: "View Employee", link: "viewuser" },
      { label: "Update Employee", link: "updateuser" },
    ],
  },
  {
    label: "Attendance",
    icon: IconCalendarStats,
    links: [
      { label: "View Attendance", link: "viewattendance" },
      { label: "Add Attendance", link: "addattendance" },
    ],
  },
  {
    label: "Leave",
    icon: IconHomeMove,
    links: [
      { label: "View Leave", link: "viewleave" },
      { label: "Update Leave", link: "updateleave" },
      { label: "Add Leave", link: "leaverequest" },
    ],
  },
];
