// Function to fetch wagon status
async function checkWagonStatus() {
  try {
    const statusElement = document.getElementById('status');
    
    // Show which step we're on
    statusElement.textContent = '(1) Starting API call...';
    
    // Use the correct API URL
    const apiUrl = 'https://d86jnhk4q8.execute-api.us-west-1.amazonaws.com/Prod';
    statusElement.textContent = `(2) Will fetch from: ${apiUrl}`;
    
    // Make the fetch call with explicit CORS mode
    const response = await fetch(apiUrl, {
      method: 'GET',
      mode: 'cors', // Explicitly request CORS
      headers: {
        'Accept': 'application/json'
      }
    });
    
    statusElement.textContent = `(3) Response status: ${response.status} ${response.statusText}`;
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    statusElement.textContent = `(4) Content-Type: ${contentType}`;
    
    // Parse the response
    const text = await response.text();
    statusElement.textContent = `(5) Raw response: ${text.substring(0, 100)}...`;
    
    let data;
    try {
      data = JSON.parse(text);
      statusElement.textContent = `(6) Parsed JSON: ${JSON.stringify(data)}`;
    } catch (parseError) {
      statusElement.textContent = `Error parsing JSON: ${parseError.message}`;
      return;
    }
    
    // Check data structure
    if (data && data.isOpen !== undefined) {
      statusElement.textContent = `(7) Found isOpen: ${data.isOpen}`;
      
      if (data.isOpen) {
        statusElement.textContent = 'We\'re OPEN! Come on in! (updates every minute)';
        statusElement.className = 'status open';
      } else {
        statusElement.textContent = 'Sorry, we\'re CLOSED right now. (updates every minute)';
        statusElement.className = 'status closed';
      }
    } else {
      statusElement.textContent = `Error: Unexpected API response format. Got: ${JSON.stringify(data)}`;
    }
  } catch (error) {
    document.getElementById('status').textContent = `Error: ${error.name}: ${error.message}`;
  }
}

// Run immediately
checkWagonStatus();

// Check status every 30 seconds instead of 10
setInterval(checkWagonStatus, 30000);
