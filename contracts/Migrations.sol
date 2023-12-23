// SPDX-License-Identifier: MIT
/*This line is a comment that includes a license identifier. 
SPDX (Software Package Data Exchange) 
is a standard format for documenting licensing 
information. In this case, "MIT" indicates that 
the code is licensed under the MIT License, a permissive 
open-source license.*/
pragma solidity >=0.4.22 <0.9.0;
/**This line specifies the version of the Solidity 
compiler that should be used to compile the contract. 
The contract is compatible with versions greater than or equal 
to 0.4.22 and less than 0.9.0. It helps ensure that the contract is 
compiled using a compatible compiler version. */

// Migrations Smart Contract
/*Here, a Solidity contract named "Migrations" is defined. 
Contracts in Solidity are similar to classes in object-oriented 
languages and are used to encapsulate the functionality 
of a smart contract. */
contract Migrations {
    // State variable to store the contract owner's address
    address public owner = msg.sender;
    /*This line declares a state variable owner of type address and initializes 
    it with the address of the contract deployer (msg.sender). The public keyword 
    allows for the automatic creation of a getter function for the owner variable. */
    
    // State variable to store the index of the last completed migration
    
    /*This line declares a public state variable last_completed_migration 
    of type uint (unsigned integer). This variable will store the index 
    of the last completed migration.*/

    uint public last_completed_migration;

    // Modifier: Ensures that a function can only be executed by the contract owner

    /*This is a custom modifier named restricted. Modifiers are used to change 
    the behavior of functions. In this case, the modifier restricts the execution 
    of a function to the contract owner. */
    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    // Function: Sets the value of last_completed_migration (restricted to the owner)
    /*This function, when called, sets the value of last_completed_migration to the 
    provided completed parameter. The restricted modifier ensures that only the 
    contract owner can call this function. */
    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
}
