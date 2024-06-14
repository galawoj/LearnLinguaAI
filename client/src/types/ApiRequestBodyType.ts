import { type ModelType } from "./ModelType";
import { type ApiMessageType } from "./ApiMessageType";

export type ApiRequestBodyType = {
    model: ModelType,
    messages: ApiMessageType[],
  };