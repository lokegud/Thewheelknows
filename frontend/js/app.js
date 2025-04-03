// Function to fetch wagon status
async function checkWagonStatus() {
  try {
    const statusElement = document.getElementById('status');
    statusElement.textContent = 'Starting API call...';
    
    // Use the correct API URL
    const apiUrl = 'https://d86jnhk4q8.execute-api.us-west-1.amazonaws.com/Prod';
    
    statusElement.textContent = 'Fetching from API...';
    const response = await fetch(apiUrl);
    
    statusElement.textContent = 'Got response! Status: ' + response.status;
    const data = await response.json();
    
    statusElement.textContent = 'Parsed data: ' + JSON.stringify(data);
    
    // Process the data
    if (data.isOpen !== undefined) {
      if (data.isOpen) {
        statusElement.textContent = 'We\'re OPEN! Come on in!';
        statusElement.className = 'status open';
      } else {
        statusElement.textContent = 'Sorry, we\'re CLOSED right now.';
        statusElement.className = 'status closed';
      }
    } else {
      statusElement.textContent = 'Unexpected API response format';
    }
  } catch (error) {
    document.getElementById('status').textContent = 'Error: ' + error.message;
  }
}
