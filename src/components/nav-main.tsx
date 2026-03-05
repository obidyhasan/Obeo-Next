/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

function RenderMenuItems(items: any[], isSub = false) {
  if (!items) return null;

  const Container = isSub ? SidebarMenuSub : SidebarMenu;

  return (
    <Container>
      {items.map((item) => {
        const hasChildren = item.items && item.items.length > 0;

        return (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible cursor-pointer"
          >
            {isSub ? (
              <SidebarMenuSubItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuSubButton asChild>
                    {hasChildren ? (
                      <button className="flex items-center w-full cursor-pointer">
                        {item.icon && <item.icon />}
                        <span className="ml-2">{item.title} </span>

                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        className="flex items-center w-full "
                      >
                        {item.icon && <item.icon />}
                        {item.badge && (
                          <SidebarMenuBadge>
                            <span className="ml-auto rounded-full bg-[#d66a12] px-2  text-[10px] text-white relative -top-3 left-1 ">
                              {item.badge}
                            </span>
                          </SidebarMenuBadge>
                        )}

                        <span className="ml-2">{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuSubButton>
                </CollapsibleTrigger>

                {hasChildren && (
                  <CollapsibleContent>
                    {RenderMenuItems(item.items, true)}
                  </CollapsibleContent>
                )}
              </SidebarMenuSubItem>
            ) : (
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {hasChildren && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {hasChildren && (
                  <CollapsibleContent>
                    {RenderMenuItems(item.items, true)}
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            )}
          </Collapsible>
        );
      })}
    </Container>
  );
}

export function NavMain({ items }: { items: any[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Features</SidebarGroupLabel>
      {RenderMenuItems(items)}
    </SidebarGroup>
  );
}
