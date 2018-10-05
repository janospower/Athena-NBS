exports.padding = 15
exports.situationWidth = 300

class Brick extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: "#CCC"
			height: 100
			width: exports.situationWidth
			x: 0

		@label = new TextLayer
			text: @options.title
			fontSize: 12
			color: "black"
			x: exports.padding
			y: exports.padding

		super @options

		@label.parent = @





class Container extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: "transparent"
			y: 3*exports.padding
			animationOptions:
				time:0.2
				curve: Bezier.ease

		super @options

		@.states.collapsed=
			height: 0
			opacity: 0





class exports.Situation extends Layer
	constructor: (@options={}) ->

		@label = new TextLayer
			text: "Event Name"
			fontSize: 16
			color: "white"
			x: exports.padding
			y: exports.padding

		@container = new Container

		@tri = new Layer


		_.defaults @options,
			backgroundColor: "blue"
			height: 4*exports.padding
			width: exports.situationWidth
			borderRadius: 4
			x: 2*exports.padding
			y: 2*exports.padding

		super @options

		bricks = []
		for i in [0...4]
			bricks.push new Brick
				y: i*100
				parent: @container
				title: "Brick " + i
		bricks.push new Brick
			y: i*100
			parent: @container
			title: "+ Add new brick"

		@label.parent = @
		@container.parent = @
		@tri.parent = @

		@tri.onClick @Toggle

	Toggle: =>
		@container.stateCycle "collapsed", "default"
