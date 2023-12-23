import React, { useState, useEffect } from 'react'
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json"

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import StatisticsProduct from 'src/views/dashboard/StatisticsProduct'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview1'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import DistributorsTable from 'src/views/tables/DistributorsTable';
import ManufacturersTable from 'src/views/tables/ManufacturersTable';
import RetailersTable from 'src/views/tables/RetailersTable';
// Function to initialize the Dashboard component
function Dashboard() {
  useEffect(() => {
    // Load necessary blockchain data when the component mounts
    loadWeb3();
    loadBlockchaindata();
  }, []);

  // State variables to store counts and account information
  const [numberOfProducts, setNumberOfProducts] = useState(0); // Initialize with an appropriate value
  const [numberOfDistributors, setNumberOfDistributors] = useState(0);
  const [numberOfManufacturers, setNumberOfManufacturers] = useState(0);
  const [numberOfSuppliers, setNumberOfSuppliers] = useState(0); // Add this line
  const [numberOfRetailers, setNumberOfRetailers] = useState(0); // Add this line
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);

  // State variables for blockchain data
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();
  const [DIS, setDIS] = useState(); // Initialize DIS state
  const [MAN, setMAN] = useState();
  const [rows, setRows] = useState([]);

  // Function to load Web3 and enable Ethereum interaction
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  // Function to load blockchain data
  const loadBlockchaindata = async () => {
    // Set loader state to true while loading data
    setloader(true);

    // Access Web3 and user accounts
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);

    // Get network ID and data from the blockchain
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];

    // Check if the network data exists
    if (networkData) {
      // Create a contract instance for the SupplyChain smart contract
      const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
      setSupplyChain(supplychain);

      // Fetch and update medicine data
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];

      for (let i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }

      // Update states and counts
      setMED(med);
      setMedStage(medStage);
      setNumberOfProducts(Object.keys(med).length);

      // Fetch and update distributor data
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};

      for (let i = 0; i < disCtr; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }

      // Update states and counts
      setDIS(dis);
      setNumberOfDistributors(Object.keys(dis).length);

      // Fetch and update manufacturer data
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};

      for (let i = 0; i < manCtr; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }

      // Update states and counts
      setMAN(man);
      setNumberOfManufacturers(Object.keys(man).length);

      // Fetch and update supplier (RMS) data
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = [];

      for (let i = 0; i < rmsCtr; i++) {
        const rmsData = await supplychain.methods.RMS(i + 1).call();
        rms.push(rmsData);
      }

      // Update states, counts, and rows
      setRows(rms);
      setNumberOfSuppliers(rmsCtr);

      // Fetch and update retailer data
      const retCtr = await supplychain.methods.retCtr().call();
      const retailers = [];

      for (let i = 0; i < retCtr; i++) {
        const retData = await supplychain.methods.RET(i + 1).call();
        retailers.push(retData);
      }

      // Update states, counts, and rows
      setRows(retailers);
      setNumberOfRetailers(retCtr);

      // Set loader state to false after data is loaded
      setloader(false);
    } else {
      window.alert('The smart contract is not deployed to the current network');
    }
  };

  // If loader is true, display a loading message
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }


  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy numberOfProducts={numberOfProducts} />
        </Grid>
        {/* Pass the numberOfProducts to the StatisticsCard component */}
        <Grid item xs={12} md={8}>
          {/* Change from StatisticsProduct to StatisticsCard */}
          <StatisticsProduct numberOfDistributors={numberOfDistributors} numberOfManufacturers={numberOfManufacturers} numberOfSuppliers={numberOfSuppliers} numberOfRetailers={numberOfRetailers} />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <WeeklyOverview />
        </Grid>

      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
