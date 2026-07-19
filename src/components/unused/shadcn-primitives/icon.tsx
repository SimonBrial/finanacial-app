import { TextClassContext } from "./text";
import type { LucideIcon, LucideProps } from "lucide-react-native";
import { cssInterop } from "nativewind";
import * as React from "react";
import { cn } from "./utils";
import useTheme from "@/hooks/useTheme";

type IconProps = LucideProps & {
  as: LucideIcon;
  className?: string;
} & React.RefAttributes<LucideIcon>;

function IconImpl({ as: IconComponent, ...props }: IconProps) {
  return <IconComponent {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: "size",
      width: "size",
    },
  },
});

function Icon({
  as: IconComponent,
  className,
  size = 14,
  ...props
}: IconProps) {
  const { isDark } = useTheme();
  return (
    <IconImpl
      as={IconComponent}
      className={cn(isDark ? "text-slate-50" : "text-slate-900", className)}
      size={size}
      {...props}
    />
  );
}

export { Icon };
