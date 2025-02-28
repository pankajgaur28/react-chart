import { Chart } from "react-google-charts";

import {
  selectData,
  selectGraphType,
} from './graphSlice';
import { useSelector } from 'react-redux';

function Graphs() {
  const chartData = useSelector(selectData);
  const graphType = useSelector(selectGraphType);

  return (
    <>
      <div>
        <Chart
          chartType={graphType}
          data={chartData}
          width="100vh"
          height="100vh"
        />
      </div>
      
    </>
  )
}

export default Graphs;