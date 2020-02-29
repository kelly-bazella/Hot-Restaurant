const express = require("express");
const path = require("path");


var app = express();
var PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Restaurant DATA//
//==================================

// let newReservations = [{
//     name: $('#name').val().trim(),
//     phone: $('#phone').val().trim(),
//     email: $('#email').val().trim(),
//     id: $('#id').val().trim()

// }];

let currentRes = [
    {
    routeName: "reservations",
    name:"",
    phone: "",
    email: "",
    id: ""
}];

//Routes
//======================================
app.post("/api/reservations", function(req, res){
    let newReservations= req.body;

    newReservations.routeName = newReservations.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservations);

    currentRes.push(newReservations);
    res.json(newReservations);
})
//Basic route that send the user first to the AJAX Page
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/reservations", function(req, res){
    res.sendFile(path.join(__dirname,"reservation.html"))
});



app.get("/api/confirm", function(req,res){
    return res.json(currentRes)
});

app.get("/api/waitlist", function(req,res){
    return res.json(currentRes)
})


//Starts the server listening to begin listening
//======================================

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
})