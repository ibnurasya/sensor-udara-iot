import { getDatabase, ref, query, startAt, orderByKey, limitToFirst, get, Database } from 'firebase/database';
import { getListOfDatesFromToday } from './utils';
import { format, fromUnixTime, setHours, setMinutes } from 'date-fns';
import { TimelineData } from './get-timeline-data';

type ChartValue = {
  date: Date
  value: number
}

type ChartValues = {
  CO: ChartValue[]
  PM_2_5: ChartValue[]
  PM_10: ChartValue[]
}

export const getChartValues = async (timelineData: TimelineData[]): Promise<ChartValues> => {
  const result: ChartValues = {
    CO: [],
    PM_2_5: [],
    PM_10: [],
  }

  const dates = getListOfDatesFromToday()

  for (const date of dates) {
    let CO_value = 0;
    let PM_2_5_value = 0;
    let PM_10_value = 0;

    const dataInDate = timelineData.filter((_timelineData) => {
      return format(date, "yyyy-MMM-dd") === format(fromUnixTime(_timelineData.date), "yyyy-MMM-dd")
    })

    let sum_CO_value = 0;
    let sum_PM_2_5_value = 0;
    let sum_PM_10_value = 0;

    dataInDate.forEach((_timelineData) => {
      sum_CO_value += Number(_timelineData.CO_ISPU_Number) ?? 0
      sum_PM_2_5_value += Number(_timelineData.PM_2_5_ISPU_Number) ?? 0
      sum_PM_10_value += Number(_timelineData.PM_10_ISPU_Number) ?? 0
    })

    if (dataInDate.length > 0) {
      CO_value = Math.round(sum_CO_value / dataInDate.length)
      PM_2_5_value = Math.round(sum_PM_2_5_value / dataInDate.length)
      PM_10_value = Math.round(sum_PM_10_value / dataInDate.length)
    }

    result.PM_2_5.push({
      date,
      value: PM_2_5_value,
    })
    result.PM_10.push({
      date,
      value: PM_10_value,
    })
    result.CO.push({
      date,
      value: CO_value,
    })
  }

  console.log('trace chart data', result)

  return result
}

export const _getChartValues = async (): Promise<ChartValues> => {
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

