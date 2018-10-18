# Use desktop cursor
document.body.style.cursor = "auto"

nbs = require "nbs"


sibebarWidth = 300

Screen.backgroundColor = nbs.primaryDark

Framer.Defaults.Layer.style = 
	"font-family": "'Apax'"

scrollComp = new ScrollComponent
	width: screen.width
	height: screen.height
	backgroundColor: null
	scrollHorizontal: true
	scrollVertical: false
	overdrag: true

scrollComp.mouseWheelEnabled = true
scrollComp.speedX = 0

scrollComp.onScroll ->  nbs.scrolled = scrollComp.content.x

situations = new Layer
	backgroundColor: null
	size: Framer.Device.screen.size
	parent: scrollComp.content

situationNames = ["Call Cab", "On Arrival", "Entered Car"]
beforeBricks = ["Drive to position","Use mobile device"]
arriveBricks = ["Drive to position"]
leaveBricks = ["Use mobile device", "If", "Accelerate", "Control doors"]
defaultSituations = [beforeBricks, arriveBricks, leaveBricks]


s =[]
for child, i in defaultSituations
	s.push new nbs.Situation
		parent: situations
		nodes: child
		x: nbs.padding*2*(i+1) + i*nbs.situationWidth
		l: situationNames[i]
		p: scrollComp.content
	handle = new nbs.DragHandle
		p: s[i]
		plast: s[i-1]
		parent: scrollComp.content


neu = new nbs.NewSituation
	parent: situations
	x: nbs.padding*2*(s.length+1) + s.length*nbs.situationWidth
	p: scrollComp.content



sidebarContainer = new Layer
	x: Framer.Screen.width - 15
	y: 0
	width: sibebarWidth + 15
	height: Framer.Screen.height
	backgroundColor: null
	animationOptions: 
		time: .5
sidebarContainer.states.expanded = 
	x: Framer.Screen.width - sibebarWidth - 15

sidebar = new Layer
	backgroundColor: "white"
	parent: sidebarContainer
	width: sibebarWidth
	x: 15
	height: Framer.Screen.height

expand = new Layer
	parent: sidebarContainer
	width: 15
	height: 30
	y: Framer.Screen.height/2 - 7
	style:
		"background" : "url(images/Expand.svg)   no-repeat"
		"background-position":"left center"
		"background-size" : "contain"

expand.onClick ->
	sidebarContainer.stateCycle "expanded", "default"
	triangle.stateCycle "expanded", "default"

triangle = new Layer
	style:
		"background" : "url(images/triDark.svg)   no-repeat"
		"background-position":"left center"
		"background-size" : "contain"
	parent: expand
	width: 10
	height: 11
	x: 3
	y: 9
triangle.states.expanded =
	rotation: 60