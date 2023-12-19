function getData() {
  const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/77v0clAUFMG6yVdD6sEp/scores';
  const scoresBody = document.getElementById('scoresBody');

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      displayScores(data.result);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      scoresBody.innerHTML = `<tr><td colspan="3">Error fetching data: ${error.message}</td></tr>`;
    });
}

function postData() {
  const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/77v0clAUFMG6yVdD6sEp/scores';
  const scoresBody = document.getElementById('scoresBody');

  const userName = document.getElementById('userName').value;
  const userScore = document.getElementById('userScore').value;

  const postData = {
    user: userName,
    score: parseInt(userScore, 10),
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data posted:', data);
      // Display the updated data on the screen
      getData();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // Display the error on the screen
      scoresBody.innerHTML = `<tr><td colspan="3">Error posting data: ${error.message}</td></tr>`;
    });
}

function displayScores(scores) {
  const scoresBody = document.getElementById('scoresBody');
  scoresBody.innerHTML = ''; // Clear previous content

  scores.forEach(score => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.classList.add('name-column');
    nameCell.textContent = score.user;

    const scoreCell = document.createElement('td');
    scoreCell.classList.add('score-column');
    scoreCell.textContent = score.score;

    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    scoresBody.appendChild(row);
  });
}
