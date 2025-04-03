// Function to fetch wagon status
async function checkWagonStatus() {
  try {
    const statusElement = document.getElementById('status');
    statusElement.textContent = 'Checking if we\'re open...';
    statusElement.className = 'status';
    
    const response = await fetch('https://w1tys5btw0.execute-api.us-west-1.amazonaws.com/Prod');
    const data = await response.json();
    
    if (data.isOpen) {
      statusElement.textContent = 'We\'re OPEN! Come on in!';
      statusElement.className = 'status open';
    } else {
      statusElement.textContent = 'Sorry, we\'re CLOSED right now.';
      statusElement.className = 'status closed';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('status').textContent = 'Unable to check if we\'re open. Please call us!';
  }
}

// Check status when page loads
document.addEventListener('DOMContentLoaded', () => {
  checkWagonStatus();
  
  // Refresh status every 60 seconds
  setInterval(checkWagonStatus, 60000);
});
