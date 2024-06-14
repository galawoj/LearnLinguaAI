import * as React from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { type ModelType } from "../../types/ModelType";
import { useAppContext } from "../../store/app-context";

export default function SelectModel() {
  const { setGPTModel: onChangeModel } = useAppContext();

  const [model, setModel] = React.useState("gpt-3.5-turbo");

  const handleChange = (event: SelectChangeEvent) => {
    const eventValue = event.target.value as ModelType;
    setModel(eventValue);
    onChangeModel(eventValue);
  };

  return (
    <FormControl fullWidth margin="normal">
      <Select
        id="demo-select-small"
        value={model}
        onChange={handleChange}
        sx={{
          color: "inherit",
          font: "inherit",
          fontSize: "14px",
          fontWeight: "300",
          backgroundColor: "rgba(255,255,255,0.07)",
        }}
      >
        <MenuItem value={"gpt-4o"}>GPT-4o New</MenuItem>
        <MenuItem value={"gpt-4-turbo"}>GPT-4 Turbo</MenuItem>
        <MenuItem value={"gpt-3.5-turbo"}>GPT-3.5 Turbo</MenuItem>
      </Select>
    </FormControl>
  );
}
