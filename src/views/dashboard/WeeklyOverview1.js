import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
// Importing icon component from Material Design Icons library
import DotsVertical from 'mdi-material-ui/DotsVertical';

// Importing external library for chart rendering
import ReactApexcharts from 'src/@core/components/react-apexcharts';

// Importing Ethereum-related libraries and smart contract artifacts
import Web3 from "web3";
import SupplyChainABI from "../../artifacts/SupplyChain.json";

// Functional component for rendering weekly overview statistics
const WeeklyOverview = () => {
  // useEffect hook to handle web3 and blockchain data loading
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, [])

  // Hook to access the theme
  const theme = useTheme();

  // State variables to store blockchain data and manage loading state
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();
  const [RMSCount, setRMSCount] = useState();
  const [MANCount, setMANCount] = useState();
  const [DISCount, setDISCount] = useState();
  const [RETCount, setRETCount] = useState();
  const [RMSname, setRMSname] = useState();
  const [MANname, setMANname] = useState();
  const [DISname, setDISname] = useState();
  const [RETname, setRETname] = useState();
  const [RMSplace, setRMSplace] = useState();
  const [MANplace, setMANplace] = useState();
  const [DISplace, setDISplace] = useState();
  const [RETplace, setRETplace] = useState();
  const [RMSaddress, setRMSaddress] = useState();
  const [MANaddress, setMANaddress] = useState();
  const [DISaddress, setDISaddress] = useState();
  const [RETaddress, setRETaddress] = useState();
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();


  // Function to load Web3 and enable Ethereum connection
  const loadWeb3 = async () => {
    // Check if MetaMask or another Ethereum-compatible browser is present
    if (window.ethereum) {
      // Set the global web3 instance using the MetaMask provider
      window.web3 = new Web3(window.ethereum);
      // Enable the MetaMask wallet
      await window.ethereum.enable();
    } else if (window.web3) {
      // Set the global web3 instance using the current web3 provider
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // Display an alert for non-Ethereum browsers
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  // Function to load blockchain data
  const loadBlockchaindata = async () => {
    // Set loader to true to indicate data loading
    setloader(true);
    const web3 = window.web3;
    // Get Ethereum accounts
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    // Set the current Ethereum account
    setCurrentaccount(account);
    // Get the network ID
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      // If the smart contract is deployed on the network
      const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
      setSupplyChain(supplychain);
      var i;
      // Retrieve and set data for RM Suppliers
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMSCount(rmsCtr);
      setRMS(rms);
      // Similar blocks for Manufacturers, Distributors, and Retailers
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMANCount(manCtr);
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDISCount(disCtr);
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i] = await supplychain.methods.RET(i + 1).call();
      }
      setRETCount(retCtr);
      setRET(ret);
      // Retrieve and set data for Products
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      // Set loader to false to indicate data loading is complete
      setloader(false);
    }
    else {
      // If the smart contract is not deployed to the current network, alert the user
      window.alert('The smart contract is not deployed to current network')
    }
  }
  // If loader is true, display loading message
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }
  // Array of counts and corresponding names
  const values = [RMSCount, MANCount, DISCount, RETCount];
  const names = ['RM Suppliers', 'Manufacturers', 'Distributor', 'Retailer'];

  // Use Math.max to obtain the highest value among the variables
  const maxValue = Math.max(...values);

  // Find the index of the highest value
  const indexOfMaxValue = values.indexOf(maxValue);

  // Get the name corresponding to the highest value
  const nameOfMaxValue = names[indexOfMaxValue];


  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['RM Suppliers', 'Manufacturers', 'Distributor', 'Retailer'],
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -8,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Members Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={[{ data: [RMSCount, MANCount, DISCount, RETCount] }]} />
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>

          <Typography variant='body2'>This Represents the number of the Big Actors of your Supply Chain added by the Owner.</Typography>
        </Box>
        <Button fullWidth variant='contained'>
          Members Table
        </Button>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
