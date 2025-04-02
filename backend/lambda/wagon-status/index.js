exports.handler = async (event) => {
  try {
    const https = require('https');
    
    // Function to make HTTPS requests
    const request = (options) => {
      return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => { 
            resolve({ 
              statusCode: res.statusCode, 
              data: JSON.parse(data) 
            }); 
          });
        });
        req.on('error', (e) => { reject(e); });
        req.end();
      });
    };
    
    // Call Govee API
    const options = {
      hostname: 'developer-api.govee.com',
      path: '/v1/devices/state?device=C5:85:D4:AD:FC:EA:48:A3&model=H5083',
      method: 'GET',
      headers: {
        'Govee-API-Key': 'c4964d79-0a45-4eae-82cc-99876188c37e'
      }
    };
    
    const response = await request(options);
    console.log('API Response:', JSON.stringify(response.data));
    
    // Extract power state
    let powerState = 'off';
    if (response.data && response.data.data && response.data.data.properties) {
      const properties = response.data.data.properties;
      for (const prop of properties) {
        if (prop.powerState) {
          powerState = prop.powerState;
          break;
        }
      }
    }
    
    const isOpen = powerState === 'on';
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isOpen, powerState })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: String(error), message: 'Failed to check wagon status' })
    };
  }
};
