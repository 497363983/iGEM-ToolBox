import { createPinia } from "pinia";
import { useConfigStore } from "./config";
import { useReferenceStore } from "./reference";
import { useUserStore } from "./user";
import { useGitLabStore } from "./gitlab";
import { useTeamStore } from "./team";
import { useTemplateStore } from "./template";
import { useWikiEditorStore } from "./wikiEditor";

const pinia = createPinia();

export { pinia, useConfigStore, useReferenceStore, useUserStore, useGitLabStore, useTeamStore, useTemplateStore, useWikiEditorStore };