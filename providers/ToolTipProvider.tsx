"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

const ToolTipProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};

export default ToolTipProvider;
