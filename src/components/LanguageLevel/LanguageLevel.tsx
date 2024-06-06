import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { type LevelType } from "../../types/LevelType";
import { useAppContext } from "../../store/app-context";

export default function LanguageLevel() {
  const { setLanguageLevel: onChangeLevel, languageLevel } = useAppContext();

  // const [level, setLevel] = React.useState("B2 Upper intermediate");

  const handleChange = (event: SelectChangeEvent) => {
    const eventValue = event.target.value as LevelType;
    // setLevel(eventValue);
    onChangeLevel(eventValue);
  };

  return (
    <FormControl fullWidth margin="normal">
      <Select
        id="demo-select-small"
        value={languageLevel}
        onChange={handleChange}
        sx={{
          color: "inherit",
          font: "inherit",
          fontSize: "14px",
          fontWeight: "300",
          backgroundColor: "rgba(255,255,255,0.07)",
        }}
      >
        <MenuItem value={"A1 Beginner"}>Początkujący (A1)</MenuItem>
        <MenuItem value={"A2 Pre-intermediate"}>Podstawowy (A2)</MenuItem>
        <MenuItem value={"B1 Lower intermediate"}>
          Niższy średnio zaawansowany (B1)
        </MenuItem>
        <MenuItem value={"B2 Upper intermediate"}>
          Wyższy średnio zaawansowany (B2)
        </MenuItem>
        <MenuItem value={"C1 Advanced"}>Zaawansowany (C1)</MenuItem>
        <MenuItem value={"C2 Proficient"}>Biegły/profesjonalny (C2)</MenuItem>
      </Select>
    </FormControl>
  );
}
