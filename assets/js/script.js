var tasks = {};

// variables

var today = moment().format("dddd, MMMM Do");

$("#currentDay").text(today);

// entries for each hour of day and  // grabbing local storage

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

    // wrapping div

    var timeBlock = $ ("<div>") .addClass("time-block row")

    // time holding div

    var hour = $ ("<div>") .addClass("hour col-md-1").text(enterWorkday [i].time)

    // text area for event

    var eventText = $ ("<textarea>") .addClass("description col-md-10").val(enterWorkday[i].event)



    // save button

    var saveBtn = $ ("<button>") .addClass("saveBtn col-md-1 btn")
    var icon = $ ("<i>") .addClass("fas fa-save")

    // append

    saveBtn.append (icon)
    timeBlock.append (hour)
    timeBlock.append (eventText)
    timeBlock.append (saveBtn)
    container.append (timeBlock)
}

// save event to storage

$ (".saveBtn").on("click",function() {
    var text = $(this)
    .siblings(".description").val()
    
    var time = $(this)
    .siblings(".hour").text()

    localStorage.setItem(time, JSON.stringify(text))
})

// load event from local storage



// create event

// var createEvent = function(eventText, eventList) {
//     // create elements that make up an event item
//     var eventLi = $("<>").addClass("container");
  
//     var eventP = $("").addClass("").text(eventText);
  
//     // append span and p element to parent li
//     eventLi.append(eventP);
  
//     // check due date
//     auditEvent(eventLi);
  
//     // append to ul list on the page
//     $("" + eventLi).append(eventLi);
//   };


// color rows based on time

// setInterval(function () {
//     var now = moment().format("h a");
//     $(".time-block").each(function() {
//         var block = $ (this).children(".hour")
//         if ()
//     })
// }

// If i can't find it with moment.js, I can use 24 hour clock: moment ().hours ()
// then create function to convert am/pm to 24 hr clock
// .split (" ") will separate string into array ["9", "AM"]