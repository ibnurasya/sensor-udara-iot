import {
  getDatabase,
  ref,
  query,
  startAt,
  endAt,
  get,
  orderByKey,
} from "firebase/database";

export type TimelineData = {
  date: number;
  PM_2_5_ISPU_Category: string;
  PM_2_5_ISPU_Number: string;
  PM_2_5_SensorValue: string;
  PM_10_ISPU_Category: string;
  PM_10_ISPU_Number: string;
  PM_10_SensorValue: string;
  CO_ISPU_Category: string;
  CO_ISPU_Number: string;
  CO_SensorValue: string;
};

const refMap: Record<string, string> = {
  PM_2_5: "PMduattklima",
  PM_10: "PMsepuluh",
  CO: "CO",
};

export const getTimelineData = async (startDate: string, endDate: string) => {
  const result: TimelineData[] = [];

  const initializeIndex = (key: number) => {
    result[key] = {
      date: Math.abs(key),
      PM_2_5_ISPU_Category: "",
      PM_2_5_ISPU_Number: "",
      PM_2_5_SensorValue: "",
      PM_10_ISPU_Category: "",
      PM_10_ISPU_Number: "",
      PM_10_SensorValue: "",
      CO_ISPU_Category: "",
      CO_ISPU_Number: "",
      CO_SensorValue: "",
    } as TimelineData;
  };

  const processes: Promise<null>[] = [];

  for (const itemType of ["PM_2_5", "PM_10", "CO"]) {
    for (const itemAttr of ["ISPU_Category", "ISPU_Number", "SensorValue"]) {
      const itemRef = refMap[itemType];
      const database = getDatabase();
      const queryRef = ref(database, `/${itemRef}/${itemAttr}`);
      const queryResult = query(
        queryRef,
        orderByKey(),
        startAt(startDate),
        endAt(endDate),
      );

      processes.push(new Promise((resolve) => {
        get(queryResult).then((snapshot) => {
          if (!snapshot.hasChildren()) {
            console.log('failed get', itemType, itemAttr)
            resolve(null);
          }

          snapshot.forEach((child) => {
            const key = Number(child.key);
            const val = child.val();

            if (!result[key]) {
              initializeIndex(key);
            }

            const item_properties = `${itemType}_${itemAttr}` as keyof TimelineData

            result[key][item_properties] = val as never;
            resolve(null);
          });
        });
      }));
    }
  }

  await Promise.all(processes)

  return Object.values(result);
};
