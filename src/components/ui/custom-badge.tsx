import { View } from "react-native";
import Svg, {
  LinearGradient,
  Text as SvgText,
  Defs,
  Stop,
  Rect,
} from "react-native-svg";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

type BankNameTypes =
  | "payoneer"
  | "banesco"
  | "mercantil"
  | "bdv"
  | "provincial"
  | "paypal";

// Definimos la estructura de los datos de cada banco
const BANK_CONFIGS: Record<BankNameTypes, string[]> = {
  payoneer: [
    "#FF4D00",
    "#FF00A8",
    "#9747FF",
    "#0075FF",
    "#00C2FF",
    "#00FF47",
    "#FFD600",
  ],
  paypal: ["#27346A", "#2790C3"],
  banesco: ["#147957", "#104374"],
  mercantil: ["#004A99", "#FFCC00"],
  bdv: ["#0041D3", "#FF0000"],
  provincial: ["#004481", "#043263"],
  // Puedes seguir agregando más bancos aquí...
};

interface CustomBadgeProps {
  bankName: BankNameTypes; // El ID para buscar (ej: "banesco")
  width?: number;
  height?: number;
}

const strokeWidth = 1;

export default function CustomBadge({
  bankName,
  width = 54,
  height = 18,
}: CustomBadgeProps) {
  // Buscamos los colores. Si el banco no existe, usamos uno por defecto (gris).
  const colors = BANK_CONFIGS[bankName.toLowerCase() as BankNameTypes] || [
    "#888",
    "#444",
  ];
  const gradientId = `grad-${bankName.toLowerCase()}`;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, index) => (
              <Stop
                key={index}
                offset={`${(index * 100) / (colors.length - 1)}%`}
                stopColor={color}
              />
            ))}
          </LinearGradient>
        </Defs>

        {/* Borde de la Badge */}
        <Rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={height / 2}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Texto con degradado */}
        <SvgText
          fill={`url(#${gradientId})`}
          fontSize="10"
          fontWeight="bold"
          x="50%"
          y="58%" // Ajuste manual para centrado visual
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {capitalizeFirstLetter(bankName)}
        </SvgText>
      </Svg>
    </View>
  );
}
