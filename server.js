//npm install express --save
var express = require('express');
var app = express();

//Allow cross domain request
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//npm install ejs --save
app.set('view engine', 'ejs');
app.use(express.static('public'));

//npm install body-parser --save
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//npm install formidable --save
var formidable = require('formidable');
var util = require('util');

//npm install mongoose --save
var mongoose= require('mongoose');
var placeSchema = mongoose.Schema({
    name:{type: String,required: true},
    lat:{type: Number,required: true},
    lng:{type: Number,required: true},
    overview:{type: String,required: true},
    address: {street:String,city:String,zipCode:String,country:String},
    description:String,
    hidden:Boolean,
    photoPath:String,
    pictoPath:String,
    timeRange:[{day:Number,fromHour:Number, fromMinute:Number, toHour:Number, toMinute:Number}],
    service:[String],
    type:[String]
});
var placeModel = mongoose.model('place', placeSchema);

//Valeurs initiales
var initialPlaces = [
    {name:"Paris",
    lat:48.866667,
    lng:2.333333,
    overview:"C’est paris",
    address: {street:"Au centre de",city:"Paris",zipCode:"75001",country:"France"},
    description:"",
    hidden:false,
    photoPath:"",
    pictoPath:"",
    timeRange:[{day:0,fromHour:8, fromMinute:30, toHour:18, toMinute:30},
        {day:1,fromHour:8, fromMinute:30, toHour:18, toMinute:30},
        {day:2,fromHour:8, fromMinute:30, toHour:18, toMinute:30},
        {day:3,fromHour:8, fromMinute:30, toHour:18, toMinute:30},
        {day:4,fromHour:8, fromMinute:30, toHour:18, toMinute:30}],
    service:[],
    type:[]},

    {name:"Tour Eiffel",
    lat:48.858069,
    lng:2.294385,
    overview:"La tour Eiffel",
    address: {street:"Champ de Mars, 5 Avenue Anatole",city:"Paris",zipCode:"75007",country:"France"},
    description:"",
    hidden:false,
    photoPath:"",
    pictoPath:"",
    timeRange:[{day:0,fromHour:8, fromMinute:0, toHour:19, toMinute:30},
        {day:1,fromHour:8, fromMinute:0, toHour:19, toMinute:30},
        {day:2,fromHour:8, fromMinute:0, toHour:19, toMinute:30},
        {day:3,fromHour:8, fromMinute:0, toHour:19, toMinute:30},
        {day:4,fromHour:8, fromMinute:0, toHour:19, toMinute:30}],
    service:[],
    type:[]},

    {name:"Beaubourg",
    lat:48.860649,
    lng:2.35219,
    overview:"Voila beaubourg",
    address: {street:"Place Georges-Pompidou",city:"Paris",zipCode:"75004",country:"France"},
    description:"",
    hidden:false,
    photoPath:"",
    pictoPath:"",
     timeRange:[{day:0,fromHour:9, fromMinute:0, toHour:19, toMinute:0},
        {day:1,fromHour:9, fromMinute:0, toHour:19, toMinute:0},
        {day:2,fromHour:9, fromMinute:0, toHour:19, toMinute:0},
        {day:3,fromHour:9, fromMinute:0, toHour:19, toMinute:0},
        {day:4,fromHour:9, fromMinute:0, toHour:19, toMinute:0},
        {day:5,fromHour:9, fromMinute:0, toHour:19, toMinute:0},
        {day:6,fromHour:9, fromMinute:0, toHour:19, toMinute:0}],
    service:[],
    type:[]},

    {name:"Wereso",
    lat:48.864792,
    lng:2.350152,
    overview:"wereso style, club 128, la coordonnerie, super pub a 3 euros la pinte trop grave bien",
    address: {street:"151 Rue St Denis",city:"Paris",zipCode:"75002",country:"France"},
    description:"",
    hidden:true,
    photoPath:"",
    pictoPath:"",
    timeRange:[{day:1,fromHour:10, fromMinute:0, toHour:20, toMinute:30},
        {day:2,fromHour:10, fromMinute:0, toHour:20, toMinute:30},
        {day:3,fromHour:10, fromMinute:0, toHour:20, toMinute:30},
        {day:4,fromHour:10, fromMinute:0, toHour:20, toMinute:30},
        {day:5,fromHour:10, fromMinute:0, toHour:20, toMinute:30}],
    service:[],
    type:[]}
];

//--------------------------------------- Routes ---------------------------------------//
app.get("/", function (req, res) {
    res.write("Hello");
});

app.post("/getAllData", function (req, res) {
    console.log("initialPlaces : " + initialPlaces);
    res.send(initialPlaces);

    /*placeModel.find(function (err, placeList) {
        var endValue;
        if(err != undefined)
        {
            console.log("MongoDb Error : " + error);
            endValue = "MongoDb Error : " + error;
        }
        else
        {
            //console.log("search done" + placeList);
            endValue =placeList;
        }

        res.send(endValue);
    });*/
});

app.get("/testData", function (req, res) {
    console.log("initialPlaces : " + initialPlaces);
    res.send(initialPlaces);

    /*placeModel.find(function (err, placeList) {
        var endValue;
        if(err != undefined)
        {
            console.log("MongoDb Error : " + error);
            endValue = "MongoDb Error : " + error;
        }
        else
        {
            //console.log("search done" + placeList);
            endValue =placeList;
        }

        res.send(endValue);
    });*/
});

app.get("/newData", function (req, res) {
    res.render('newData');
});

app.post("/getFilterData", function (req, res) {
    placeModel.find({userId:req.session.userId}, function (err, placeList) {
        var endValue;
        if(err != undefined)
        {
            endValue = "MongoDb Error : " + error;
        }
        else
        {
            //console.log("search done" + placeList);
            endValue =placeList;
        }
        res.send(endValue);
    });
});



app.post("/createData", function (req, res) {
    var data = req.body;
    var endValue;

    if(data.name != undefined && data.lat != undefined && data.lng != undefined && data.overview != undefined)
    {
        
        var address = {street:"",city:"",zipCode:"",country:""};
        var description = "";
        var hidden = false;
        var photoPath= "";
        var pictoPath= "";
        var timeRange = [];
        var service=[];
        var type=[];

        //Optional fields
        if(data.description != undefined)
            description = data.description;
        if(data.hidden != undefined)
            hidden = data.hidden;
        if(data.photoPath != undefined)
            photoPath = data.photoPath;
        if(data.pictoPath != undefined)
            pictoPath = data.pictoPath;
        if(data.timeRange != undefined)
            timeRange = data.timeRange; // A gérer différemment
        if(data.service != undefined)
            service = data.service;
        if(data.type != undefined)
            type = data.type;

        var newPlace = new placeModel({
            name:data.name,
            lat:data.lat,
            lng:data.lng,
            overview:data.overview,
            address: address,
            description:description,
            hidden:hidden,
            photoPath:photoPath,
            pictoPath:pictoPath,
            timeRange:[{day:Number,fromHour:Number, fromMinute:Number, toHour:Number, toMinute:Number}],
            service:[String],
            type:[String]
        });

        newPlace.save(function (error, wishMovie) {
            if(error != undefined)
            {
                console.log("MongoDb Error : " + error);
                endValue = "MongoDb Error : " + error;
            }
            else
            {
                console.log("add done" + wishMovie);
                endValue = "MongoDb newPlace.id : " + newPlace.id;
            }
        });
    }
    else
    {
        endValue = "Missing required values to create new place";
    }

    res.end(endValue);
});

//--------------------------------------- Helper ---------------------------------------//


//--------------------------------------- Listener ---------------------------------------//
var port = (process.env.PORT || 8080)

app.listen(port, function () {
    var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};

    mongoose.connect('mongodb://michael:michael@ds123933.mlab.com:23933/finalproject',options, function(err) {
        if(err != undefined)
            console.log(err);
    });

  console.log("Server listening on port " + port);
});