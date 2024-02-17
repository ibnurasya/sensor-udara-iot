import { format, fromUnixTime } from "date-fns";
import { TimelineData } from "./firebase/get-timeline-data";

export const downloadTimelineDataAsCsv = (timelineData: TimelineData[]) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  const headers = [
    'Tanggal',
    'PM_2_5_ISPU_Number',
    'PM_2_5_SensorValue',
    'PM_10_ISPU_Category',
    'PM_10_ISPU_Number',
    'PM_10_SensorValue',
    'CO_ISPU_Category',
    'CO_ISPU_Number',
    'CO_SensorValue',
    'PM_2_5_ISPU_Category',
  ]
  csvContent += headers.join(',') + '\n';
  timelineData.forEach((row) => {
    const line = [
      format(fromUnixTime(row.date), 'dd-MM-yyyy HH:mm'),
      row.PM_2_5_ISPU_Number,
      row.PM_2_5_SensorValue,
      row.PM_10_ISPU_Category,
      row.PM_10_ISPU_Number,
      row.PM_10_SensorValue,
      row.CO_ISPU_Category,
      row.CO_ISPU_Number,
      row.CO_SensorValue,
      row.PM_2_5_ISPU_Category,
    ]
    csvContent += line.join(',') + '\n';
  })

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  document.body.appendChild(link);
  link.click();
}