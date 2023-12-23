// ** React Imports
import { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import Web3

// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import SupplyChainABI from "../../artifacts/SupplyChain.json"

const columns = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'place',
    label: 'Place',
    minWidth: 170,
    align: 'left',
    format: value => value.toFixed(2),
  },
  {
    id: 'addr',
    label: 'Ethereum Address',
    minWidth: 170,
    align: 'left',
    format: value => value.toFixed(2),
  },
];
// Define the RetailersTable component
function RetailersTable() {
  // ** States
  const [page, setPage] = useState(0); // State for the current page in the table
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for the number of rows per page
  const [rows, setRows] = useState([]); // State to store the data for the table rows
  const [currentaccount, setCurrentaccount] = useState(""); // State for the current Ethereum account
  const [loader, setloader] = useState(true); // State to indicate whether data loading is in progress
  const [SupplyChain, setSupplyChain] = useState(); // State to store the instance of the smart contract
  const [numberOfRetailers, setNumberOfRetailers] = useState(0); // State for the number of retailers
  useEffect(() => {
    // Load Ethereum provider and blockchain data when the component mounts
    loadWeb3();
    loadBlockchaindata();
  }, []);

  // Handle page change in the table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change in the table
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Load Ethereum provider
  const loadWeb3 = async () => {
    if (window.ethereum) {
      // Use MetaMask provider if available
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable(); // Request user permission to connect to the Ethereum provider
    } else if (window.web3) {
      // Use the existing web3 provider if available
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // Alert the user if neither MetaMask nor web3 is available
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  // State for search term in the table
  const [searchTerm, setSearchTerm] = useState('');

  // Load blockchain data
  const loadBlockchaindata = async () => {
    try {
      // Set loader to true to indicate that data loading is in progress
      setloader(true);

      // Get the current Ethereum provider
      const web3 = window.web3;

      // Get the accounts available on the connected Ethereum provider
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Set the current Ethereum account in the state
      setCurrentaccount(account);

      // Get the network ID of the connected Ethereum provider
      const networkId = await web3.eth.net.getId();

      // Retrieve the network data for the deployed smart contract
      const networkData = SupplyChainABI.networks[networkId];

      // Create a new contract instance using the ABI and address from the network data
      const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
      
      // Set the supply chain contract in the state
      setSupplyChain(supplychain);

      // Retrieve the number of retailers from the smart contract
      const retailersCtr = await supplychain.methods.retailersCtr().call();
      console.log("Number of Retailers:", retailersCtr);

      // Retrieve details for each retailer and log the data
      const retailers = [];
      for (let i = 0; i < retailersCtr; i++) {
        const retailerData = await supplychain.methods.RETAILER(i + 1).call();
        console.log("Retailer Data:", retailerData);
        retailers.push(retailerData);
      }
      console.log("All Retailers Data:", retailers);
      
      // Update the number of retailers state
      setNumberOfRetailers(retailersCtr);

      // Set loader to false to indicate that data loading is complete
      setRows(retailers);
      setloader(false);
    } catch (error) {
      // Log any errors that occur during data fetching
      console.error("Error fetching blockchain data:", error);
    } finally {
      // Set loader to false to indicate that data loading is complete
      setloader(false);
    }
  };

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
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter((row) =>
                Object.values(row).some((value) =>
                  value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof row[column.id] === 'number'
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default RetailersTable;