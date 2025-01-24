// src/hooks/useResponsive.tsx
import { useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { ResponsiveContext } from "./ResponsiveProvider";

export const useResponsive = () => {
  const overrideScreenSize = useContext(ResponsiveContext);
  const theme = useTheme();

  const isSmallMedia = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumMedia = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeMedia = useMediaQuery(theme.breakpoints.up("md"));

  const isSmall = overrideScreenSize
    ? overrideScreenSize === "small" || (typeof overrideScreenSize === "object" && overrideScreenSize.maxWidth === 600)
    : isSmallMedia;

  const isMedium = overrideScreenSize
    ? overrideScreenSize === "medium" || (typeof overrideScreenSize === "object" && overrideScreenSize.minWidth === 600)
    : isMediumMedia;

  const isLarge = overrideScreenSize
    ? overrideScreenSize === "large" || (typeof overrideScreenSize === "object" && overrideScreenSize.minWidth >= 960)
    : isLargeMedia;

  return { isSmall, isMedium, isLarge };
};
