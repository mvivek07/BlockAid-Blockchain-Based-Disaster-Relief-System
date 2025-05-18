
BlockAid - Blockchain-Based Disaster Relief System
🚨 Problem Statement
Natural disasters often reveal systemic issues in humanitarian aid, including:

🕒 Delays in fund release and aid delivery

💸 Corruption and misallocation of resources

❌ Lack of transparency and accountability

🧾 Inefficient tracking of aid and donations

BlockAid aims to revolutionize disaster relief using decentralized, transparent, and secure blockchain technology.

✅ Solution Overview
BlockAid is a decentralized platform that leverages blockchain, smart contracts, Web3 authentication, and IoT-based real-time tracking to make disaster relief:

Transparent 🔍

Efficient ⚡

Tamper-proof 🔐

User-verified 📲

✨ Core Features
Immutable Recordkeeping using a permissioned blockchain (Hyperledger Fabric / Polygon)

Smart Contracts for automated fund release on aid verification

Web3Auth for seamless, secure user login via wallets and social accounts

Transak Integration for fiat-to-crypto donations

IoT Integration to track aid delivery in real-time

Beneficiary Feedback Loop via mobile/web apps

Polygon Smart Contracts (Solidity) to handle donation and aid verification

Lovable AI for decision-making logic and interface interactivity

Supabase backend for scalable user and transaction data

🧠 Tech Stack
Layer	Technologies Used
Blockchain	Hyperledger Fabric, Polygon, Solidity
Smart Contracts	Solidity on Polygon (Mumbai Testnet)
Backend	Supabase (PostgreSQL + Auth), Node.js, Express
Frontend	React.js (web), React Native (mobile), Lovable AI
Authentication	Web3Auth (wallet & social login)
Payments	Transak (Fiat-to-Crypto gateway)
IoT	Sensor data streams integrated via MQTT/WebSockets
AI	Lovable AI for UI/UX logic and process intelligence
Hosting	Vercel (frontend), Supabase (backend), IPFS (optional for metadata)

🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/<your-username>/blockaid.git
cd blockaid
2. Install Dependencies
Backend (Node.js)

bash
Copy
Edit
cd backend
npm install
Frontend (React or React Native)

bash
Copy
Edit
cd frontend
npm install
3. Environment Setup
Create a .env file in each root (/frontend and /backend) with the following values:

/backend/.env
env
Copy
Edit
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-service-role-key
WEB3AUTH_CLIENT_ID=your-web3auth-client-id
TRANSak_API_KEY=your-transak-key
/frontend/.env
env
Copy
Edit
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
REACT_APP_WEB3AUTH_CLIENT_ID=your-web3auth-client-id
REACT_APP_POLYGON_CHAIN_ID=80001
4. Smart Contract Deployment (Polygon)
Navigate to the smart-contracts folder

Deploy using Hardhat:

bash
Copy
Edit
npx hardhat run scripts/deploy.js --network mumbai
Copy the deployed contract address into your backend/frontend .env files.

💻 Usage Flow
Donors log in via Web3Auth, donate via Transak, and track fund usage via the dashboard.

Aid Agencies upload distribution plans and deliver aid tracked via IoT sensors.

Beneficiaries confirm aid receipt using their mobile app.

Smart Contracts release or revoke funds based on verifiable delivery.

All transactions are recorded on Polygon blockchain for audit and transparency.

🔐 Security & Privacy
Role-based access control for agencies, donors, and recipients.

Web3Auth ensures decentralized yet secure login.

All sensitive data encrypted via Supabase policies and blockchain cryptography.

Smart contracts are tested to prevent vulnerabilities (reentrancy, overflows, etc.).

📱 Mobile App (React Native)
Cross-platform support

Low-bandwidth UI for disaster zones

Push notifications for aid updates

QR code verification for on-ground delivery agents

📈 Future Goals
🔄 Automated Reconciliation with government databases (via APIs)

🌍 Internationalization: support for regional languages

🤖 AI-driven Supply Forecasting using Lovable AI

📡 Satellite-based Aid Tracking for inaccessible regions

🏦 On-chain Insurance Claims for disaster-affected users

💬 Feedback Chatbots for beneficiaries via WhatsApp/Telegram

🧪 Testing
Smart contracts: Hardhat & Mocha

Backend APIs: Postman & Jest

Frontend: React Testing Library

Integration: End-to-end flows tested on Mumbai Testnet

🤝 Contributing
We welcome contributions! Please:

Fork the repo

Create a new branch (feature/<feature-name>)

Submit a PR with clear documentation
![image](https://github.com/user-attachments/assets/a88f1094-61bb-40e0-bb48-5d8ff61afd40)
Transak Widget Overview (Buy Crypto To Your Wallet)
Amount to Pay:
250 EUR selected by the user.

Payment Methods Available:

SEPA (Manual Bank Transfer)

VISA

Apple Pay

Google Pay

Fee Breakdown:

Total Fees: 2.62 EUR

Exchange Rate: 1 ETH = 2241.77 EUR

Estimated Crypto Received:

0.11035037 ETH

Blockchain Network:

Ethereum Mainnet

Action Button:

Large "Buy Now" button to proceed with the transaction.

Branding:

Footer includes Powered by Transak.

![Screenshot 2025-05-18 085418](https://github.com/user-attachments/assets/6b142a6d-b926-49fe-961c-4954d4a246a9)
A web3 DApp called BlockAid, using:

Transak for fiat-to-crypto onboarding.

Firebase Authentication (from the second screenshot).

Possibly integrating Ethereum wallet flows using tools like Web3Auth or ethers.js.

![WhatsApp Image 2025-05-18 at 10 47 08_f19b7128](https://github.com/user-attachments/assets/03d05f1b-71d4-4e6a-a3e6-4b98816bb415)
It clearly highlights 3 user roles:

Beneficiaries – Can request help.

Donors – Can donate (likely launching Transak).

NGOs – Can partner for verification.

Includes a "Login" button in the top-right.


![WhatsApp Image 2025-05-18 at 10 47 27_76fec7c6](https://github.com/user-attachments/assets/58d79b24-fb58-4f8b-a474-9a5a444f8ef3)
![WhatsApp Image 2025-05-18 at 10 50 20_5ef1fe04](https://github.com/user-attachments/assets/1c136da0-ab04-42e0-ac68-cefc7c6fa394)





