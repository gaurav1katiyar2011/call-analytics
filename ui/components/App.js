import React, { useState, useEffect } from 'react';
import CSVReader from "react-csv-reader";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Header from './header';
import CollapsibleTable from './CollapsibleTable'
import EnhancedTable from './EnhancedTable'
import BarChart from './charts/barChart'
import PieChart from './charts/pieChart'

import config from '../../config/ui'

const backendConfig = process.env.BROWSER ? config.client : config.server;

export const getBaseUrl = () => {
  return `${backendConfig.protocol}://${backendConfig.host}:${backendConfig.port}${backendConfig.basename}`
}
export default function App() {
  const [loading, setLoading] = useState(true)
  const [tabledata, setTableData] = useState({})
  const [showTable, setShowTable] = useState(false)
  useEffect(()=>{
    fetchUserData()
  }, [])
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };
  const uploadData = (data) => {
    setLoading(false)
    let d = JSON.stringify({ ...data });
    fetch(`${getBaseUrl()}/user-data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: d,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
        fetchUserData()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserData = () => {
    fetch(`${getBaseUrl()}/user-data`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
        setTableData(data )
        setShowTable(true)
      })
      .catch((err) => {
        console.log(err);

      })
  }
  return (
    <Container maxWidth="false">
      <Grid container spacing={3}>
      <Grid item xs={12}>
        <Header />
        </Grid>
        <Grid item xs={8}>
       
        </Grid>
        <Grid item xs={4}>
         
        </Grid>
        
        <Grid item xs={12}>
          <CSVReader
            cssClass="react-csv-input"
            label="Select CSV  :"
            onFileLoaded={uploadData}
            parserOptions={papaparseOptions}
          />
        </Grid>
        {
          (true) &&
          <Grid item xs={12}>
            <EnhancedTable tableData={tabledata}/>
          </Grid>
        }
      </Grid>
    </Container>
  )
}
