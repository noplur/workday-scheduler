$(function () {});

// variables

var today = moment().format("dddd, MMMM Do");
var now = moment().format("H A");

$("#currentDay").text(today);

// entries for each hour of day and  // grab item from local storage --> will grab the time or event entry 

var enterWorkday = [
    {time: "9 AM", event: JSON.parse(localStorage.getItem("9 AM")) || " " },
    {time: "10 AM", event: JSON.parse(localStorage.getItem("10 AM")) || " " },
    {time: "11 AM", event: JSON.parse(localStorage.getItem("11 AM")) || " " },
    {time: "12 PM", event: JSON.parse(localStorage.getItem("12 PM")) || " " },
    {time: "1 PM", event: JSON.parse(localStorage.getItem("1 PM")) || " " },
    {time: "2 PM", event: JSON.parse(localStorage.getItem("2 PM")) || " " },
    {time: "3 PM", event: JSON.parse(localStorage.getItem("3 PM")) || " " },
    {time: "4 PM", event: JSON.parse(localStorage.getItem("4 PM")) || " " },
    {time: "5 PM", event: JSON.parse(localStorage.getItem("5 PM")) || " " },
];

// create grid

var container = $ (".container") 


// for loop for enterWorkday

for (var i = 0; i < enterWorkday.length; i ++) {

    // wrapping <div> in .container using Bootstrap, adding time-block and row classes from CSS

    var timeBlock = $ ("<div>") .addClass("time-block row")

    // time holding <div> using Bootstrap, adding hour class from CSS, setting collumn length to 1/12 per Bootstrap

    var hour = $ ("<div>") .addClass("hour col-md-1").text(enterWorkday [i].time)

    // textarea for event using Bootstrap, adding description class from CSS, setting collumn length to 10/12 per Bootstrap
    
    var blockColor = colorRow();

    var eventText = $ ("<textarea>") .addClass("description col-md-10 " + blockColor).val(enterWorkday[i].event)

    // save button using Bootstrap, adding saveBtn class, setting collumn length to 1/12 per Bootstrap

    var saveBtn = $ ("<button>") .addClass("saveBtn col-md-1 btn")
    // add icon, using fas fa-save class from Bootstrap
    var icon = $ ("<i>") .addClass("fas fa-save")

    // adds rows to container div by appending saveBtn, timeBlock and container (adds value)

    saveBtn.append (icon)
    timeBlock.append (hour)
    timeBlock.append (eventText)
    timeBlock.append (saveBtn)
    container.append (timeBlock)
}

// end of for loop for enterWorkday

// save event to storage

    // function for when save button is clicked
$ (".saveBtn").on("click",function() {
    // inputs event description, this is used to avoid rerunning DOM query
    var text = $(this)
    // siblings is used because description and hour class share same parent element
    .siblings(".description").val()
    
    // inputs time of day
    var time = $(this)
    .siblings(".hour").text()

    // sets time and text items to local storage, converts object or value to a JSON strong
    localStorage.setItem(time, JSON.stringify(text))
})


// color rows based on time
function colorRow() {
    var planNow = moment(now, "H A");
    var planEntry = moment(hour, "H A");
    
    if (planNow.isBefore(planEntry)) {
        return "future";
    }
    else if (planNow.isAfter(planEntry)) {
        return "past";
    }
    else {
        return "present";
    }
}



// If i can't find it with moment.js, I can use 24 hour clock: moment ().hours ()
// then create function to convert am/pm to 24 hr clock
// .split (" ") will separate string into array ["9", "AM"]