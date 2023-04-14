import { get, ref } from "firebase/database";
import React, { useEffect, useMemo } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import "react-tabs/style/react-tabs.scss";
import EmptyAddMeasuring from "../components/EmptyAddMeasuring";
import SelectDate from "../components/SelectDate";
import { auth, database } from "../firebase-config";

const Measuring = () => {
  
  const [startDate, setStartDate] = React.useState(new Date());
  const [measuring, setMeasuring] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [keyDates, setKeyDates] = React.useState([]);
  const [measuringWeightChart, setMeasuringWeightChart] = React.useState([]);
  const [measuringBreastChart, setMeasuringBreastChart] = React.useState([]);
  const [measuringWaistChart, setMeasuringWaistChart] = React.useState([]);
  const [measuringBellyChart, setMeasuringBellyChart] = React.useState([]);
  const [measuringThighChart, setMeasuringThighChart] = React.useState([]);

  useEffect(() => {
    const getMeasuring = async () => {
      const measuringRef = ref(
        database,
        `measuring/${auth?.currentUser?.uid}/${startDate
          .toString()
          .slice(0, 15)}`
      );
      const snapshotMeasuring = await get(measuringRef);
      const dataMeasuring = (await snapshotMeasuring.val())
        ? snapshotMeasuring.val()
        : null;
      setMeasuring(dataMeasuring);
    };
    function cleanup() {
      getMeasuring();
    }
    return cleanup();
  }, [startDate]);

  useEffect(() => {
    const getMeasuring = async () => {
      const measuringRef = ref(database, `measuring/${auth?.currentUser?.uid}`);
      const snapshotMeasuring = await get(measuringRef);
      const dataMeasuringDates = (await snapshotMeasuring.val())
        ? Object.keys(snapshotMeasuring.val())
        : null;

      const dateComparison = (a, b) => {
        const date1 = new Date(a);
        const date2 = new Date(b);
        return date1 - date2;
      };

      const chartSorted =
        dataMeasuringDates && dataMeasuringDates.sort(dateComparison);
      const sortedData = chartSorted.length > 0 && chartSorted.map((key) => snapshotMeasuring.val()[key]);

      const measuringWeight = sortedData.map(
        (item) => item?.facts?.measuringWeight
      );
      const measuringBreast = sortedData.map(
        (item) => item?.facts?.measuringBreast
      );
      const measuringWaist = sortedData.map(
        (item) => item?.facts?.measuringWaist
      );
      const measuringBelly = sortedData.map(
        (item) => item?.facts?.measuringBelly
      );
      const measuringThigh = sortedData.map(
        (item) => item?.facts?.measuringThigh
      );

      const formattedFullDate = chartSorted.map(item => new Date(item));
      const formattedDate = formattedFullDate.map(item => format(item, 'dd MMM yyyy', { locale: ruLocale }));

      setKeyDates(formattedDate);
      setMeasuringWeightChart(measuringWeight);
      setMeasuringBreastChart(measuringBreast);
      setMeasuringWaistChart(measuringWaist);
      setMeasuringBellyChart(measuringBelly);
      setMeasuringThighChart(measuringThigh);
    };
    function cleanup() {
      getMeasuring();
    }
    return cleanup();
  }, [startDate]);

  useEffect(() => {
    const data = {
      labels: keyDates,
      datasets: [
        {
          label: "Вес",
          data: measuringWeightChart,
        },
        {
          label: "Грудь",
          data: measuringBreastChart,
        },
        {
          label: "Талия",
          data: measuringWaistChart,
        },
        {
          label: "Живот",
          data: measuringBellyChart,
        },
        {
          label: "Бедро",
          data: measuringThighChart,
        },
      ],
    };
    setData(data);
  }, [
    keyDates,
    measuringWeightChart,
    measuringBreastChart,
    measuringWaistChart,
    measuringBellyChart,
    measuringThighChart,
  ]);

  const handleSelectDate = (value) => {
    setStartDate(value);
  };

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Дата</Tab>
          <Tab>График</Tab>
        </TabList>
        <TabPanel>
          <div className="date-wrap">
            <SelectDate
              selected={startDate}
              handleSelectDate={handleSelectDate}
              styleTitle={"center"}
            />
          </div>
          {measuring ? (
            <div className="measuring">
              <div className="measuring-item">
                <div className="measuring-grid measuring-grid--3fr">
                  <div className="grid-col__title">Измерения</div>
                  <div className="grid-col__title">Результат</div>
                  <div className="grid-col__title">Цель</div>
                  {/*  */}
                  <div className="grid-col__1">Вес</div>
                  <div className="grid-col__1">
                    {measuring?.facts?.measuringWeight} кг
                  </div>
                  <div className="grid-col__1">
                    {measuring?.targets?.measuringWeightTarget} кг
                  </div>

                  <div className="grid-col__1">Грудь</div>
                  <div className="grid-col__1">
                    {measuring?.facts?.measuringBreast} см
                  </div>
                  <div className="grid-col__1">
                    {measuring?.targets?.measuringBreastTarget} см
                  </div>

                  <div className="grid-col__1">Талия</div>
                  <div className="grid-col__1">
                    {measuring?.facts?.measuringWaist} см
                  </div>
                  <div className="grid-col__1">
                    {measuring?.targets?.measuringWaistTarget} см
                  </div>

                  <div className="grid-col__1">Живот</div>
                  <div className="grid-col__1">
                    {measuring?.facts?.measuringBelly} см
                  </div>
                  <div className="grid-col__1">
                    {measuring?.targets?.measuringBellyTarget} см
                  </div>

                  <div className="grid-col__1">Бедро</div>
                  <div className="grid-col__1">
                    {measuring?.facts?.measuringThigh} см
                  </div>
                  <div className="grid-col__1">
                    {measuring?.targets?.measuringThighTarget} см
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-measuring">
              <EmptyAddMeasuring />
            </div>
          )}
        </TabPanel>
        <TabPanel>
          <div className="content__wrap">
            <div className="chart__title">Мой график измерения</div>
            <Line data={data} />
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Measuring;
