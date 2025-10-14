<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlockAid - Blockchain-Based Disaster Relief System</title>
  <style>
    body {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    h1, h2, h3 {
      color: #38bdf8;
    }
    code {
      background: #1e293b;
      color: #22d3ee;
      padding: 2px 5px;
      border-radius: 4px;
    }
    pre {
      background: #1e293b;
      padding: 10px;
      border-radius: 8px;
      overflow-x: auto;
    }
    .section {
      margin-bottom: 40px;
    }
    ul {
      list-style-type: "✅ ";
      margin-left: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      background-color: #1e293b;
    }
    th, td {
      border: 1px solid #334155;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #0ea5e9;
      color: #fff;
    }
    img {
      width: 100%;
      max-width: 600px;
      border-radius: 10px;
      margin-top: 10px;
    }
    a {
      color: #38bdf8;
    }
  </style>
</head>
<body>

  <h1>🌐 BlockAid - Blockchain-Based Disaster Relief System</h1>

  <div class="section">
    <h2>🚨 Problem Statement</h2>
    <p>Natural disasters often reveal systemic issues in humanitarian aid, including:</p>
    <ul>
      <li>🕒 Delays in fund release and aid delivery</li>
      <li>💸 Corruption and misallocation of resources</li>
      <li>❌ Lack of transparency and accountability</li>
      <li>🧾 Inefficient tracking of aid and donations</li>
    </ul>
    <p><strong>BlockAid</strong> aims to revolutionize disaster relief using decentralized, transparent, and secure blockchain technology.</p>
  </div>

  <div class="section">
    <h2>✅ Solution Overview</h2>
    <p><strong>BlockAid</strong> is a decentralized platform leveraging blockchain, smart contracts, Web3 authentication, and IoT-based real-time tracking to make disaster relief:</p>
    <ul>
      <li>Transparent 🔍</li>
      <li>Efficient ⚡</li>
      <li>Tamper-proof 🔐</li>
      <li>User-verified 📲</li>
    </ul>
  </div>

  <div class="section">
    <h2>✨ Core Features</h2>
    <ul>
      <li>Immutable Recordkeeping using Hyperledger Fabric / Polygon</li>
      <li>Smart Contracts for automated fund release</li>
      <li>Web3Auth for secure wallet & social login</li>
      <li>Transak Integration for fiat-to-crypto donations</li>
      <li>IoT Integration for real-time aid tracking</li>
      <li>Beneficiary Feedback via mobile/web apps</li>
      <li>Polygon Smart Contracts for donation verification</li>
      <li>Lovable AI for decision logic & interactivity</li>
      <li>Supabase backend for scalable user data</li>
    </ul>
  </div>

  <div class="section">
    <h2>🧠 Tech Stack</h2>
    <table>
      <tr><th>Layer</th><th>Technologies Used</th></tr>
      <tr><td>Blockchain</td><td>Hyperledger Fabric, Polygon, Solidity</td></tr>
      <tr><td>Smart Contracts</td><td>Solidity on Polygon (Mumbai Testnet)</td></tr>
      <tr><td>Backend</td><td>Supabase, Node.js, Express</td></tr>
      <tr><td>Frontend</td><td>React.js, React Native, Lovable AI</td></tr>
      <tr><td>Authentication</td><td>Web3Auth (wallet & social login)</td></tr>
      <tr><td>Payments</td><td>Transak (Fiat-to-Crypto gateway)</td></tr>
      <tr><td>IoT</td><td>MQTT / WebSockets</td></tr>
      <tr><td>AI</td><td>Lovable AI</td></tr>
      <tr><td>Hosting</td><td>Vercel, Supabase, IPFS</td></tr>
    </table>
  </div>

  <div class="section">
    <h2>🚀 Getting Started</h2>
    <ol>
      <li><strong>Clone the Repository</strong>
        <pre><code>git clone https://github.com/&lt;your-username&gt;/blockaid.git
cd blockaid</code></pre>
      </li>
      <li><strong>Install Dependencies</strong>
        <pre><code>cd backend
npm install
cd ../frontend
npm install</code></pre>
      </li>
      <li><strong>Environment Setup</strong>
        <pre><code>/backend/.env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-service-role-key
WEB3AUTH_CLIENT_ID=your-web3auth-client-id
TRANSAK_API_KEY=your-transak-key

/frontend/.env
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
REACT_APP_WEB3AUTH_CLIENT_ID=your-web3auth-client-id
REACT_APP_POLYGON_CHAIN_ID=80001</code></pre>
      </li>
      <li><strong>Smart Contract Deployment (Polygon)</strong>
        <pre><code>cd smart-contracts
npx hardhat run scripts/deploy.js --network mumbai</code></pre>
      </li>
    </ol>
  </div>

  <div class="section">
    <h2>💻 Usage Flow</h2>
    <ul>
      <li>Donors log in via Web3Auth, donate via Transak, and track fund usage via dashboard.</li>
      <li>Aid agencies upload plans and track aid via IoT sensors.</li>
      <li>Beneficiaries confirm receipt using mobile app.</li>
      <li>Smart contracts release/revoke funds upon verification.</li>
      <li>All transactions are recorded on Polygon blockchain.</li>
    </ul>
  </div>

  <div class="section">
    <h2>🔐 Security & Privacy</h2>
    <ul>
      <li>Role-based access for donors, agencies, and recipients.</li>
      <li>Web3Auth for decentralized, secure logins.</li>
      <li>Supabase encryption & blockchain cryptography.</li>
      <li>Smart contract testing (reentrancy, overflow prevention).</li>
    </ul>
  </div>

  <div class="section">
    <h2>📱 Mobile App (React Native)</h2>
    <ul>
      <li>Cross-platform support</li>
      <li>Low-bandwidth UI for disaster zones</li>
      <li>Push notifications for aid updates</li>
      <li>QR verification for delivery agents</li>
    </ul>
  </div>

  <div class="section">
    <h2>📈 Future Goals</h2>
    <ul>
      <li>🔄 Automated government API reconciliation</li>
      <li>🌍 Regional language support</li>
      <li>🤖 AI-driven supply forecasting</li>
      <li>📡 Satellite-based aid tracking</li>
      <li>🏦 On-chain insurance claims</li>
      <li>💬 Feedback chatbots (WhatsApp/Telegram)</li>
    </ul>
  </div>

  <div class="section">
    <h2>🧪 Testing</h2>
    <ul>
      <li>Smart contracts: Hardhat & Mocha</li>
      <li>Backend APIs: Postman & Jest</li>
      <li>Frontend: React Testing Library</li>
      <li>Integration: Mumbai Testnet</li>
    </ul>
  </div>

  <div class="section">
    <h2>🤝 Contributing</h2>
    <p>We welcome contributions!</p>
    <ol>
      <li>Fork the repo</li>
      <li>Create a new branch (<code>feature/&lt;feature-name&gt;</code>)</li>
      <li>Submit a PR with clear documentation</li>
    </ol>
  </div>

  <div class="section">
    <h2>🖼️ Screenshots</h2>
    <img src="https://github.com/user-attachments/assets/a88f1094-61bb-40e0-bb48-5d8ff61afd40" alt="Transak Widget Overview">
    <img src="https://github.com/user-attachments/assets/6b142a6d-b926-49fe-961c-4954d4a246a9" alt="BlockAid DApp Interface">
    <img src="https://github.com/user-attachments/assets/03d05f1b-71d4-4e6a-a3e6-4b98816bb415" alt="User Roles Overview">
    <img src="https://github.com/user-attachments/assets/58d79b24-fb58-4f8b-a474-9a5a444f8ef3" alt="Beneficiary UI">
    <img src="https://github.com/user-attachments/assets/1c136da0-ab04-42e0-ac68-cefc7c6fa394" alt="Donation Flow">
  </div>

</body>
</html>
