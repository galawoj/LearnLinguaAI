import { type ModelType } from "./ModelType";
import { type DialogueElementType } from "./DialogueElementType";

export type ApiRequestBodyType = {
    model: ModelType,
    messages: DialogueElementType[],
  };