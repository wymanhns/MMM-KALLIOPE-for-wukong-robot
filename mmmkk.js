/* global Module */

class Message {
    constructor(text) {
        this.text = text;
        this.timestamp = new Date();
    }
}

Module.register('mmmkk',{
    // list of messages to print on the screen
    messages: [],

    // Default module config.
	defaults: {
        max: 5,
        keep_seconds: 5,
        title: "Voice"
    },

    getStyles: function() {
        return ["KALLIOPE.css"];
    },

    start: function() {
        // need to connect to the node helper
        this.sendSocketNotification("CONNECT", null);

        console.log("Starting module: " + this.name);

        //Update DOM every minute so that the time of the call updates and calls get removed after a certain time
		setInterval(() => {
			this.updateDom();
        }, 1000);

        // only clean old messages if keep_seconds is set
        if (this.config.keep_seconds > 0){
            setInterval(() => {
                this.cleanOldMesssage();
            }, 1000);
        }
    },

    cleanOldMesssage: function() {
        var currentDate = new Date();

        for(var i = 0; i < this.messages.length; i++){
            var dif = currentDate.getTime() - this.messages[i].timestamp.getTime();
            var secondsFromCurrentDateToMessageDate = dif / 1000;
            var secondsBetweenDates = Math.abs(secondsFromCurrentDateToMessageDate);

            // delete the message if to old
            if (secondsBetweenDates > this.config.keep_seconds){
                this.messages.splice(i, 1);
            }
        }
    },

    // Override dom generator
	getDom: function() {
        var wrapper = document.createElement("div");

        if (this.messages.length  == 0){
            wrapper.innerHTML = "";
            return wrapper
        }

        var title = document.createElement("div");
        title.className = "light small dimmed";
        title.innerHTML = "<span class='kaill_red'>" + this.config.title + "</span>";
        wrapper.appendChild(title);

        var table = document.createElement("table");

        for(var i = 0; i < this.messages.length; i++){

            var row = document.createElement("tr");
            table.appendChild(row);

            var messageCell = document.createElement("td");
			messageCell.innerHTML =  this.messages[i].text
			row.appendChild(messageCell);
        }
        wrapper.appendChild(table);

        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        // console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
        if (notification == "KALLIOPE"){
            // create new message object

            // CSS COLOR classname = kaill_yellow , kaill_green , kaill_red

            var newMessage = new Message("<span class='kaill_green'>" +payload + "</span>");
            this.messages.push(newMessage);

            // clean old messages if list is too long
            while(this.messages.length > this.config.max){
                this.messages.shift();
            }

        }else if (notification === "ROBOT" ){
            // create new message object
            var newMessage = new Message("<span class='kaill_yellow'> <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' focusable='false' width='1em' height='1em' style='-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 20'><path d='M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5z' fill='white'/><rect x='0' y='0' width='24' height='24' fill='rgba(0, 0, 0, 0)' /></svg>" +payload + "</span>");
            this.messages.push(newMessage);

            // clean old messages if list is too long
            while(this.messages.length > this.config.max){
                this.messages.shift();
            }
	}else{
            // forward the notification to all modules
            this.sendNotification(notification, payload);
        }

	


    },

    notificationReceived: function(notification, payload, sender) {
        if (sender) {
            console.log(this.name + " received a module notification: " + notification
            + " from sender: " + sender.name);
            console.log(payload);
        } else {
            Log.log(this.name + " received a system notification: " + notification);
        }


    }
});
