let gElCanvas
let gCtx
let gStartPos
let gMoveCurrShape = true
let gCanvasColor = '#ede5ff'

function onInit() {
	gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

	resizeCanvas()
	renderCanvas()
	addListeners()
}

function addMouseListeners() {
	gElCanvas.addEventListener('mousedown', onDown)
	gElCanvas.addEventListener('mousemove', onMove)
	gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchstart', onDown)
	gElCanvas.addEventListener('touchmove', onMove)
	gElCanvas.addEventListener('touchend', onUp)
}

function addListeners() {
	addMouseListeners()
	addTouchListeners()

	window.addEventListener('resize', () => {
		onInit()
	})
}

function renderCanvas() {
	gCtx.fillStyle = gCanvasColor
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderShape(ev) {
	const pos = getEvPos(ev)
	updateShape('pos', pos)
	draw()
}

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')
	gElCanvas.width = elContainer.offsetWidth
	gElCanvas.height = elContainer.offsetHeight
}

function onClear() {
	renderCanvas()
}

function onSelectShape(elSelect) {
	updateShape('type', elSelect.value)
}

function onChangeBgColor(elInput) {
	gCanvasColor = elInput.value
	renderCanvas()
}

function onChangeColor(elInput) {
	updateShape('color', elInput.value)
}

function onDown(ev) {
	renderShape(ev)
	updateShape('isDrag', true)
}

function onMove(ev) {
	const { isDrag } = getShape()
	if (!isDrag) return

	renderShape(ev)
}

function onUp() {
	updateShape('isDrag', false)
}

function draw() {
	const {
		type,
		pos: { x, y },
		color,
	} = getShape()

	gCtx.beginPath()
	gCtx.strokeStyle = color
	gCtx.fillStyle = gCanvasColor

	switch (type) {
		case 'triangle':
			drawTriangle(x, y)
			break
		case 'square':
			drawRect(x, y)
			break
		case 'circle':
			drawArc(x, y)
			break
		case 'line':
			drawLine(x, y)
			break
	}

	gCtx.stroke()
	gCtx.fill()
}

function drawLine(x, y) {
	gCtx.moveTo(x, y)
	gCtx.lineTo(x + 10, y + 10)
	gCtx.closePath()
}

function drawTriangle(x, y) {
	gCtx.moveTo(x, y)
	gCtx.lineTo(x + 50, y + 150)
	gCtx.lineTo(x + 100, y + 150)
	gCtx.closePath()
}

function drawRect(x, y) {
	gCtx.rect(x, y, 30, 30)
}

function drawArc(x, y) {
	gCtx.arc(x, y, 70, 0, 2 * Math.PI)
}

function getEvPos(ev) {
	let pos = {
		x: ev.offsetX,
		y: ev.offsetY,
	}
	return pos
}
