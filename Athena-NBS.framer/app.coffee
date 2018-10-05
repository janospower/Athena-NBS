nbs = require "nbs"

Screen.backgroundColor = "white"

situations = new Layer
	backgroundColor: null
	size: Framer.Device.screen.size

before = new nbs.Situation
	parent: situations
before.label.text = "Before Start"

arrive = new nbs.Situation
	parent: situations
arrive.label.text = "Event Name:"

leave = new nbs.Situation
	parent: situations
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