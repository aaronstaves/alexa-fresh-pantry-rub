'use strict';

var _ = require('lodash');

var recipes = {
    carolina: [
        "two teaspoons salt",
        "two teaspoons sugar",
        "two teaspoons brown sugar",
        "two teaspoons ground cumin",
        "two teaspoons chili powder",
        "two tablespoons freshly ground pepper",
        "one tablespoon cayenne pepper",
        "one quarter cup paprika"
    ],
    classic: [
        "one third cup paprika",
        "one quarter cup sugar",
        "three teaspoons black pepper",
        "two tablespoons salt",
        "two tablespoons cayenne",
    ],
    kansas: [
        "one half cup brown sugar",
        "one quarter cup paprika",
        "one tablespoon black pepper",
        "one tablespoon salt",
        "one tablespoon chili powder",
        "one tablespoon garlic powder",
        "one tablespoon onion powder",
        "one teaspoon cayenne pepper"
    ],
    texas: [
        "one half cup chili powder",
        "one half cup brown sugar",
        "one half cup salt",
        "one half cup fresh ground pepper",
        "one quarter cup dry mustard",
        "one quarter cup ground cumin",
        "ground red pepper to taste"
    ]
};

function RubDataHelper() { };

RubDataHelper.prototype.getPrompt = function() {

    var prompt = "What type of pantry rub would you like to make?";
    var rubs = this._getTypes();
    return prompt + " " + rubs;
};

RubDataHelper.prototype._getTypes = function() {
    var rubs = _.keys(recipes).sort().join(", ");
    rubs.match(/,([^,]+)$/);
    rubs = rubs.replace(/,([^,]+)$/, ", or" + RegExp.$1);
    return rubs;
}

RubDataHelper.prototype.getRecipe = function( rubType ) {

    rubType = rubType.toLowerCase();
    if( recipes[ rubType ] !== undefined) {
        return recipes[ rubType ].join(". ");
    }
    return undefined;
};

RubDataHelper.prototype.recipeExists = function( rubType ) {

    if( recipes[ rubType.toLowerCase() ] !== undefined) {
        return true;
    }
    return false;
};


module.exports = RubDataHelper;