import { getDatabase, ref, query, startAt, orderByKey, limitToFirst, get, Database } from 'firebase/database';
import { getListOfDatesFromToday } from './utils';
import { setHours, setMinutes } from 'date-fns';

type ChartValue = {
  date: Date
  value: number
}

type ChartValues = {
  CO: ChartValue[]
  PM_2_5: ChartValue[]
  PM_10: ChartValue[]
}

export const getChartValues = async (): Promise<ChartValues> => {
  const database = getDatabase();

  const [CO, PM_2_5, PM_10] = await Promise.all([
    getValuesByType(database, '/CO/ISPU_Number'),
    getValuesByType(database, '/PMduattklima/ISPU_Number'),
    getValuesByType(database, '/PMsepuluh/ISPU_Number'),
  ])

  return {
    CO,
    PM_2_5,
    PM_10,
  }
}

const getValuesByType = async (database: Database, path: string) => {
  const itemsRef = ref(database, path);

  const dates = getListOfDatesFromToday()

  const results: Promise<ChartValue>[] = []

  for (const date of dates) {
    const process = new Promise<ChartValue>((resolve) => {
      const unixTime = Math.floor(setMinutes(setHours(date, 15), 0).getTime() / 1000);
      const startValue = `-${unixTime}`;
      const valueQuery = query(itemsRef, orderByKey(), startAt(startValue), limitToFirst(1));

      get(valueQuery).then(snapshot => {
        if (!snapshot.val()) {
          resolve({
            date,
            value: 0,
          })
        }

        snapshot.forEach(child => {
          resolve({
            date,
            value: child.val()
          })
        })
      })
    })
    results.push(process)
  }

  return await Promise.all(results);
}

