# Use desktop cursor
document.body.style.cursor = "auto"

nbs = require "nbs"


Screen.backgroundColor = nbs.primaryLight

situations = new Layer
	backgroundColor: null
	size: Framer.Device.screen.size


beforeBricks = ["Drive to position","Use mobile device"]
arriveBricks = ["Drive to position"]
leaveBricks = ["Use mobile device", "Haptic feedback", "Add event listener", "Delay", "If", "Accelerate", "Control doors"]


before = new nbs.Situation
	parent: situations
	nodes: beforeBricks
before.label.text = "Before Start"

arrive = new nbs.Situation
	parent: situations
	nodes: arriveBricks
arrive.label.text = "Event Name:"

leave = new nbs.Situation
	parent: situations
	nodes: leaveBricks
leave.label.text = "On Arrive"

for child, i in situations.subLayers
	child.x = nbs.padding*2*(i+1) + i*nbs.situationWidth
	child.draggable = true
	child.draggable.constraints = {
		x: child.x
		y: child.y
		width: 0
		height: 0
	}