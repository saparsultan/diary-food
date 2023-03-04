import { get, push, ref } from "firebase/database";
import React, { useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import EmptyAddMeasuring from "../components/EmptyAddMeasuring";
import SelectDate from "../components/SelectDate";
import { auth, database } from "../firebase-config";

const Measuring = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [measuring, setMeasuring] = React.useState(null);

  const handleSelectDate = (value) => {
    setStartDate(value);
  };

  useEffect(() => {
    const getMeasuring = async () => {
      const measuringRef = ref(
        database,
        `measuring/${auth?.currentUser?.uid}/${startDate.toString().slice(0, 15)}`
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

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Дата</Tab>
          <Tab>График</Tab>
        </TabList>
        <TabPanel>
          <SelectDate
            selected={startDate}
            handleSelectDate={handleSelectDate}
            styleTitle={"center"}
          />
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
        <TabPanel>Пока нет</TabPanel>
      </Tabs>
    </>
  );
};

export default Measuring;
