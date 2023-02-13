let gShape

createShape('line', 'black', false)

function createShape(type, color, isDrag, pos = null) {
	gShape = { type, color, isDrag, pos }
}

function getShape() {
	return gShape
}

function updateShape(key, value) {
	gShape[key] = value
}
