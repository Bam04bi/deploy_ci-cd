// ** React Imports
import { useState , useEffect  } from 'react'
import Web3 from "web3";
import SupplyChainABI from "../../artifacts/SupplyChain.json"

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TextField from '@mui/material/TextField'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import StatisticsProduct from 'src/views/dashboard/StatisticsProduct'; // Adjust the import path accordingly

// React component for the Products Table
function ProductsTable() {
  
  // ** States
  const [page, setPage] = useState(0); // State to manage the current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State to manage the number of rows per page

  // Effect hook to load Ethereum provider and blockchain data when the component mounts
  useEffect(() => {
      loadWeb3();
      loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState(""); // State to store the current Ethereum account
  const [loader, setloader] = useState(true); // State to indicate whether data loading is in progress
  const [SupplyChain, setSupplyChain] = useState(); // State to store the instance of the smart contract
  const [MED, setMED] = useState(); // State to store medicine data
  const [MedName, setMedName] = useState(); // State to store the medicine name
  const [MedDes, setMedDes] = useState(); // State to store the medicine description
  const [MedStage, setMedStage] = useState(); // State to store medicine stage data

  // Function to load the Ethereum provider
  const loadWeb3 = async () => {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
      } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
      } else {
          // Alert the user if neither MetaMask nor web3 is available
          window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
      }
  };

  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const loadBlockchaindata = async () => {
      setloader(true);
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setCurrentaccount(account);
      const networkId = await web3.eth.net.getId();
      const networkData = SupplyChainABI.networks[networkId];
      if (networkData) {
          const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
          setSupplyChain(supplychain);
          var i;
          const medCtr = await supplychain.methods.medicineCtr().call();
          const med = {};
          const medStage = [];
          for (i = 0; i < medCtr; i++) {
              med[i] = await supplychain.methods.MedicineStock(i + 1).call();
              medStage[i] = await supplychain.methods.showStage(i + 1).call();
          }
          setMED(med);
          setMedStage(medStage);
           // Update the numberOfProducts state
          setloader(false);
      }
      else {
          // Alert the user if the smart contract is not deployed to the current network
          window.alert('The smart contract is not deployed to the current network');
      }
  }

  if (loader) {
      // Display a loading message while data is being loaded
      return (
          <div>
              <h1 className="wait">Loading...</h1>
          </div>
      )
  }

  // Event handlers for changing medicine name and description
  const handlerChangeNameMED = (event) => {
      setMedName(event.target.value);
  }

  const handlerChangeDesMED = (event) => {
      setMedDes(event.target.value);
  }

  // Event handler for submitting a new medicine
  const handlerSubmitMED = async (event) => {
      event.preventDefault();
      try {
          // Add the medicine to the blockchain
          var reciept = await SupplyChain.methods.addMedicine(MedName, MedDes).send({ from: currentaccount });
          if (reciept) {
              // Reload blockchain data after successfully adding the medicine
              loadBlockchaindata();
          }
      }
      catch (err) {
          // Display an alert if an error occurs during the submission
          alert("An error occurred!!!");
      }
  }

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  }

  const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ margin: 2 }}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell scope="col">ID</TableCell>
              <TableCell scope="col">Name</TableCell>
              <TableCell scope="col">Description</TableCell>
              <TableCell scope="col">Current Stage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(MED)
              .filter((key) =>
                Object.values(MED[key])
                  .some((value) =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                  ) ||
                MedStage[key].toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(function (key) {
                return (
                  <TableRow key={key}>
                    <TableCell>{MED[key].id}</TableCell>
                    <TableCell>{MED[key].name}</TableCell>
                    <TableCell>{MED[key].description}</TableCell>
                    <TableCell>{MedStage[key]}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={Object.keys(MED).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     
    </Paper>
  );
}

export default ProductsTable;