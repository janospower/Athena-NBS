# Use desktop cursor
document.body.style.cursor = "auto"

nbs = require "nbs"


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
leaveBricks = ["Use mobile device", "Haptic feedback", "Add event listener", "Delay", "If", "Accelerate", "Control doors"]
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
		parent: scrollComp.content


neu = new nbs.NewSituation
	parent: situations
	x: nbs.padding*2*(s.length+1) + s.length*nbs.situationWidth
	p: scrollComp.content