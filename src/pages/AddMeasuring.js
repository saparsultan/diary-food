import { get, ref, set } from "firebase/database";
import React, { useEffect } from "react";
import AddedMeasuring from "../components/AddedMeasuring";
import SelectDate from "../components/SelectDate";
import { auth, database } from "../firebase-config";

const AddMeasuring = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [measuringDate, setMeasuringDate] = React.useState(null);

  const [measuringWeight, setMeasuringWeight] = React.useState(0);
  const [measuringBreast, setMeasuringBreast] = React.useState(0);
  const [measuringWaist, setMeasuringWaist] = React.useState(0);
  const [measuringBelly, setMeasuringBelly] = React.useState(0);
  const [measuringThigh, setMeasuringThigh] = React.useState(0);

  const [measuringWeightTarget, setMeasuringWeightTarget] = React.useState(0);
  const [measuringBreastTarget, setMeasuringBreastTarget] = React.useState(0);
  const [measuringWaistTarget, setMeasuringWaistTarget] = React.useState(0);
  const [measuringBellyTarget, setMeasuringBellyTarget] = React.useState(0);
  const [measuringThighTarget, setMeasuringThighTarget] = React.useState(0);

  useEffect(() => {
    const getMeasuring = async () => {
      const measuringRef = ref(
        database,
        `measuring/${auth?.currentUser?.uid}/${startDate
          .toString()
          .slice(0, 15)}`
      );
      const snapshotMeasuring = await get(measuringRef);
      const idMeasuring = (await snapshotMeasuring.val())
        ? snapshotMeasuring.key
        : null;
      setMeasuringDate(idMeasuring);
    };
    function cleanup() {
      getMeasuring();
    }
    return cleanup();
  }, [startDate]);

  const handleChangeWeight = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringWeight(value);
  };
  const handleChangeBreast = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringBreast(value);
  };
  const handleChangeWaist = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringWaist(value);
  };
  const handleChangeBelly = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringBelly(value);
  };
  const handleChangeThigh = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringThigh(value);
  };

  const handleChangeWeightTarget = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringWeightTarget(value);
  };
  const handleChangeBreastTarget = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringBreastTarget(value);
  };
  const handleChangeWaistTarget = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringWaistTarget(value);
  };
  const handleChangeBellyTarget = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringBellyTarget(value);
  };
  const handleChangeThighTarget = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMeasuringThighTarget(value);
  };

  let subWeight = measuringWeight - measuringWeightTarget;
  let subBreast = measuringBreast - measuringBreastTarget;
  let subWaist = measuringWaist - measuringWaistTarget;
  let subBelly = measuringBelly - measuringBellyTarget;
  let subThigh = measuringThigh - measuringThighTarget;

  let lessWeight = measuringWeight > measuringWeightTarget;
  let lessBreast = measuringBreast > measuringBreastTarget;
  let lessWaist = measuringWaist > measuringWaistTarget;
  let lessBelly = measuringBelly > measuringBellyTarget;
  let lessThigh = measuringThigh > measuringThighTarget;

  const handleSelectDate = (value) => {
    setStartDate(value);
  };

  const handleAddMeasuring = (e) => {
    e.preventDefault();

    const dataMeasuring = {
      facts: {
        measuringWeight,
        measuringBreast,
        measuringWaist,
        measuringBelly,
        measuringThigh,
      },
      targets: {
        measuringWeightTarget,
        measuringBreastTarget,
        measuringWaistTarget,
        measuringBellyTarget,
        measuringThighTarget,
      },
    };

    if (
      auth?.currentUser &&
      measuringWeight > 0 &&
      measuringBreast > 0 &&
      measuringWaist > 0 &&
      measuringBelly > 0 &&
      measuringThigh > 0 &&
      measuringWeightTarget > 0 &&
      measuringBreastTarget > 0 &&
      measuringWaistTarget > 0 &&
      measuringBellyTarget > 0 &&
      measuringThighTarget > 0
    ) {
      const measuringValue = ref(
        database,
        `measuring/${auth?.currentUser?.uid}/${startDate
          ?.toString()
          .slice(0, 15)}`
      );
      set(measuringValue, dataMeasuring);
    } else {
      console.log("Ошибка");
    }
  };

  return (
    <div>
      <div className="date-wrap">
        <SelectDate
          selected={startDate}
          handleSelectDate={handleSelectDate}
          styleTitle={"center"}
        />
      </div>
      {measuringDate !== startDate.toString().slice(0, 15) ? (
        <>
          {" "}
          <div className="measuring">
            <div className="measuring-item">
              <div className="measuring-grid">
                <div></div>
                <div>Ввод</div>
                <div></div>
                <div>Цель</div>
                {/*  */}
                <div className="grid-col__1">Вес</div>
                <div className="grid-col__input grid-col__input-kg">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringWeight}
                    onChange={handleChangeWeight}
                  />
                </div>
                <div
                  className="grid-col__3"
                  style={
                    lessWeight ? { color: "#f57474" } : { color: "#019852" }
                  }
                >
                  {measuringWeightTarget < measuringWeight ? "+" : ""}
                  {subWeight}
                </div>
                <div className="grid-col__input grid-col__input-kg">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringWeightTarget}
                    onChange={handleChangeWeightTarget}
                  />
                </div>
                {/*  */}
                <div className="grid-col__1">Грудь</div>
                <div className="grid-col__input grid-col__input-cm">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringBreast}
                    onChange={handleChangeBreast}
                  />
                </div>
                <div
                  className="grid-col__3"
                  style={
                    lessBreast ? { color: "#f57474" } : { color: "#019852" }
                  }
                >
                  {measuringBreastTarget < measuringBreast ? "+" : ""}
                  {subBreast}
                </div>
                <div className="grid-col__input grid-col__input-cm">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringBreastTarget}
                    onChange={handleChangeBreastTarget}
                  />
                </div>

                {/*  */}
                <div className="grid-col__1">Талия</div>
                <div className="grid-col__input grid-col__input-cm">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringWaist}
                    onChange={handleChangeWaist}
                  />
                </div>
                <div
                  className="grid-col__3"
                  style={
                    lessWaist ? { color: "#f57474" } : { color: "#019852" }
                  }
                >
                  {measuringWaistTarget < measuringWaist ? "+" : ""}
                  {subWaist}
                </div>
                <div className="grid-col__input grid-col__input-cm">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringWaistTarget}
                    onChange={handleChangeWaistTarget}
                  />
                </div>

                {/*  */}
                <div className="grid-col__1">Живот</div>
                <div className="grid-col__input grid-col__input-cm">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringBelly}
                    onChange={handleChangeBelly}
                  />
                </div>
                <div
                  className="grid-col__3"
                  style={
                    lessBelly ? { color: "#f57474" } : { color: "#019852" }
                  }
                >
                  {measuringBellyTarget < measuringBelly ? "+" : ""}
                  {subBelly}
                </div>
                <div className="grid-col__input grid-col__input-cm">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringBellyTarget}
                    onChange={handleChangeBellyTarget}
                  />
                </div>

                {/*  */}
                <div className="grid-col__1">Бедро</div>
                <div className="grid-col__input grid-col__input-cm">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringThigh}
                    onChange={handleChangeThigh}
                  />
                </div>
                <div
                  className="grid-col__3"
                  style={
                    lessThigh ? { color: "#f57474" } : { color: "#019852" }
                  }
                >
                  {measuringThighTarget < measuringThigh ? "+" : ""}
                  {subThigh}
                </div>
                <div className="grid-col__input grid-col__input-cm">
                  <input
                    type="number"
                    className="form-item__input"
                    placeholder="0"
                    value={measuringThighTarget}
                    onChange={handleChangeThighTarget}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-footer">
            <button className="btn btn--one" onClick={handleAddMeasuring}>
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <div className="empty-measuring">
          <AddedMeasuring />
        </div>
      )}
    </div>
  );
};

export default AddMeasuring;
