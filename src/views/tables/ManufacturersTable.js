// ** React Imports
import { useState, useEffect } from 'react'
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
// Define the ManufacturersTable component
function ManufacturersTable() {
  // ** States
  const [page, setPage] = useState(0); // State for the current page in the table
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for the number of rows per page
  const [numberOfManufacturers, setNumberOfManufacturers] = useState(0); // State for the number of manufacturers

  // Additional state for search
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  useEffect(() => {
    // Load Ethereum provider and blockchain data when the component mounts
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState(""); // State for the current Ethereum account
  const [loader, setloader] = useState(true); // State to indicate whether data loading is in progress
  const [SupplyChain, setSupplyChain] = useState(); // State to store the instance of the smart contract
  const [MAN, setMAN] = useState(); // State to store manufacturer data

  // Function to handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when the search term changes
  };

  // Check if MAN is an object and convert to array before filtering
  const filteredRows = MAN && typeof MAN === 'object'
    ? Object.values(MAN).filter(
      (row) =>
        String(row.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.addr.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  // Function to load the Ethereum provider
  const loadWeb3 = async () => {
    // Check for Ethereum provider (MetaMask) and enable it if available
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // Alert the user if neither MetaMask nor web3 is available
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  // Function to load blockchain data
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

      if (networkData) {
        // Create a new contract instance using the ABI and address from the network data
        const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
        setSupplyChain(supplychain);

        // Retrieve manufacturer data from the smart contract
        const manCtr = await supplychain.methods.manCtr().call();
        const man = {};
        for (let i = 0; i < manCtr; i++) {
          man[i] = await supplychain.methods.MAN(i + 1).call();
        }

        // Set manufacturer data and update the numberOfManufacturers state
        setMAN(man);
        setNumberOfManufacturers(Object.keys(man).length);

        // Set loader to false to indicate that data loading is complete
        setloader(false);
      } else {
        // Alert the user if the smart contract is not deployed to the current network
        window.alert('The smart contract is not deployed to the current network');
      }
    } catch (error) {
      // Log any errors that occur during data fetching
      console.error("Error fetching blockchain data:", error);
    }
  };

  if (loader) {
    // Display a loading message while data is being loaded
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }

  // Function to handle page change in the table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change in the table
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        id='search'
        label='Search'
        variant='outlined'
        value={searchTerm}
        onChange={handleSearchTermChange}
        sx={{ margin: 2 }}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow >
              <TableCell scope="col">ID</TableCell>
              <TableCell scope="col">Name</TableCell>
              <TableCell scope="col">Place</TableCell>
              <TableCell scope="col">Ethereum Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.place}</TableCell>
                  <TableCell>{row.addr}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={MAN ? Object.keys(MAN).length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ManufacturersTable