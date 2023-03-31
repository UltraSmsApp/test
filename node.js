const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/auto-reply', (req, res) => {
  const postUrl = req.body.postUrl;
  const autoReply = req.body.autoReply;
  const accessToken = '178ae2a52f59033ffa8e0e2a6de5d7b3'; // Replace with your own Facebook access token

  // Send a GET request to the Facebook Graph API to retrieve the comments on the post
  request.get(`https://graph.facebook.com/v12.0/${postUrl}/comments?access_token=${accessToken}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const comments = JSON.parse(body).data;
      // Loop through each comment and send an automated reply
      comments.forEach(comment => {
        const commentId = comment.id;
        const senderId = comment.from.id;
        const senderName = comment.from.name;
        const message = autoReply.replace('[NAME]', senderName); // Replace [NAME] placeholder with sender's name
        // Send a POST request to the Facebook Graph API to post the automated reply
        request.post(`https://graph.facebook.com/v12.0/${commentId}/comments?access_token=${accessToken}&message=${message}&recipient=${senderId}`);
      });
      res.status(200).json({ message: 'Automated replies sent successfully.' });
    } else {
      res.status(response.statusCode).json({ message: 'Error retrieving comments.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
