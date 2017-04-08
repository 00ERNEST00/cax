import { Stage, Graphics, Group, Circle } from '../../src/index.js'

var stage = new Stage(480,480,"body")

//������stage.addEventListener,��Ϊstage.addEventListener��Ҫ��̨�ж������ܴ���ð�ݻ��߲���

let _boundingClientRect,
    startX,
    startY,
    isMouseDown = false,
    currentGraphics = null,
    curve =  new Graphics()

let group = new Group()
stage.add(group)

let points = []

stage.canvas.addEventListener('mousedown',(evt)=>{
    currentGraphics = new Graphics()
    var c = new Circle(5)
    //c.cursor = 'move'

    group.add(currentGraphics)

    currentGraphics.beginPath()
    _boundingClientRect = stage.canvas.getBoundingClientRect()
    startX = evt.clientX - _boundingClientRect.left - stage.borderLeftWidth
    startY = evt.clientY - _boundingClientRect.top - stage.borderTopWidth
    points.push(startX,startY)

    c.x = startX
    c.y = startY
    group.add(c)
    isMouseDown = true
    if(points.length === 6){
        group.add(curve)
    }
    stage.update()
})


stage.canvas.addEventListener('mousemove',(evt)=> {
    if (isMouseDown) {
        const currentX = evt.clientX - _boundingClientRect.left - stage.borderLeftWidth
        const currentY = evt.clientY - _boundingClientRect.top - stage.borderTopWidth
        currentGraphics.clear().moveTo(startX, startY).lineTo(currentX, currentY).stroke()


        if(points.length === 6){

            curve.clear().moveTo(points[0],points[1]).bezierCurveTo(points[2],points[3],currentX,currentY, points[4],points[5]).stroke()
        }

        stage.update()
    }
})

document.addEventListener('mouseup',(evt)=> {

    const currentX = evt.clientX - _boundingClientRect.left - stage.borderLeftWidth
    const currentY = evt.clientY - _boundingClientRect.top - stage.borderTopWidth

    points.push(currentX,currentY)
    isMouseDown = false
})