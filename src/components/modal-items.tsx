import { TouchableOpacity } from "react-native";
import Typography from "./ui/typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ModalItems({ icon, label, onPress }: { icon: any, label: string, onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderWidth: 1, borderColor: "#979797", borderRadius: 10, backgroundColor: "#1c1c1c", width: "90%", marginBottom: 10 }}>
            <MaterialIcons name={icon} size={24} color="white" />
            <Typography fontSize={16} customStyles={{ fontWeight: 'bold', color: 'white' }}>{label}</Typography>
        </TouchableOpacity>
    );
}