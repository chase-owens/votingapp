const express = require('express'),
  app = express();

//Middleware that will read request body
const fs = require('file-system'),
  bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // res.sendFile(__dirname + '/style.css');
});

app.get('/poll', (req, res) => {
  fs.readFile(__dirname + '/poll.json', 'utf8', function(err, data) {
    res.send(data);
  });
});

app.post('/vote/new', (req, res) => {
  switch (req.body.vote) {
    case 'linux':
      castVote(req, res, 'linux');
      break;
    case 'macOS':
      castVote(req, res, 'macOS');
      break;
    case 'windows':
      castVote(req, res, 'windows');
      break;
    // case default:
    //   res.redirect('/?incorrect+input');
    //   break;
  }
  console.log(req.body.vote);
});

let castVote = (req, res, vote) => {
  let poll = {};
  fs.readFile(__dirname + '/poll.json', 'utf8', function(err, data) {
    poll = JSON.parse(data);
    poll[vote] += 1;
    console.log(poll);
    fs.writeFile(__dirname + '/poll.json', JSON.stringify(poll), function(
      err,
      data
    ) {
      console.log(err);
      console.log(data);
      res.status(200).send('want to <a href="/"vote</a> again');
    });
  });
  console.log(poll);
};

app.listen(3001, () => {
  console.log('listening on port 3001');
});
