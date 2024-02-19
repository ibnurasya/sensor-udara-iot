import { useEffect, useState } from "react";
import { LatestValues, getLatestValues } from "./firebase/get-latest-values";
import styled from "styled-components";
import LatestValueCard from "./LatestValueCard";
import { TimelineData } from "./firebase/get-timeline-data";

const defaultValue = {
  ISPU_Category: "",
  ISPU_Number: "",
  SensorValue: "",
};

const defaultLatestValues = {
  PM_2_5: defaultValue,
  PM_10: defaultValue,
  CO: defaultValue,
};

const LatestValueContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  margin-top: 2rem;
`;

export type LatestValueProps = {
  timelineData: TimelineData[]
}

const LatestValue = ({ timelineData }: LatestValueProps) => {
  const [latestValues, setLatestValues] =
    useState<LatestValues>(defaultLatestValues);

  useEffect(() => {
    (async () => {
      const newLatestValues = await getLatestValues(timelineData);
      setLatestValues(newLatestValues);
    })();
  }, [timelineData]);

  return (
    <>
      <LatestValueContainer>
        <LatestValueCard
          cardTitle={"PM 2.5"}
          ispuValue={latestValues.PM_2_5.ISPU_Number}
          sensorValue={latestValues.PM_2_5.SensorValue}
          categoryValue={latestValues.PM_2_5.ISPU_Category}
        />
        <LatestValueCard
          cardTitle={"PM 10"}
          ispuValue={latestValues.PM_10.ISPU_Number}
          sensorValue={latestValues.PM_10.SensorValue}
          categoryValue={latestValues.PM_10.ISPU_Category}
        />
        <LatestValueCard
          cardTitle={"CO"}
          ispuValue={latestValues.CO.ISPU_Number}
          sensorValue={latestValues.CO.SensorValue}
          categoryValue={latestValues.CO.ISPU_Category}
        />
      </LatestValueContainer>
    </>
  );
};

export default LatestValue;
