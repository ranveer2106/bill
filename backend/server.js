const express = require('express');

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
})


app.post('/check',(req,res)=>{
    res.send(`Post request from  ${req.body.name}`);
})

app.listen(3999,()=>{
    console.log('Server is running on port http://localhost:3999');
})