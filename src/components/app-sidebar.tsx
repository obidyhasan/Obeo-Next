/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import {
  HomeIcon,
  Monitor,
  Users,
  Hamburger,
  Wallet,
  BedSingle,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: HomeIcon,
      isActive: true,
      items: [{ title: "Dashboard", url: "/" }],
    },
    {
      title: "Front Office",
      url: "/front-office",
      icon: Monitor,
      items: [
        { title: "Room Reservation", url: "/front-office/reservation" },
        { title: "Room Registration", url: "/front-office/registration" },
        {
          title: "Reports",
          url: "#",
          items: [
            {
              title: "Airport Pickup Drop Report",
              url: "/front-office/report/airport-pickup-drop",
            },
            {
              title: "Bill Adjustment Report",
              url: "/front-office/report/bill-adjustment-report",
            },
            {
              title: "Bill Transfer Report",
              url: "/front-office/report/bill-transfer-report",
            },
          ],
        },
      ],
    },
    {
      title: "Restaurant",
      url: "/restaurant",
      icon: Hamburger,
      items: [
        {
          title: "Manage Food",
          url: "#",
          items: [
            {
              title: "Food Availability",
              url: "/restaurant/food-availability",
            },
            { title: "Food List", url: "/restaurant/food-list" },
            { title: "Food Variant", url: "/restaurant/food-variant" },
            { title: "Food Menu Type", url: "/restaurant/food-menu-type" },
          ],
        },
      ],
    },
    {
      title: "Banquet",
      url: "/banquet",
      icon: BedSingle,
      items: [
        { title: "Banquet Reservation", url: "/banquet/banquet-reservation" },
        { title: "Banquet Bill Payment", url: "/banquet/bill-payment" },
        { title: "Banquet Calendar", url: "/banquet/banquet-calender" },
        {
          title: "Reports",
          url: "#",
          items: [
            {
              title: "Item Report",
              url: "/banquet/report/banquet-item-report",
            },
            {
              title: "Bill Report",
              url: "/banquet/report/banquet-bill-report",
            },
            {
              title: "Banquet Reservation",
              url: "/banquet/report/banquet-reservation-report",
            },
            {
              title: "Sales Report",
              url: "/banquet/report/banquet-sales-report",
            },
          ],
        },
        {
          title: "Settings",
          url: "#",
          items: [
            { title: "Layout list", url: "/banquet/settings/layout-list" },
            {
              title: "Banquet Type list",
              url: "/banquet/settings/banquet-type-list",
            },
            {
              title: "Occasion Type list",
              url: "/banquet/settings/occasion-type-list",
            },
          ],
        },
      ],
    },
    {
      title: "Human Resource",
      url: "/hr",
      icon: Users,
      items: [
        {
          title: "Attendance",
          url: "#",
          items: [
            { title: "Attendance", url: "/hr/attendance" },
            {
              title: "Attendance Report",
              url: "/hr/attendance/attendance-report",
            },
          ],
        },
        {
          title: "Award",
          url: "#",
          items: [{ title: "New Award", url: "/hr/award/new-award" }],
        },
        {
          title: "Recruitment",
          url: "#",
          items: [
            { title: "New Candidate", url: "/hr/recruitment/create-candidate" },
            {
              title: "Manage Candidate",
              url: "/hr/recruitment/manage-candidate",
            },
            {
              title: "Candidate Shortlist",
              url: "/hr/recruitment/candidate-shortlist",
            },
            { title: "Interview", url: "/hr/recruitment/interview" },
            {
              title: "Candidate Selection",
              url: "/hr/recruitment/candidate-selection",
            },
          ],
        },
        {
          title: "Department",
          url: "#",
          items: [
            { title: "Manage Division", url: "/hr/department/manage-division" },
          ],
        },
        {
          title: "Employee",
          url: "#",
          items: [
            {
              title: "Employee Performance",
              url: "/hr/employee/employee-performance",
            },
            {
              title: "Manage Employee Salary",
              url: "/hr/employee/manage-employee-salary",
            },
          ],
        },
        {
          title: "Leave",
          url: "#",
          items: [
            { title: "Weekly Holiday", url: "/hr/leave/weekly-holiday" },
            { title: "Holiday", url: "/hr/leave/holiday" },
            { title: "Add Leave Type", url: "/hr/leave/add-leave-type" },
            { title: "Leave Application", url: "/hr/leave/leave-application" },
          ],
        },
        {
          title: "Loan",
          url: "#",
          items: [
            { title: "Grant Loan", url: "/hr/loan/grant-loan" },
            { title: "Loan Installment", url: "/hr/loan/loan-installment" },
            { title: "Loan Report", url: "/hr/loan/loan-report" },
          ],
        },
        {
          title: "Payroll",
          url: "#",
          items: [
            {
              title: "Salary Type Setup",
              url: "/hr/payroll/salary-type-setup",
            },
            { title: "Salary Setup", url: "/hr/payroll/salary-setup" },
            { title: "Salary Generate", url: "/hr/payroll/salary-generate" },
          ],
        },
      ],
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: Wallet,
      items: [
        { title: "Dashboard", url: "/accounts/dashboard" },
        { title: "Financial Year", url: "/accounts/financial-year" },
        { title: "Opening Balance", url: "/accounts/opening-balance" },
        { title: "Debit Voucher", url: "/accounts/debit-voucher" },
        { title: "Credit Voucher", url: "/accounts/credit-voucher" },
        { title: "Contra Voucher", url: "/accounts/contra-voucher" },
        { title: "Journal Voucher", url: "/accounts/journal-voucher" },
        { title: "Voucher Approval", url: "/accounts/voucher-approval" },
        {
          title: "Account Report",
          url: "#",
          items: [
            { title: "Trial Balance", url: "/accounts/report/trial-balance" },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: any }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
