function About() {
  return (
    <>
      <div style={{ marginTop: '15rem', width: '100%', height: '10px' }} className="about-scroll"></div>

      <div className="container about">
        <div className="row">
          <div className="col-md-6 text-center">
            <img alt="about" src="./img/img1.png" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2 className="main-title about-h2">ABOUT</h2>
            <p className="main-p">
              The project involves the development of a decentralized supply chain management system using blockchain technology. 
              The system aims to streamline and enhance the transparency of the supply chain process for various stakeholders, 
              including raw material suppliers (RM), manufacturers (MAN), distributors (DIST), and retailers (RET).

              Key Components:

              Smart Contract:

              The system utilizes a smart contract deployed on the Ethereum blockchain to manage and execute various functionalities.
              The contract includes methods for adding and tracking products, managing different stages of the supply chain, and 
              handling transactions.

              User Roles:

              Participants are categorized into RM suppliers, manufacturers, distributors, retailers, and the system owner.
              Each role has specific actions they can perform based on their involvement in the supply chain.

              Web3 Integration:

              Web3.js is integrated to interact with the Ethereum blockchain. Users can connect their wallets (e.g., MetaMask) 
              to the application.

              Dynamic Navigation:

              The navigation dynamically adjusts based on the user's role and ownership status, providing a personalized experience.

              Supply Chain User Navigation:

              Users involved in the supply chain (RM, MAN, DIST, RET) have a set of navigation options tailored to their roles.
              Features include buying products, viewing product stages, and tracking product movements through the supply chain.

              Owner's Dashboard:

              The system owner has an extended set of functionalities for managing suppliers, manufacturers, distributors, 
              retailers, and product orders.
              The owner's dashboard provides tools for adding new entities, viewing all entities, managing product orders, 
              and overseeing the entire supply chain flow.

              Product Management:

              Participants can add new products to the system, providing details such as product name and description.
              Products go through different stages in the supply chain, and participants can track these stages.

              Search Functionality:

              The application includes a search functionality, allowing users to search for specific products or entities 
              based on different criteria.

              Loading Indicators:

              To enhance user experience, loading indicators are implemented, informing users when blockchain data is being fetched.

              Responsive Design:

              The application is designed to be responsive, ensuring a seamless experience across various devices.

              Blockchain Integration in SupplyChain Smart Contract

              The provided Solidity smart contract, named SupplyChain, outlines a simplified implementation of a pharmaceutical 
              supply chain on the Ethereum blockchain. Let's delve into the key blockchain-related aspects:

              Smart Contract Structure:

              The contract is initiated by defining the SPDX license identifier, pragma version, and subsequently declaring the 
              SupplyChain contract.
              The contract maintains an Owner variable, representing the deployer of the smart contract, and is initialized 
              within the constructor.

              Roles and Modifiers:

              The contract defines different roles such as Raw Material Supplier, Manufacturer, Distributor, and Retailer.
              A onlyByOwner modifier ensures that certain functions can only be executed by the contract owner.

              Product Lifecycle Stages (Enum):

              The contract defines the stages a pharmaceutical product goes through in the supply chain using the STAGE enum, 
              including Init, RawMaterialSupply, Manufacture, Distribution, Retail, and Sold.

              Product and Role Counters:

              Separate counters track the number of products (medicineCtr) and the count of entities in each role (Raw Material 
              Suppliers - rmsCtr, Manufacturers - manCtr, Distributors - disCtr, Retailers - retCtr).

              Structs and Mappings:

              Structs are used to define the details of a medicine, raw material supplier, manufacturer, distributor, and retailer.
              Mappings associate unique IDs with instances of these structs for efficient data retrieval.

              Role Addition Functions:

              Functions (addRMS, addManufacturer, addDistributor, addRetailer) allow the contract owner to add new entities of each 
              role, capturing their address, name, and location.

              Supply Chain Flow Functions:

              Functions (RMSsupply, Manufacturing, Distribute, Retail, Sold) simulate the flow of products through the supply chain, 
              with each function updating the product's stage accordingly.

              Show Stage Function:

              The showStage function returns a human-readable description of the current stage of a given product.

              Medicine Addition Function:

              The addMedicine function enables the contract owner to add new medicines to the supply chain, ensuring that all roles 
              are registered before initiating product tracking.

              Visibility and Ownership:

              Certain functions and variables are restricted to the contract owner (onlyByOwner modifier), emphasizing the importance 
              of ownership in authorizing roles and managing the supply chain.
              This smart contract, when deployed on the Ethereum blockchain, provides a foundational structure for tracking products 
              through various stages of the supply chain. Its simplicity facilitates
              understanding, and it can serve as a starting point for more sophisticated implementations based on specific business 
              requirements.

              Now this is a summary of what's happening in the project :

              Conception and Development of a Logistics Traceability Solution based on Blockchain Technology

              1. Introduction
              The project, "Traçabilité Logistique basée sur la Technologie Blockchain," aims to revolutionize supply chain management 
              using blockchain technology. The solution provides real-time tracking of products, materials, and goods throughout the 
              supply chain, offering unparalleled transparency, enhanced data security, and true traceability for all stakeholders.

              2. The project Architecture

              1. Owner Registration of Users:
              The owner of the supply chain platform registers participants such as suppliers, manufacturers, logistics providers, and 
              clients. Each participant is assigned a unique identifier and provided with authentication credentials.

              2. Product Creation by Owner:
              The owner, who has administrative privileges, creates a new product entry in the system. This involves specifying details such 
              as product name, description, and any initial information relevant to the supply chain.

              3. Participant Registration of Product Information:
              As the product moves through different stages of the supply chain, each participant registers relevant information about the 
              product when it reaches their custody. This information may include:
              - Supplier: Records initial information, such as manufacturing date and origin.
              - Manufacturer: Adds details on production and quality control.
              - Distributor: Updates information on shipping, transportation, and delivery schedules.
              - Retailer: Records product arrival and storage details.

              4. Smart Contract Recording and Validation:
              At each stage, the participant registers this information on the blockchain using the smart contract. The smart contract 
              ensures the integrity of the data, making it tamper-proof and traceable.

              5. User Access and Permissions:
              Participants log in to the system with their credentials. The smart contract manages permissions, allowing each participant 
              to perform actions based on their role in the supply chain.

              6. Tracking Product by ID:
              The final user, which can be a client or any participant with the appropriate permissions, can enter the product's unique 
              identifier (ID) into the system.

              7. Traceability Information Retrieval:
              The system retrieves and displays the complete traceability information for the entered product ID. This includes all the 
              recorded data from each stage of the supply chain.

              8. Real-time Monitoring and Alerts:
              The system continuously monitors the supply chain data in real-time. Alerts are triggered for any anomalies or irregularities 
              in the data, providing timely notifications to relevant participants.

              9. Enhanced Transparency for Clients:
              Clients benefit from enhanced transparency, as they can track the origin and journey of their purchased products. 
              This information builds trust in the authenticity and quality of the products.

              3. Overall Architecture

              The smart contract is written in Solidity, which is then compiled, migrated, and deployed using Truffle.js on the local 
              blockchain network created with Ganache-cli.
              The frontend utilizes Web3.js to communicate with the smart contract and the local blockchain network, and is written using 
              the React.js framework for better management
              of component lifecycle and states. User requests are transmitted to the frontend through Nginx (load balancer) and Express.js 
              for dynamic routing.

            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default About;
