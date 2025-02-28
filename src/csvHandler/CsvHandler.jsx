import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Papa from 'papaparse';
import '../App.css';
import {
  setData,
  setGraphType,
  selectGraphType,
  selectData
} from '../graphs/graphSlice';
import {useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const graphType = useSelector(selectGraphType);
  const chartData = useSelector(selectData);
  const [error, setError] = useState('');

  const onFileChange = (event) => {
    Papa.parse(event.target.files[0], {
      complete: function(result) {
        const fields = result.data;
        let err = '';
        if (fields.length < 1) {
          err = "File does not have enougn rows";
        }
        if (fields[0].lenght < 2) {
          err = "File does not have enougn columns";
        }
        if (err) {
          return setError(err);
        }
        dispatch(setData(result.data));
      },
      skipEmptyLines: true,
    })
  };

  const onChartTypoeSelection =(event) => {
    dispatch(setGraphType(event.target.value));
    valudateForm(event.target.value);
  }

  const valudateForm = (graphtypeSelected) => {
    const gt = graphtypeSelected || graphType
    if (!gt) {
      return;
    }
    const fieldTypes = chartData[1].reduce((acc, cols) => {
      if (!isNaN(cols)) {
        acc.number += 1;
      } else {
        acc.string += 1;
      }
      return acc;
    }, {number: 0, string: 0});

    // line chart : only numbers in array, >= 3 column
    // area chart: same as line chart
    // bar : atleast 2 number column
    // pie: one string one number column
    let err = '';
    if (gt === "LineChart" || gt === "AreaChart") {
      if (fieldTypes.string > 0) {
        err = "Feild value should be only number type";
      }
    }
    if (gt === "bar") {
      if (fieldTypes.number < 2) {
        err = "There sholud be more than 2 number type fileds";
      }
    }
    if (gt === "PieChart") {
      if (fieldTypes.number !== 1 || fieldTypes.string !== 1) {
        err = "there should be only one string and one number type field";
      }
    }
    if (err) {
      return setError(err);
    }
    navigate('/graphs');
  }

  const csvDownloadHandler = () => {
    if (chartData.length) {
      var csv = Papa.unparse(chartData);

      var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      var csvURL =  null;
      if (navigator.msSaveBlob) {
          csvURL = navigator.msSaveBlob(csvData, 'download.csv');
      } else {
          csvURL = window.URL.createObjectURL(csvData);
      }

      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', 'download.csv');
      tempLink.click();
    }
  }

  return (
    <>
      <div>
      <button type="file" onClick={csvDownloadHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Download csv</button>
        <input type="file" onChange={onFileChange} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
      </div>
      <div>
        <select onChange={onChartTypoeSelection} value={graphType} id="chartType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option >Choose a chart type</option>
          <option value="LineChart">LineChart</option>
          <option value="AreaChart">AreaChart</option>
          <option value="Bar">Bar</option>
          <option value="PieChart">PieChart</option>
        </select>
      </div>
      {error ? <div className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</div> : null}
    </>
  )
}

export default App;
