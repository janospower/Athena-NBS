exports.padding = 15
exports.situationWidth = 300
exports.borderradius = 4

exports.primary = "#00203D"
exports.primaryLight = "#4D6377"
exports.secondary = "#CC0026"

exports.listeners = []

class exports.NodeLines extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: null
			width: 2*exports.padding
			y: 0
			html: '
			<svg>
			  <path d="M0 '+ "#{@options.yy}" +' C 20 '+ "#{@options.yy}" +' 25 '+ "#{55}" +' 45 '+ "#{55}" +'" stroke="#CC0026" stroke-width="2" fill="none" />
			</svg>
			'

		super @options



class Listener extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: 'transparent'
			borderRadius: exports.borderradius
			borderWidth: 1
			borderColor: exports.primary
			width: exports.situationWidth - 2*exports.padding
			height: 40
			x: exports.padding
			y: 3*exports.padding

		super @options

		@label = new TextLayer
			parent: @
			text: "Event Listener"
			fontSize: 12
			color: "black"
			x: exports.padding
			y: exports.padding


class Brick extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: "#CCC"
			height: 100
			width: exports.situationWidth
			x: 0
			borderWidth: 1
			borderColor: exports.secondary

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
			y: 3*exports.padding
			scaleY: 0
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
		for child, i in @options.nodes
			bricks.push new Brick
				y: i*100
				parent: @container
				title: child
		bricks.push new Brick
			y: i*100
			parent: @container
			title: "+ Add new brick"

		exports.listeners.push new Listener
			parent: bricks[i-1]
			name: "Listener"

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

		@nodeLinks = []
		for child, i in exports.listeners
			@nodeLinks.push new exports.NodeLines
				x: @.x + @.width
				yy: child.screenFrame.y + child.height/2

		@tri.onClick @Toggle
		@.onDrag @UpdateLinks

	Toggle: =>
		@container.stateCycle "collapsed", "default"
		@tri.stateCycle "collapsed", "default"


	UpdateLinks: ->
		for child, i in exports.listeners
			nodeLinks.push new exports.NodeLines
				x: child.screenFrame.x + child.width
				yy: child.screenFrame.y + child.height/2
