import { useContext } from "react";
import { PlantContext } from "providers/PlantContext";

export default function usePlantContext() {
  return useContext(PlantContext);
}
