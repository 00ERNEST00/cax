import { Stage, Graphics, Group, Circle } from '../../src/index.js'

var stage = new Stage(480,480,"body")

//������stage.addEventListener,��Ϊstage.addEventListener��Ҫ��̨�ж������ܴ���ð�ݻ��߲���

let _boundingClientRect,
    startX,
    startY,
    isMouseDown = false,
    currentGraphics = null

let group = new Group()
stage.add(group)

stage.canvas.addEventListener('mousedown',(evt)=>{
    currentGraphics = new Graphics()
    var c = new Circle(5)

    group.add(currentGraphics)

    currentGraphics.beginPath()
    _boundingClientRect = stage.canvas.getBoundingClientRect()
    startX = evt.clientX - _boundingClientRect.left - stage.borderLeftWidth
    startY = evt.clientY - _boundingClientRect.top - stage.borderTopWidth

    c.x = startX
    c.y = startY
    group.add(c)
    isMouseDown = true

    stage.update()
})


stage.canvas.addEventListener('mousemove',(evt)=> {
    if (isMouseDown) {
        const currentX = evt.clientX - _boundingClientRect.left - stage.borderLeftWidth
        const currentY = evt.clientY - _boundingClientRect.top - stage.borderTopWidth
        currentGraphics.clear().moveTo(startX, startY).lineTo(currentX, currentY).stroke()
        stage.update()
    }
})

document.addEventListener('mouseup',()=> {
    isMouseDown = false
})