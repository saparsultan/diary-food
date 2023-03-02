import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import SelectDate from '../components/SelectDate'

const Measuring = () => {
  const [startDate, setStartDate] = React.useState(new Date());
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
        <SelectDate selected={startDate} handleSelectDate={handleSelectDate} />
        </TabPanel>
        <TabPanel>
          ddffff
        </TabPanel>
      </Tabs>
    </>
  )
}

export default Measuring