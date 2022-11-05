const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

function classify(query){
  if(query.includes("product")){
    return '*'
  }
  if(query.includes("multiply")){
    return '*'
  }
  if(query.includes("times")){
    return '*'
  }
  if(query.includes("*")){
    return '*'
  }
  if(query.includes("subtract")){
    return '-'
  }
  if(query.includes("difference")){
    return '-'
  }
  if(query.includes("minus")){
    return '-'
  }
  if(query.includes("-")){
    return '-'
  }
  if(query.includes("add")){
    return '+'
  }
  if(query.includes("plus")){
    return '+'
  }
  if(query.includes("+")){
    return '+'
  }
  console.log(query)
  return (0)
}


app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

const Operation = {
  addition : 'addition',
  subtraction: 'subtraction',
  multiplication: 'multiplication',
  division: 'division'
};

var math_it_up = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '/': function (x, y) { return x / y },
  '*': function (x, y) { return x * y },
}

app.get('/', (req, res) => {
  res.send({
    slackUsername: 'topingstar', backend: true, age : 24, bio: 'I am Topister, 24 years old. Currently a computer science student at African Leadership University. I am more focused in Backend development.I am very much interested in learning new technology and using them.'
 })
})

app.post('/task2', (req, res) => {
    let {operation_type, x, y} = req.body;
    var obj = req.body
    console.log(req.body)
    let todo;

    if(operation_type == Operation.addition){
      todo = '+'
    } else if(operation_type == Operation.subtraction){
      todo = '-'
    } else if(operation_type == Operation.multiplication){
      todo = '*'
    } else if(operation_type == Operation.division){
      todo = '/'
    } else {
      todo = null
    }

    if(todo == null){
      todo = classify(operation_type);
      if(todo == '*'){
        operation_type = Operation.multiplication
      }
      if(todo == '-'){
        operation_type = Operation.subtraction
      }
      if(todo == '+'){
        operation_type = Operation.addition
      }
    }

    console.log(todo)

    if(x == '' || y == ''){
      return res.send({'res': 'An error occured'})
    }

    return res.send({
      "slackUsername": "topingstar",
      "operation_type": operation_type,
      "result": math_it_up[todo](parseInt(x), parseInt(y)),
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})