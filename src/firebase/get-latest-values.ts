import {
  DatabaseReference,
  child,
  get,
  getDatabase,
  limitToFirst,
  query,
  ref,
} from "firebase/database";
import { TimelineData } from "./get-timeline-data";

export type LatestValue = {
  ISPU_Category: string;
  ISPU_Number: string;
  SensorValue: string;
};

export type LatestValues = {
  PM_2_5: LatestValue;
  PM_10: LatestValue;
  CO: LatestValue;
};

const defaultLatestValue = {
  ISPU_Category: "",
  ISPU_Number: "",
  SensorValue: "",
}

export const getLatestValues = async (timelineData: TimelineData[]): Promise<LatestValues> => {
  const result = {
    PM_2_5: defaultLatestValue,
    PM_10: defaultLatestValue,
    CO: defaultLatestValue,
  }

  if (timelineData.length != 0) {
    const latestData = timelineData[0];

    result.PM_2_5 = {
      ISPU_Category: latestData.PM_2_5_ISPU_Category,
      ISPU_Number: latestData.PM_2_5_ISPU_Number,
      SensorValue: latestData.PM_2_5_SensorValue,
    }
    result.PM_10 = {
      ISPU_Category: latestData.PM_10_ISPU_Category,
      ISPU_Number: latestData.PM_10_ISPU_Number,
      SensorValue: latestData.PM_10_SensorValue,
    }
    result.CO = {
      ISPU_Category: latestData.CO_ISPU_Category,
      ISPU_Number: latestData.CO_ISPU_Number,
      SensorValue: latestData.CO_SensorValue,
    }
  }

  return result
}

export const _getLatestValues = async (): Promise<LatestValues> => {
  const database = getDatabase();
  const CO_ref = ref(database, "/CO/");
  const PM_2_5_ref = ref(database, "/PMduattklima/");
  const PM_10_ref = ref(database, "/PMsepuluh/");

  return {
    PM_2_5: await getValueByRef(PM_2_5_ref),
    PM_10: await getValueByRef(PM_10_ref),
    CO: await getValueByRef(CO_ref),
  };
};

const getValueByRef = async (dbRef: DatabaseReference) => {
  const initialValues = {
    ISPU_Category: "",
    ISPU_Number: "",
    SensorValue: "",
  };

  const processes = Object.keys(initialValues).map((key) => {
    return new Promise((resolve) => {
      const valueRef = child(dbRef, `/${key}/`);
      const queryVal = query(valueRef, limitToFirst(1));

      get(queryVal).then((snapshot) => {
        if (!snapshot.val()) {
          resolve(null);
        }

        snapshot.forEach((child) => {
          initialValues[key as keyof typeof initialValues] =
            child.val() as string;
          resolve(null);
        });
      });
    });
  });

  await Promise.all(processes);

  return initialValues;
};
