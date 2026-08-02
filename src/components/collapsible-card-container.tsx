import useTheme from "../hooks/useTheme";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Icon } from "./unused/shadcn-primitives/icon";
import {
  EllipsisVertical,
  ChartColumnBig,
  LucideIcon,
  RotateCcw,
} from "lucide-react-native";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./unused/shadcn-primitives/accordion";

interface CollapsibleCardContainerProps {
  children: React.ReactNode;
  title: string;
  as: LucideIcon;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export default function CollapsibleCardContainer({
  children,
  title,
  as = ChartColumnBig,
  onRefresh,
  isLoading = false,
}: CollapsibleCardContainerProps) {
  const { isDark } = useTheme();

  return (
    <Accordion
      className={`"flex-1 justify-start rounded-[20] shadow" ${isDark ? "border border-zinc-700 bg-bgContainerDark" : "border border-white bg-slate-100"} `}
      type="single"
      collapsable
    >
      <AccordionItem value={title}>
        <AccordionTrigger>
          <View className="flex-1 flex-row justify-center items-center">
            <View className="flex-1 flex-row gap-2 items-center justify-start">
              {onRefresh ? (
                <TouchableOpacity
                  onPress={onRefresh}
                  activeOpacity={0.7}
                  disabled={isLoading}
                  className="p-1"
                >
                  {isLoading ? (
                    <ActivityIndicator
                      size="small"
                      color={isDark ? "#ffffff" : "#0f172a"}
                    />
                  ) : (
                    <Icon as={as} size={24} />
                  )}
                </TouchableOpacity>
              ) : (
                <Icon as={as} size={24} />
              )}
              <Text
                variant={"h3"}
                className={`my-0 w-[85%] font-medium ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {title}
              </Text>
            </View>
            {title.toLowerCase() === "dolar price" && (
              <View className="flex-row items-center">
                <Button size={"icon"} onPress={onRefresh} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Icon as={RotateCcw} size={20} className="px-4" />
                  )}
                </Button>
                {/* 
                <Button size={"icon"}>
                  <Icon as={EllipsisVertical} size={20} className="px-4" />
                </Button> */}
              </View>
            )}
          </View>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
