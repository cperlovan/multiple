const fetch = require('node-fetch');

// Replace with your actual Vercel URL
const BASE_URL = 'https://your-vercel-backend-url.vercel.app';

async function testEndpoint(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const data = await response.json();
    console.log(`✅ ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ ${endpoint}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🔍 Testing API endpoints...');
  
  // Test basic endpoints
  await testEndpoint('/api/test');
  await testEndpoint('/api/db-status');
  
  // You can add more endpoint tests here
  
  console.log('✅ Test complete');
}

main().catch(console.error); 