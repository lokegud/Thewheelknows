// Function to fetch wagon status
async function checkWagonStatus() {
  try {
    const response = await fetch('https://w1tys5btw0.execute-api.us-west-1.amazonaws.com/Prod');
    const data = await response.json();
    
    const statusElement = document.getElementById('status');
    
    if (data.isOpen) {
      statusElement.textContent = 'The Wagon is OPEN';
      statusElement.className = 'status open';
    } else {
      statusElement.textContent = 'The Wagon is CLOSED';
      statusElement.className = 'status closed';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('status').textContent = 'Error checking wagon status!';
  }
}

// Check status on page load
checkWagonStatus();

// Refresh status every 10 seconds
setInterval(checkWagonStatus, 10000);
