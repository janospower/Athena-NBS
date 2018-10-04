# Add the following line to your project in Framer Studio.
# nbs = require "nbs"
# Reference the contents by name, like nbs.myFunction() or nbs.myVar

exports.myVar = "myVariable"

exports.myFunction = ->
	print "myFunction is running"

exports.myArray = [1, 2, 3]

class exports.Situation extends Layer
	 constructor: (@options={}) ->

     @label = new TextLayer
        color: "white"

     _.defaults @options,
        backgroundColor : "blue"
        height: 48
        borderRadius: 4

     super @options

     @label.parent = @
     @label.center()

class exports.Brick extends Layer
   constructor: (@options={}) ->
      _.defaults @options,
         backgroundColor : "#000"
         height: 48
         borderRadius : 4
      super @options
