const PORT = 5000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = express.Router();
app.use("/api", routes);
const mongoose = require("mongoose");
const Employee = require("./models/employee");
const Task = require('./models/task');

// body-parser
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
const jsonParser = bodyParser.json();

//alow cors 
app.use(cors({origin:['http://localhost:3000' ]}));
routes.use(cors({origin:['http://localhost:3000' ]}));
app.use(express.json())


// mongoDB client
const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://salha_medinixD:KONTghalet1@cluster0.uplga9z.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to server
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT} ELHAMDOULAH` );
});

// connect to DB
const DATABASE = "test";
client.connect((err) => {
  if (err) {

    throw Error(err);
  }
  !err && console.log(`Successfully connected to database mara thenyaaa `);
  const db = client.db(DATABASE);
  const employees = db.collection("employees");
  const task = db.collection("tasks");
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) {
        console.log("connected");
      }
    }
  );


//Getters -----------------------------------------------------------------------------

  // GET ALL Employees temchiiii 
  routes.get("/employees", async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*")
    try{
      const data = await Employee.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  }); 
  // GET Empoyee by Id
  routes.get("/employee/:id", async (req, res) => {
    try{
        const data = await Employee.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});
//GET EMPLOYEE BY SUP
routes.get("/employees/:sup", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")

  try{
      let data =await Employee.find({sup: req.params.sup});
          res.json(data);
  
  }catch(err){
      console.log(err)
  }
});
//GET EMPLOYEE BY NAME
routes.get("/employeen/:name", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")

  try{
      let data =await Employee.find({nom: req.params.name});
          res.json(data);
  
  }catch(err){
      console.log(err)
  }
});
//GET EMPLOYEE BY GRADE
routes.get("/employeeg/:grade", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")

  try{
      let data =await Employee.find({grade: req.params.grade});
          res.json(data);
  
  }catch(err){
      console.log(err)
  }
});
//GET EMPLOYEE BY ADDRESS
routes.get("/employeea/:address", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")

  try{
      let data =await Employee.find({adresse: req.params.address});
          res.json(data);
  
  }catch(err){
      console.log(err)
  }
});

//GET all Tasks temchiiii 
routes.get("/tasks", async (req,res)  =>{
  try{
    const data = await Task.find();
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
});
	
  // GET Task by Id
  routes.get("/findt/:id", async (req, res) => {
    try{
        const data = await Task.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Read Task by User Id
routes.get("/task/:ide", async (req,res)  =>{
  res.setHeader("Access-Control-Allow-Origin","*")

  try{
      let data =await Task.find({ide: req.params.ide});
          res.json(data);
  
  }catch(err){
      console.log(err)
  }

});
	
//Create -----------------------------------------------------------------------
//Create Employee
routes.post('/add_employee', async (req, res) =>{
    try{
        let new_employee = new Employee({
          id:req.body.id,
            nom:req.body.nom,
            prenom: req.body.prenom,
            adresse:req.body.adresse,
            numcompte:req.body.numcompte,
            grade:req.body.grade,
            sup:req.body.sup
        });
        await new_employee.save();
        res.send("save effcetue avec success");
    }
    catch(err){
        console.log(err);
    }
})

//Create Task by Employee ID
routes.post('/add_task', async (req, res) =>{
    try{
        let new_task = new Task({
          id: req.body.id,
            desc:req.body.desc,
            ide: req.body.ide,
           
        });
        await new_task.save();
        res.send("save effcetue avec success");
    }
    catch(err){
        console.log(err);
    }
})
});
//DELETE -------------------------------------------------------------------
//delete employee
routes.delete('/deletee/:id', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  try {
      const id = req.params.id;
     await Employee.findByIdAndDelete(id);
      res.send(`Document has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
//delete Task 
routes.delete('/deletet/:id', async (req, res) => {
  
  try {
      const id = req.params.id;
     let data= await Task.findByIdAndDelete(id);
      res.send(`Document with description has been deleted..`);
    
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

//UPDATE -----------------------------------------------------------------------------

//Update EMPLOYEE by ID 
routes.patch('/updatee/:id', async (req, res) => {
  try {
      const _id = req.params.id;
      const updatedData = req.body;
      
      const options = { new: true };

      const result = await Employee.findByIdAndUpdate(
          _id,updatedData, options
      )

      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
//Update task BY ID 
routes.patch('/updatet/:id', async (req, res) => {
  try {
      const _id = req.params.id;
      const updatedData = req.body;
      
      const options = { new: true };

      const result = await Task.findByIdAndUpdate(
          _id,updatedData, options
      )

      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

//routes
routes.get("/", (req, res) => {
  res.send("Hello World!");
});














