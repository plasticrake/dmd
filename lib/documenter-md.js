"use strict";
var boil = require("boil-js"),
    path = require("path");

/**
@module
@alias documenterMd
*/
module.exports = documenterMd;

/**
Transforms doclet data into markdown documentation
@param {object} - The render options
@param {string} [options.template] - A handlebars template to insert your documentation into. 
@param {number} [options.heading-depth] - Root heading depth, defaults to 2.
@return {stream} A readable stream containing the rendered markdown
@alias module:documenter-md
*/
function documenterMd(options){
    options = options || {};
    options["heading-depth"] = options["heading-depth"] || 1;
    options.template = options.template || "{{>main}}";
    options.partials = path.resolve(__dirname, "..", "partials/**/*.hbs");
    options.helpers = path.resolve(__dirname, "..", "helpers/**/*.js");
    options._headingDepth = 0;
    options._indexDepth = 0;
    return boil.renderStream(options);
};