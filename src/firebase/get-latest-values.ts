import {
  DatabaseReference,
  child,
  get,
  getDatabase,
  limitToFirst,
  query,
  ref,
} from "firebase/database";

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

export const getLatestValues = async (): Promise<LatestValues> => {
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
