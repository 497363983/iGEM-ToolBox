import { createPinia } from "pinia";
import { useConfigStore } from "./config";
import { useReferenceStore } from "./reference";
import { useUserStore } from "./user";

const pinia = createPinia();

export { pinia, useConfigStore, useReferenceStore, useUserStore };