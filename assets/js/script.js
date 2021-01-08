$(function () {});

// variables

var today = moment().format("dddd, MMMM Do");
var now = moment().format("H A");

// display current day

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


// for-loop for enterWorkday

for (var i = 0; i < enterWorkday.length; i ++) {

    // wrapping <div> in .container using Bootstrap, adding time-block and row classes from CSS

    var timeBlock = $ ("<div>") .addClass("time-block row")

    // time holding <div> using Bootstrap, adding hour class from CSS, setting collumn length to 1/12 per Bootstrap

    var hour = $ ("<div>") .addClass("hour col-md-1").text(enterWorkday [i].time)

    // textarea for event using Bootstrap, adding description class from CSS, setting collumn length to 10/12 per Bootstrap

    var eventText = $ ("<textarea>") .addClass("description col-md-10").val(enterWorkday[i].event)

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

    // sets time and text items to local storage, converts object or value to a JSON string
    localStorage.setItem(time, JSON.stringify(text))
})

// converts time to 24-hour clock

        // function to convert time based on the time parameter
function convertTime (time) {

    // "9 AM" --> ["9", "AM"], parse the integer 9 to make sure it is not a string
    var newTime = parseInt(time.split(" ")[0]) // [0] refers to H of "H A"
    // sets newtime at 12 PM
    if (time === "12 PM") {
        newTime = 12
    }

    // sets newTime for after 12 PM
    else if (time.split(" ")[1]==="PM"){ // [1] refers to A of "H A"
        newTime = newTime +12 
       }
    // sets newTime for before 12 PM
    return newTime
}

// color rows based on time

function setColor () {

    // function for each .time-block class
    $(".time-block").each(function() {

        //establishes block variable based on the time in the .hour class
    var block = $ (this).children(".hour").text()

        // establishes block1 variable based on the convertTime function with block parameter
    var block1 = convertTime(block)
        // establishes now1 variable as 24-hour time based on moment.js function
    var now1 = moment().hours()
    console.log(block1, now1);

        // if current time is after the time on workday scheduler
        if (block1 < now1) {
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");
        }
        // if current time is same as the time on workday scheduler
        else if (block1 === now1) {
            $(this).removeClass("past");
            $(this).addClass("present");
            $(this).removeClass("future");
        }
        // if current time is before the time on workday scheduler
        else {
            $(this).removeClass("present");
            $(this).removeClass("past");
            $(this).addClass("future");
        }
    })
}

// run the setColor function

setColor ();

//re-run the setColor function every minute
setInterval(setColor, 60000);