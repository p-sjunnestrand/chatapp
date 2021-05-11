var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  let loginForm = `<link rel="stylesheet" href="/stylesheets/style.css">
                  <main>
                    <div id="loginDiv">
                      <div><label for="nameInput">Choose your chat name</label></div>
                      <input type="text" id="nameInput">
                      <button id="sendNameBtn">Send</button>
                    </div>
                  </main>
                  <script>
                    document.getElementById('sendNameBtn').addEventListener('click', ()=>{
                      let userName = document.getElementById('nameInput').value
                      if(userName){
                        fetch('https://sjunnestrand-chat-app.herokuapp.com/login', {
                          method: 'post',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({userName: userName})
                        })
                        .then(result => result.json())
                        .then(data => {
                          console.log(data);
                          localStorage.setItem('userName', data.userName);
                          console.log('LS:', localStorage.getItem('userName'));
                          window.location.replace(window.location.origin);
                        })
                      }
                    })
                  </script>`;
  res.send(loginForm);
});
router.post('/', (req, res) => {
  console.log(req.body.userName);
  let userName = req.body.userName;
  res.json({userName: userName})
})
module.exports = router;
