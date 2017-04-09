'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('freshpantryrub');
var RubDataHelper = require('./rub_data_helper');

app.launch(function(req, res) {
    var helper = new RubDataHelper();
    var prompt = helper.getPrompt();
    req.getSession().clear();
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('AMAZON.HelpIntent', {
    slots:{},
}, function(req, res) {
    var helper = new RubDataHelper();
    var prompt = helper.getPrompt();
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
    return true;
});

app.intent('getrub', {
    slots: {
        RUBTYPE: 'RUBTYPELIST'
    },
    utterances: [' {for |} {a |} {an |} {-|RUBTYPE} {rub |} {recipe |}']
}, function(req, res) {
    var helper = new RubDataHelper();

    var rubType = req.slot('RUBTYPE');
    console.dir(rubType);
    if ( (_.isEmpty(rubType) || !helper.recipeExists(rubType) ) ) {
        var reprompt = helper.getPrompt();
        var prompt = "I didn't hear a rub type. " + reprompt;
        res.say(prompt).reprompt(reprompt).shouldEndSession(false);
        return true;
    }
    else {
        
        req.getSession().set('rub', rubType);
        req.getSession().set('yesQuestion', 'recipeReprompt');
        var recipe = helper.getRecipe( rubType ) + ". Would you like me to repeat that ?";
        res.say(recipe).reprompt("Would you like to hear that again?").shouldEndSession(false);
        return true;
    }
});

app.intent("AMAZON.YesIntent", {
    slots: {}
}, function(req, res) {

  var helper = new RubDataHelper();
  var session = req.getSession();
  console.dir(session);

  if (session.get('yesQuestion' ) === "recipeReprompt") {
    var recipe = helper.getRecipe( session.get('rub') ) + ". Would you like me to repeat that ?";
    res.say(recipe).reprompt("Would you like to hear that again?").shouldEndSession(false);
  } 
  return true;
});


app.intent('AMAZON.NoIntent', {
    slots:{},
}, function(req, res) {
    return true;
});

app.intent('AMAZON.StopIntent', {
    slots:{},
}, function(req, res) {
    return true;
});

app.intent('AMAZON.CancelIntent', {
    slots:{},
}, function(req, res) {
    return true;
});


var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};
module.exports = app;