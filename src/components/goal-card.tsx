import useTheme from "../hook/useTheme";
import Badge from "./general/badge";
import Row from "./general/row";
import Stack from "./general/stack";
import Typography from "./general/typography";
import CircularProgress from "./charts/progress-donut";
import { View } from "react-native";
import { Canvas, Rect, RadialGradient, vec } from "@shopify/react-native-skia";

interface GoalCardProps {
  title: string;
  description?: string;
  goalAmount: number; // Monto objetivo para la meta
  currentAmount: number; // Monto actual ahorrado
  progress: number; // Porcentaje de progreso (0-100)
  status: boolean; // true para completado, false para en progreso
  size: "sm" | "lg";
}

export default function GoalCard({
  currentAmount,
  goalAmount,
  description,
  progress,
  status,
  title,
  size,
}: GoalCardProps) {
  const { sizes, globalStyles, complete, theme } = useTheme();

  // Función para formatear números al estilo europeo/latino (puntos para miles, coma para decimal)
  const formatNumber = (num: number) => {
    return num.toLocaleString("de-DE", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  };

  return (
    <Row
      width={"48%"}
      justifyContent="center" // Alineado al centro
      alignItem="center"
      customStyles={{
        borderRadius: 1000,
        paddingHorizontal: sizes.xs,
        paddingVertical: sizes.xs,
        backgroundColor: globalStyles.bgContainerStart,
        borderColor: globalStyles.borderContainer,
        borderWidth: 1,
        alignSelf: size === "sm" ? "flex-start" : "stretch", // Aquí está la clave
        gap: sizes.sm, // Espacio entre círculo y texto
      }}
    >
      <View
        style={{
          //backgroundColor: "red",
          width: size === "sm" ? 60 : 80,
          height: size === "sm" ? 60 : 80,
          borderRadius: 1000,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Canvas
          style={{
            flex: 1,
            width: 70,
            height: 70,
            position: "absolute",
            opacity: 0.2,
            borderRadius: 1000,
          }}
          id="sdlajksdasdhasdhjhj"
        >
          <Rect x={0} y={0} width={70} height={70}>
            <RadialGradient
              c={vec(35, 35)}
              r={35}
              colors={[
                "transparent",
                theme.t20,
                theme.t40,
                theme.t60,
                theme.t80,
                theme.t100,
                "transparent",
              ]}
            />
          </Rect>
        </Canvas>
        <CircularProgress
          size={size === "sm" ? 50 : 70} // Tamaño dinámico opcional
          strokeWidth={10}
          text={`${progress.toFixed(0)}%`}
          progressPercent={progress}
        />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Typography
          bold
          fontSize={size === "sm" ? sizes.sm : sizes.lg}
          customStyles={{ color: "white" }}
        >
          {title}
        </Typography>
        {status ? (
          <Badge
            text="Complete"
            type="ghost"
            color={complete.c100}
            iconLeft={"check-circle"}
            size="sm"
          />
        ) : (
          <Typography
            fontSize={size === "sm" ? sizes.sm : sizes.md}
            customStyles={{ color: globalStyles.subtitle, opacity: 0.7 }}
          >
            {formatNumber(currentAmount)}/{goalAmount}
          </Typography>
        )}
      </View>
    </Row>
  );
}
