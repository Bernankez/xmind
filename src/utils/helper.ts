export type DataType = Map<string, "number" | "string" | "Date">

/**
 * transform csv to Array
 * @param csv
 * @param dataType
 */
export function handleCSV(csv: string, dataType?: DataType) {
  const list = csv.split("\r\n");
  const fields = list.length > 0 ? list.shift()!.split(",") : [];
  return list.map((val) => {
    const data = val.split(",");
    const rtn = {} as any;
    for (let i = 0; i < fields.length; i++) {
      const type = dataType?.get(fields[i]);
      switch (type) {
        case "number":
          rtn[fields[i]] = Number(data[i]);
          break;
        case  "Date":
          rtn[fields[i]] = new Date(Number(data[i]));
          break;
        default:
          rtn[fields[i]] = data[i];
      }
    }
    return rtn;
  });
}