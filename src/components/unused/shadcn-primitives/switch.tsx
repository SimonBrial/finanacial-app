import * as SwitchPrimitives from "@rn-primitives/switch";
import * as React from "react";
import { Platform, Animated } from "react-native";
import { cn } from "./utils";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root>;

const AnimatedThumb = Animated.createAnimatedComponent(SwitchPrimitives.Thumb);

function Switch({ className, ...props }: SwitchProps) {
  const translateX = React.useRef(
    new Animated.Value(props.checked ? 20 : 0),
  ).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: props.checked ? 16 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [props.checked]);

  return (
    <SwitchPrimitives.Root
      className={cn(
        "flex h-6 w-11 shrink-0 flex-row items-center rounded-full border border-transparent shadow-sm shadow-black/5 justify-start px-0.5",
        Platform.select({
          web: "focus-visible:border-ring focus-visible:ring-ring/50 peer inline-flex outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed",
        }),
        props.checked ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700",
        props.disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <AnimatedThumb
        style={{
          transform: [{ translateX }],
        }}
        className={cn(
          "bg-white size-5 rounded-full shadow-sm",
          Platform.select({
            web: "pointer-events-none block ring-0",
          }),
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
