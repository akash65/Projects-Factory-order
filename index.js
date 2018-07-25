'use strict';
var request = require('request');
//var urllib = require('urllib');
var Alexa = require("alexa-sdk");
var http = require("http");
var https = require("https");



// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    //skill-id
    alexa.appId = 'amzn1.ask.skill.4c1dcd9e-2495-4fc9-811d-9d5914fb7b46';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        //ask="Welcome to Team. What would you like to know?";
        //reprompt= "What would you like to know?";
        //this.emit(':ask', ask, reprompt);
        this.emit('GetNumber');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
            this.emit(':responseReady');

    },
    'GetViewIntent': function () {
        this.emit('GetViews');
    },
    'MyNameIsIntent': function () {
        this.emit('SayHelloName');
    },
    'GetRemoteDataIntent': function () {
        this.emit('GetNumber');
       
    },


    'OrderIntent': function () {

        //const theNumber = 3;
        const theNumber = this.event.request.intent.slots.status.value;
        var myRequest = parseInt(theNumber);
        const url = `http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket/${myRequest}?&format-json&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254`;
        
        request.get(url, (error, response, body) => {
            let json = JSON.parse(body);
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the body

            const theFact = json;                  
            //const speechOutput = "Ticket number "+`${theFact.number}`+" has status "+`${theFact.status_id}`;
            
            const speechOutput = `${theFact.status_id}`;
            const ticket = `${theFact.number}`;
                 
                 if (speechOutput == 1) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Closed");
                    this.emit(':responseReady');
                } else if (speechOutput == 2) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Resolved");
                    this.emit(':responseReady');
                } else if (speechOutput == 3) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Opened");
                    this.emit(':responseReady');
                }    
                else if (speechOutput == 4) {
                   this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Archived");
                   this.emit(':responseReady');
               } 
               else if (speechOutput == 5) {
                   this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Deleted");
                   this.emit(':responseReady');
               }
               
               //this.response.speak(speechOutput + " Would you like another ticket?").listen("Would you like another ticket?");
               //this.emit(':tell', speechOutput);
            });
},
    


    'GetNumber': function () {
        //const theNumber = 3;
        const theNumber = this.event.request.intent.slots.ticket_id.value;
        var myRequest = parseInt(theNumber);
        console.log('url:', myRequest);
        const url = `http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket/${myRequest}?&format-json&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254`;
        
         console.log('url:', url);
         request.get(url, (error, response, body) => {
                let json = JSON.parse(body);
                 console.log('error:', error); // Print the error if one occurred
                 console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                 console.log('body:', body); // Print the body
     
                 const theFact = json;   
                 const speechOutput = `${theFact.status_id}`;
                 const ticket = `${theFact.number}`;
                 
                 if (speechOutput == 1) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Closed ");
                    this.emit(':responseReady');
                } else if (speechOutput == 2) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Resolved");
                    this.emit(':responseReady');
                } else if (speechOutput == 3) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Opened");
                    this.emit(':responseReady');
                }    
                else if (speechOutput == 4) {
                   this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Archived");
                   this.emit(':responseReady');
               } 
               else if (speechOutput == 5) {
                   this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Deleted");
                   this.emit(':responseReady');
               }
                
             //this.response.cardRenderer(SKILL_NAME, theFact);
               // this.response.speak(speechOutput + " Would you like another ticket?").listen("Would you like another ticket?");
                // this.emit(':responseReady');
             });
        
},


'GetViews': function () {
    //const theNumber = 3;
    //const theNumber = this.event.request.intent.slots.ticket_id.value;
    //var myRequest = parseInt(theNumber);
    //console.log('url:', myRequest);
    const url = `http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_v_ticket_summary/?&api_key=256590650defa6b2ee90684bed41923364e7c10a2c81cfa55ef2a682ce0b59a2`;
    
     console.log('url:', url);
     request.get(url, (error, response, body) => {
            let json = JSON.parse(body);
             console.log('error:', error); // Print the error if one occurred
             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
             console.log('body:', body); // Print the body
 
             const theFact = json;   
             const speechOutput = "Sure. There are "+`${theFact.resource[0].status_count}`+" Opened, "+`${theFact.resource[1].status_count}`+" Resloved and "+`${theFact.resource[2].status_count}`+" Closed Tickets";
             //const ticket = `${theFact.number}`;
             
             /*
             if (speechOutput == 1) {
                this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Closed ");
                this.emit(':responseReady');
            } else if (speechOutput == 2) {
                this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Resolved");
                this.emit(':responseReady');
            } else if (speechOutput == 3) {
                this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Opened");
                this.emit(':responseReady');
            }    
            else if (speechOutput == 4) {
               this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Archived");
               this.emit(':responseReady');
           } 
           else if (speechOutput == 5) {
               this.response.speak("Your Ticket number "+`${ticket}`+" with ticket status, Deleted");
               this.emit(':responseReady');
           }
            
           */
         //this.response.cardRenderer(SKILL_NAME, theFact);
         this.response.speak(speechOutput);
           //this.response.speak(speechOutput + " Would you like another ticket?").listen("Would you like another ticket?");
           this.emit(':responseReady');
         });
    
},


    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },

    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },

    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
            this.emit(':responseReady');

    }
};
