// Function to fetch wagon status
async function checkWagonStatus() {
  try {
    const statusElement = document.getElementById('status');
    statusElement.textContent = 'Checking if we\'re open...';
    
    const response = await fetch('https://d86jnhk4q8.execute-api.us-west-1.amazonaws.com/Prod');
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    
    // Show status on page
    if (data.isOpen) {
      statusElement.textContent = 'We\'re OPEN! Come on in!';
      statusElement.className = 'status open';
    } else {
      statusElement.textContent = 'Sorry, we\'re CLOSED right now.';
      statusElement.className = 'status closed';
    }
  } catch (error) {
    // This will show errors directly on the page
    document.getElementById('status').textContent = `Error: ${error.message}`;
    document.getElementById('status').className = 'status closed';
  }
}
