import { useContext } from "react";
import { CollectionsContext } from "../contexts/CollectionsContext";

export function useCollections() {
  return useContext(CollectionsContext);
}
