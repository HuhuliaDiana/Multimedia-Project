const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");
const dElem=document.getElementById("svg")
let width = dElem.clientWidth;
let height = dElem.clientHeight;


svg.style.borderStyle = "solid"
svg.style.borderWidth = "1px";
svg.style.borderColor = "black";
svg.style.width = width;
svg.style.height = height;
dElem.appendChild(svg);


const rectBack = document.createElementNS(svgNS, "rect");
rectBack.setAttribute("x", 0);
rectBack.setAttribute("y", 0);
rectBack.setAttribute("width", width);
rectBack.setAttribute("height", height);
rectBack.style.fill = "WhiteSmoke";
svg.appendChild(rectBack);


let arraySVG=[]
let arrayEllipse=[]
let arraySVGShapes=[]
let arrayRect=[]
let arrayLine=[]

//draw rect
  
     const drawingRect = (event) => {
  
      const rect = document.createElementNS(svgNS, 'rect');
    
      const drawRect= (e) => {
      
        let w = Math.abs(coordonateMouse(e).x- coordonateMouse(event).x);
        let h = Math.abs(coordonateMouse(e).y - coordonateMouse(event).y);
  
        let x , y;
        if(coordonateMouse(e).x >coordonateMouse(event).x)
        {
          x=coordonateMouse(event).x
        }
        else{
          x=coordonateMouse(e).x
        }
  
        if(coordonateMouse(e).y >coordonateMouse(event).y)
        {
          y=coordonateMouse(event).y
        }
        else{
          y=coordonateMouse(e).y
  
        }
       
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute( 'width', w);
        rect.setAttribute('height', h);
  
        //rect.style.fill = "none";
        rect.style.stroke = document.getElementById("color_stroke_shape").value
        rect.style['stroke-width'] = document.getElementById("stroke_shape").value;   
  
        svg.appendChild(rect)

        arraySVG[arraySVG.length++]=rect

      }
    
      const finishDraw = (e) => {

          svg.removeEventListener('mousemove', drawRect);
      
      }

      svg.addEventListener('mousemove', drawRect);
      svg.addEventListener('mouseup', finishDraw);
        
    
    }
  
  function drawRect(){

    
    svg.addEventListener('mousedown',drawingRect)

    svg.removeEventListener('mousedown', drawingEllipse);
    svg.removeEventListener('mousedown', drawingLine);

  }
  

  //draw ellipse
    
    const drawingEllipse= (event) => {
  
      const ellipse = document.createElementNS(svgNS, 'ellipse');
    
      const drawEllipse = (e) => {
      
        let rx = Math.abs(coordonateMouse(e).x- coordonateMouse(event).x);
        let ry = Math.abs(coordonateMouse(e).y - coordonateMouse(event).y);
  
        let x , y;
        if(coordonateMouse(e).x >coordonateMouse(event).x)
        {
          x=coordonateMouse(event).x
        }
        else{
          x=coordonateMouse(e).x
        }
  
        if(coordonateMouse(e).y >coordonateMouse(event).y)
        {
          y=coordonateMouse(event).y
        }
        else{
          y=coordonateMouse(e).y
  
        }
       
        ellipse.setAttribute('cx', x+rx);
        ellipse.setAttribute('cy', y+ry);  
        ellipse.setAttribute( 'rx', rx);
        ellipse.setAttribute( 'ry', ry);
  
        //ellipse.style.fill = "none";
        ellipse.style.stroke = document.getElementById("color_stroke_shape").value
        ellipse.style['stroke-width'] = document.getElementById("stroke_shape").value;   
  
        svg.appendChild(ellipse);

        arraySVG[arraySVG.length++]=ellipse

      }
    
      const finishDraw = (e) => {
          svg.removeEventListener('mousemove', drawEllipse);

      }
      
      svg.addEventListener('mousemove', drawEllipse);
      svg.addEventListener('mouseup', finishDraw);

    }
  
  function drawEllipse(){

    svg.addEventListener('mousedown',drawingEllipse)

    svg.removeEventListener('mousedown', drawingRect);
    svg.removeEventListener('mousedown', drawingLine);


  }
  
  function coordonateMouse(e) {

    let point=svg.createSVGPoint();
    point.x=e.clientX;
    point.y=e.clientY;
    let matrix=point.matrixTransform(svg.getScreenCTM().inverse());
    return matrix;
}

 //draw line
    
    const drawingLine = (event) => {
  
      const line= document.createElementNS(svgNS, 'line');
    
      const drawLine = (e) => {
        

        line.setAttribute('x1', coordonateMouse(e).x);
        line.setAttribute( 'y1',  coordonateMouse(e).y);
        line.setAttribute('x2',  coordonateMouse(event).x);
        line.setAttribute('y2', coordonateMouse(event).y);
  
        line.style.stroke = document.getElementById("color_stroke_shape").value
        line.style['stroke-width'] = document.getElementById("stroke_shape").value;   
  
        svg.appendChild(line);

        arraySVG[arraySVG.length++]=line

      }
    
      const finishDraw = (e) => {
          svg.removeEventListener('mousemove', drawLine);

      }
      
      svg.addEventListener('mousemove', drawLine);
      svg.addEventListener('mouseup', finishDraw);

    }

    function drawLine(){
        svg.addEventListener('mousedown',drawingLine)

        svg.removeEventListener('mousedown', drawingRect);
        svg.removeEventListener('mousedown', drawingEllipse);

    }


  document.getElementById("btn_drawLine").onclick=drawLine
  document.getElementById("btn_drawRect").onclick=drawRect
  document.getElementById("btn_drawEllipse").onclick=drawEllipse

   //modificare svg
   const btn_modify=document.getElementById("modify_svg")
   btn_modify.addEventListener('click', () => {

       Array.from(arraySVG).forEach(element => {

           element.addEventListener('mousedown', () => {

               element.style['stroke-width'] = document.getElementById("stroke_shape").value;
               element.style.stroke = document.getElementById("color_stroke_shape").value
               element.style.fill=document.getElementById("color_bg").value


           })
       });

   })

   var element, coordMouse;

   function coordonateMouse(e) {

       let point=svg.createSVGPoint();
       point.x=e.clientX;
       point.y=e.clientY;
       let matrix=point.matrixTransform(svg.getScreenCTM().inverse());
       return matrix;
   }


   let arrayPath=[]


   function dragShape(event) {

       var svgT = event.target;


       svgT.addEventListener('mousedown', start);
       svgT.addEventListener('mousemove', drag);
       svgT.addEventListener('mouseup', end);
       svgT.addEventListener('mouseleave', end);


       var path=document.createElementNS(svgNS,'path');
       var dString=""

       var translate, lastTransform;


       function start(event) {
   

           if(arrayPath.length>0)
           {
             svg.removeChild(arrayPath[arrayPath.length-1])
           }


           if (arraySVG.includes(event.target)) {

               element = event.target;
               coordMouse = coordonateMouse(event);

               //for path
               dString="M " + coordMouse.x+ " " + coordMouse.y 
               
               translate = svg.createSVGTransform();
               element.transform.baseVal.appendItem(translate)
               lastTransform = element.transform.baseVal.getItem(element.transform.baseVal.length-1);

               coordMouse.x = coordMouse.x- lastTransform.matrix.e
               coordMouse.y = coordMouse.y- lastTransform.matrix.f;

              
           }}


           function drag(event) {

               if (element) {

                   var coord = coordonateMouse(event);
                   lastTransform.setTranslate(coord.x-coordMouse.x, coord.y-coordMouse.y);


                   path.style.stroke = document.getElementById("color_stroke_path").value
                   path.style['stroke-width'] = document.getElementById("stroke_path").value
                   path.style.fill="none"
               
                   dString=dString.concat(" " + coord.x+" "+coord.y)
                   path.setAttribute('d', dString)
                   arrayPath[arrayPath.length++]=path

               }}

           function end(event) {

               element = null;
               svg.appendChild(path)

           }}



//stergere svg


const btn_delete=document.getElementById("delete_svg")              
btn_delete.addEventListener('click', () => {

Array.from(arraySVG).forEach(element => {

element.addEventListener('mousedown', deleteSVG)

});

})

//drag svg elements

function deleteSVG(evt){

svg.removeChild(evt.target)
}

document.getElementById("drag_svg").addEventListener("click",()=>{

svg.removeEventListener('mousedown', drawingRect);
svg.removeEventListener('mousedown', drawingEllipse);
svg.removeEventListener('mousedown', drawingLine);


Array.from(arraySVG).forEach(elem=>{

elem.removeEventListener('mousedown',deleteSVG)
elem.onclick=dragShape

})
})



//modify path

document.getElementById("modify_path").addEventListener("click",()=>{

Array.from(arrayPath).forEach(p=>{
p.addEventListener('mousedown',()=>{

p.style.stroke = document.getElementById("color_stroke_path").value
p.style['stroke-width'] = document.getElementById("stroke_path").value

})

})
})


//export format raster

document.getElementById("download_as_png").addEventListener("click",()=>{

var stringSVG = new XMLSerializer().serializeToString(svg);

var windowURL = window.URL 
var img = document.createElement("img")

var svgBlob = new Blob([stringSVG], {type: "image/svg+xml;charset=utf-8"});

var url = windowURL.createObjectURL(svgBlob);

let canvas=document.createElement("canvas");

canvas.setAttribute("width", svg.style.width)
canvas.setAttribute("height", svg.style.height)

img.addEventListener("load", function(e){   

const context = canvas.getContext("2d");
context.drawImage(img,0,0);

let png = canvas.toDataURL();

const a = document.createElement("a");
a.download = "imageRaster";
a.href = png;
a.click();
})
img.src = url;

})


//
document.getElementById("download_as_jpeg").addEventListener("click",()=>{

var stringSVG = new XMLSerializer().serializeToString(svg);

var windowURL = window.URL 
var img = document.createElement("img")

var svgBlob = new Blob([stringSVG], {type: "image/svg+xml;charset=utf-8"});

var url = windowURL.createObjectURL(svgBlob);

let canvas=document.createElement("canvas");

canvas.setAttribute("width", svg.style.width)
canvas.setAttribute("height", svg.style.height)

img.addEventListener("load", function(e){   

const context = canvas.getContext("2d");
context.drawImage(img,0,0);

let png = canvas.toDataURL('image/jpeg');

const a = document.createElement("a");
a.download = "imageRaster.jpeg";
a.href = png;
a.click();
})
img.src = url;

})


//save as svg

document.getElementById("download_as_svg").addEventListener("click", () => {

var svgData = (new XMLSerializer()).serializeToString(svg);
let uriComponent= encodeURIComponent(svgData)
var a = document.createElement('a');
a.href = 'data:image/svg+xml; charset=utf8, ' + uriComponent;
a.download = "imageSVG.svg"
a.click()

});

//undo drawing shapes

document.getElementById("undo_draw_shapes").addEventListener("click",function (e){

for(let i=svg.children.length-1;i>0;i--)
{
if(svg.children[i].tagName!=="path")
{
   svg.removeChild(svg.children[i])
   return;
}
}


})




  






  




  
