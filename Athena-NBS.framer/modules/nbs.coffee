exports.padding = 15
exports.situationWidth = 300
exports.borderradius = 4

exports.primary = "#00203D"
exports.primaryLight = "#4D6377"
exports.secondary = "#CC0026"

class Listener extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: 'transparent'
			borderRadius: exports.borderradius
			borderWidth: 1
			borderColor: exports.primary
			width: exports.situationWidth
			height: 50

		super @options

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
			x: 3*exports.padding
			y: exports.padding



		_.defaults @options,
			backgroundColor: exports.primary
			height: 3*exports.padding + exports.borderradius
			width: exports.situationWidth
			borderRadius: exports.borderradius
			x: 2*exports.padding
			y: 2*exports.padding

		super @options

		@label.parent = @

		@container = new Container
			parent: @

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

		@listener = new Listener
			parent: @

		@tri = new Layer
			parent: @
			width: 20
			height: 20
			x:exports.padding
			y: exports.padding
			style:
				"background" : "url(images/tri.svg)   no-repeat"
				"background-position":"left center"
				"background-size" : "contain"
			animationOptions:
				time:0.2
				curve: Bezier.ease

		@tri.states.collapsed=
			rotation: -90

		@tri.onClick @Toggle

	Toggle: =>
		@container.stateCycle "collapsed", "default"
		@tri.stateCycle "collapsed", "default"
