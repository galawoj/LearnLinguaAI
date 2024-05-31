import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { type LevelType } from "../../types/LevelType";
import { useAppContext } from "../../store/app-context";

export default function LanguageLevel() {
  const { handleChangeLevel: onChangeLevel } = useAppContext();

  const [level, setLevel] = React.useState("B2 Upper intermediate");

  const handleChange = (event: SelectChangeEvent) => {
    const eventValue = event.target.value as LevelType;
    setLevel(eventValue);
    onChangeLevel(eventValue);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="demo-select-small-label">
        poziom znajomości języka
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={level}
        label="model"
        onChange={handleChange}
      >
        <MenuItem value={"A1 Beginner"}>Początkujący</MenuItem>
        <MenuItem value={"A2 Pre-intermediate"}>Podstawowy</MenuItem>
        <MenuItem value={"B1 Lower intermediate"}>
          Niższy średnio zaawansowany
        </MenuItem>
        <MenuItem value={"B2 Upper intermediate"}>
          Wyższy średnio zaawansowany
        </MenuItem>
        <MenuItem value={"C1 Advanced"}>Zaawansowany</MenuItem>
        <MenuItem value={"C2 Proficient"}>Biegły/profesjonalny</MenuItem>
      </Select>
    </FormControl>
  );
}
