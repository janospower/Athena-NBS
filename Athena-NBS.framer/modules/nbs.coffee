exports.padding = 15
exports.situationWidth = 300
exports.borderradius = 4

exports.primary = "#00203D"
exports.primaryDark = "#11151A"
exports.primaryLight = "#2A445C"
exports.secondary = "#CC0026"

exports.listeners = []
exports.nodeLinks = []

drawSVG = (x1,y1,x2,y2) ->
	svg = '
	<svg>
		<path d="M'+ "#{x1} #{y1}" +' C '+" #{x1+((x2-x1)*0.5)} #{y1} #{x1+((x2-x1)*0.5)} #{y2} #{x2} #{y2}" +'" stroke="#FFFFFF" stroke-width="2" fill="none" />
	</svg>
	'
	return svg

class exports.NodeLines extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: null
			width: 2*exports.padding
			y: 0
			animationOptions:
				time:0.2
				curve: Bezier.ease
			html: drawSVG(@options.x1,@options.y1,@options.x2,50)
		super @options

		@x2 = @options.x2
		@.states.collapsed=
			y: 3*exports.padding
			scaleY: 0
			height: 0
			opacity: 0



class Listener extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: 'transparent'
			borderRadius: exports.borderradius
			borderWidth: 1
			borderColor: exports.primaryLight
			width: exports.situationWidth - 2*exports.padding
			height: 40
			x: exports.padding
			y: 3*exports.padding

		super @options

		@label = new TextLayer
			parent: @
			text: "Event Listener"
			fontSize: 14
			color: "white"
			point: Align.center


class Brick extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: exports.primary
			height: 100
			width: exports.situationWidth
			x: 0
			borderWidth: 1
			borderRadius: exports.borderradius/2
			borderColor: exports.primaryLight

		@label = new TextLayer
			text: @options.title
			fontSize: 14
			color: "white"
			x: exports.padding
			y: exports.padding

		super @options

		@label.parent = @





class Container extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: null
			y: 3*exports.padding
			animationOptions:
				time:0.2
				curve: Bezier.ease

		super @options

		@scrollComp = new ScrollComponent
			parent: @
			width: exports.situationWidth
			backgroundColor: null
			scrollHorizontal: false
			overdrag: true

		@scrollComp.mouseWheelEnabled = true


		@.states.collapsed=
			y: 3*exports.padding
			scaleY: 0
			height: 0
			opacity: 0





class exports.Situation extends Layer
	constructor: (@options={}) ->

		@label = new TextLayer
			text: @options.l
			fontSize: 16
			color: "white"
			textTransform: "uppercase"
			fontWeight: "700"
			letterSpacing: 2
			x: 3*exports.padding
			y: exports.padding

		_.defaults @options,
			backgroundColor: exports.primary
			height: 3*exports.padding + exports.borderradius
			width: exports.situationWidth
			borderRadius: exports.borderradius
			borderWidth: 1
			borderColor: exports.primaryLight
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
				parent: @container.scrollComp.content
				title: child

		bricks.push new Brick
			y: bricks.length*100
			parent: @container.scrollComp.content
			title: "+ Add new brick"

		exports.listeners.push new Listener
			parent: bricks[bricks.length-2]
			name: "Listener"

		@brick = bricks[bricks.length-2]

		if (@container.scrollComp.content.height < 620)
			@container.scrollComp.height = @container.scrollComp.content.height
		else
			@container.scrollComp.height = 620

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


		@nodeLine = new exports.NodeLines
			parent : @options.p
			x: 0#@.x + @.width - exports.padding
			y: 0#2*exports.padding
			width: screen.width
			height: screen.height
			y1: @brick.screenFrame.y + @brick.height/2 + exports.padding
			x1: @.x + @.width - exports.padding
			x2: @.x + @.width + 2*exports.padding

		exports.nodeLinks.push @nodeLine

		@tri.onClick @Toggle

	Toggle: =>
		@container.stateCycle "collapsed", "default"
		@tri.stateCycle "collapsed", "default"
		@nodeLine.stateCycle "collapsed", "default"






class exports.DragHandle extends Layer
	constructor: (@options={}) ->

		that = @options.p

		_.defaults @options,
			width: 20
			height: 20
			x: that.x + that.width - 20 - exports.padding
			y: that.y + exports.padding
			style:
				"background" : "url(images/draghandle.svg)   no-repeat"
				"background-position":"left center"
				"background-size" : "contain"

		super @options
		@.draggable.enabled = true
		@.draggable.constraints = {
			x: @.x
			y: @.y
			width: 0
			height: 0
		}
		@.on Events.Move, ->
			that.x = @.x - that.width + exports.padding + 20
			that.y = @.y - exports.padding
			that.bringToFront()
			y1 = that.brick.screenFrame.y + that.brick.height/2 + exports.padding
			x1 = that.brick.screenFrame.x + that.brick.width - exports.padding
			x2 = that.nodeLine.x2
			xx = that.brick.screenFrame.x + that.brick.width
			that.nodeLine.html = drawSVG(x1,y1,x2,50)


class exports.NewSituation extends Layer
	constructor: (@options={}) ->

		@label = new TextLayer
			text: "New Situation"
			fontSize: 16
			color: "white"
			textTransform: "uppercase"
			fontWeight: "700"
			letterSpacing: 2
			x: 3*exports.padding
			y: exports.padding



		_.defaults @options,
			backgroundColor: exports.primary
			height: 3*exports.padding + exports.borderradius
			width: exports.situationWidth
			borderRadius: exports.borderradius
			borderWidth: 1
			borderColor: exports.primaryLight
			x: 2*exports.padding
			y: 2*exports.padding

		super @options

		@label.parent = @

		@container = new Container
			parent: @

		@newBrick = new Brick
			y: 0
			parent: @container
			title: "+ Add new brick"
