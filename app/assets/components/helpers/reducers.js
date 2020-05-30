import { camelizeKeys } from "humps";
import { Map } from "immutable";

export const parseJson = json => camelizeKeys(JSON.parse(json));

export const simpleMap = (json = "[]", Record, idAttr = "id") =>
  Map(
    parseJson(json).map(r => {
      const record = new Record(r);
      return [record[idAttr], record];
    })
  );
