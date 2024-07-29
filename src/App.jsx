// Import React and other necessary libraries
import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import HomePage from './HomePage.tsx';
import Hours from './Hours.jsx';
import Header from './Components/RedHeader.tsx';
import Sidebar from './Components/Sidebar.tsx';
import DesktopLogin from './DesktopLogin.tsx';
import Attest from './Attest.tsx';

function App() {
  // useEffect(() => {
  //   const integrateEAS = async () => {
  //     if (!window.ethereum) {
  //       console.error('Ethereum provider not found');
  //       return;
  //     }

  //     // Request account access if needed
  //     await window.ethereum.request({ method: 'eth_requestAccounts' });

  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();

     

  //     const easContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
  //     const schemaUID = '0xaba6545faa5ec5963565eded771e497c4adbb7205a07f4a8206f68fb8df26b9f';
  //     const eas = new EAS(easContractAddress);

  //     await eas.connect(signer);

  //     console.log(signer);

  //     const schemaEncoder = new SchemaEncoder('uint8 Hours,uint32 NFCID,uint32 EventID,uint32 OrganizerID');
  //     const encodedData = schemaEncoder.encodeData([
  //       { name: 'Hours', value: 0, type: 'uint8' },
  //       { name: 'NFCID', value: 0, type: 'uint32' },
  //       { name: 'EventID', value: 0, type: 'uint32' },
  //       { name: 'OrganizerID', value: 0, type: 'uint32' },
  //     ]);

  //     try {
  //       const tx = await eas.attest({
  //         schema: schemaUID,
  //         data: {
  //           recipient: '0x0000000000000000000000000000000000000000',
  //           expirationTime: 0,
  //           revocable: true,
  //           data: encodedData,
  //         },
  //       });

  //       const newAttestationUID = await tx.wait();
  //       console.log('New attestation UID:', newAttestationUID);
  //     } catch (error) {
  //       console.error('Error during attestation:', error);
  //     }
  //   };

  //   integrateEAS();
  // }, []);

  return (
    <>
      <div>
        <div>
          <Routes>
            <Route path='/mobilelogin' element={<HomePage />} />
            <Route path='/attest' element={<Attest />} />
            <Route path='/hours' element={<Hours />} />
            <Route path='/dashboard' element={<Header />} />
            <Route path='/sideBar' element={<Sidebar />} />
            <Route path='/login' element={<DesktopLogin />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
