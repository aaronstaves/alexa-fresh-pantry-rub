'use strict';
var chai = require('chai');
var expect = chai.expect;
var RubDataHelper = require('../rub_data_helper');

describe('RubDataHelper', function() {
    var helper = new RubDataHelper();

    describe('#getPrompt', function() { 
        context('from data helper', function() { 
            it('returns prompt ', function() {
                var prompt = helper.getPrompt()
                console.log('got prompt ' + prompt);
                return expect(prompt).to.not.be.undefined;
            });
        });
    });

    describe('#getGoodRecipe', function() { 
        context('from data helper', function() { 
            it('returns a valid rub recipie', function() {
                var recipe = helper.getRecipe("classic");
                console.log('got recipe ' + recipe);
                return expect(recipe).to.not.be.undefined;
            });
        });
    });

    describe('#getBadRecipe', function() { 
        context('from data helper', function() { 
            it('returns a undefined recipie', function() {
                var recipe = helper.getRecipe("italian");
                console.log('got recipe ' + recipe);
                return expect(recipe).to.be.undefined;
            });
        });
    });
});
