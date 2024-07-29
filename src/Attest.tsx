import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useState } from "react";
import { SCHEMA, SCHEMA_DETAILS } from "./config";
import { useEAS } from "./useEas.ts";
import { usePrivy } from '@privy-io/react-auth';

type AttestationData = {
  Hours: number;
  NFCID: number;
  EventID: number;
  OrganizerID: number;
};

/** @dev AFTER REGISTERING A SCHEMA, OR MAKING AN ATTESTATION
 * IF YOU REFRESH APP MAKE SURE TO PASTE IN SCHEMA/ATTESTATIONUID IN STATE VARIABLES OR ELSE APP WONT WORK
 * */
const Attest = () => {
  const { eas, schemaRegistry, currentAddress } = useEAS();
  const { user } = usePrivy();
  console.log("currentAddress ", currentAddress);
  // schemaUID is set when Freelancer register's their own reputation schema
  const [schemaUID, setSchemaUID] = useState<string>(
    "0xaba6545faa5ec5963565eded771e497c4adbb7205a07f4a8206f68fb8df26b9f"
  );
  const [attestationUID, setAttestationUID] = useState<string>(
    "0x4968c28d7e6a01c46c2bc1cfc5edb64a49e94801126c0c0a1d848ed72bd262c9"
  );
  const [attestationData, setAttestationData] = useState<AttestationData>({
    Hours: 0,
    NFCID: 0,
    EventID: 0,
    OrganizerID: 0,
  });

  const handleAttestationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttestationData({
      ...attestationData,
      [name]: value,
    });
  };

  // attestationUID is set when a client attests to the reputation schema

  const registerSchema = async () => {
    setSchemaUID("0xaba6545faa5ec5963565eded771e497c4adbb7205a07f4a8206f68fb8df26b9f");
  };

  const createAttestation = async () => {
    if (!eas || !schemaUID) return;

    if (!user || !user.wallet || !user.wallet.address) {
      console.error('User or user.wallet.address is not available');
      return;
    }

    const schemaEncoder = new SchemaEncoder(SCHEMA);
    const encodedData = schemaEncoder.encodeData([
      {
        name: "Hours",
        value: attestationData.Hours,
        type: "uint8",
      },
      {
        name: "NFCID",
        value: attestationData.NFCID,
        type: "uint32",
      },
      {
        name: "EventID",
        value: attestationData.EventID,
        type: "uint32",
      },
      {
        name: "OrganizerID",
        value: attestationData.OrganizerID,
        type: "uint32",
      },
    ]);

    try {
      const transaction = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: user.wallet.address, // This needs to be changed to Privy address
          expirationTime: undefined,
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });

      const newAttestationUID = await transaction.wait();
      setAttestationUID(newAttestationUID);

      console.log("New attestation UID:", newAttestationUID);
      console.log("Creating Attestation:", attestationData);
    } catch (error) {
      console.error("Error creating attestation:", error);
    }
  };

  const revokeAttestation = async () => {
    if (!eas) return;
    try {
      const attestation = await eas.getAttestation(attestationUID);

      const transaction = await eas.revoke({
        schema: attestation.schema,
        data: { uid: attestation.uid },
      });
      const receipt = await transaction.wait();
      console.log("Revoking Attestation:", receipt);
    } catch (error) {
      console.error("Error revoking attestation:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Ethereum Attestation Service</h1>
      <h2 style={{ textAlign: "center" }}>
        {!schemaUID
          ? "Step 1: Volunteer registers a schema for their own reputation"
          : "Step 2: Client creates attestation for Volunteer's credibility"}
      </h2>

      {!schemaUID && (
        <>
          <h2>Register Schema</h2>
          <div>
            <strong>Schema Name:</strong> {SCHEMA_DETAILS.schemaName}
          </div>
          <div>
            <strong>Hours:</strong> {SCHEMA_DETAILS.Hours}
          </div>
          <div>
            <strong>NFCID:</strong> {SCHEMA_DETAILS.NFCID}
          </div>
          <div>
            <strong>EventID:</strong> {SCHEMA_DETAILS.EventID}
          </div>
          <div>
            <strong>OrganizerID:</strong> {SCHEMA_DETAILS.OrganizerID}
          </div>
          <button onClick={registerSchema}>Register Schema</button>
        </>
      )}

      {schemaUID && (
        <>
          <h2>Create Attestation</h2>
          <input
            type="text"
            name="Hours"
            value={attestationData.Hours}
            onChange={handleAttestationChange}
            placeholder="Hours"
          />
          <input
            type="text"
            name="NFCID"
            value={attestationData.NFCID}
            onChange={handleAttestationChange}
            placeholder="NFC ID"
          />
          <input
            type="text"
            name="EventID"
            value={attestationData.EventID}
            onChange={handleAttestationChange}
            placeholder="Event ID"
          />
          <input
            type="text"
            name="OrganizerID"
            value={attestationData.OrganizerID}
            onChange={handleAttestationChange}
            placeholder="Organizer ID"
          />
          <button onClick={createAttestation}>Create Attestation</button>

          <h2>Revoke Attestation</h2>
          <button onClick={revokeAttestation}>Revoke Attestation</button>
        </>
      )}
    </div>
  );
};

export default Attest;
