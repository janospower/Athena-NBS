exports.padding = 15
exports.situationWidth = 300

class exports.Wrapper extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: "transparent"
			x: 0
			y: 3*exports.padding
			animationOptions:
				time:0.2
				curve: Bezier.ease

		super @options

		@.states.collapsed=
			y: 2*exports.padding
			height: 0
			opacity: 0

class exports.Brick extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: "#CCC"
			height: 100
			width: exports.situationWidth
			x: 0
			y: 3*exports.padding
			animationOptions:
				time:0.2
				curve: Bezier.ease

		@label = new TextLayer
			fontSize: 12
			color: "black"
			x: exports.padding
			y: exports.padding

		super @options

		@label.parent = @

		@.states.collapsed=
			y: 2*exports.padding
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


		 _.defaults @options,
				backgroundColor: "blue"
				height: 4*exports.padding
				width: exports.situationWidth
				borderRadius: 4
				x: 2*exports.padding
				y: 2*exports.padding

		 super @options

		 @label.parent = @

		 @.onClick @Toggle

	 Toggle: =>
			for i in [1...@.children.length]
				@.children[i].stateCycle "collapsed", "default"
