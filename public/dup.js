document.getElementById('uploadButton').addEventListener('click', async () => {
    const input = document.getElementById('fileInput').files;
    
    if (input.length === 0) {
        alert('Please select a directory.');
        return;
    }

    const formData = new FormData();
    for (const file of input) {
        formData.append('files[]', file);
    }

    try {
        const response = await fetch('http://localhost:3000/api/deduplicate', {
            method: 'POST',
            body: formData
        });

        if (!response) {
            throw new Error('Network response was not ok');
        }
        console.table(response);

        const result = await response.json();
        displayResults(result);
        
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the files.');
    }
});

function displayResults(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results
    console.log(Object.entries(result.message));
    for(let [key, value] of Object.entries(result.message)){ // Use destructuring for clarity
        resultDiv.innerHTML += '<div>' + value.originalname + '</div>'; // Append new results
    }
    
}
