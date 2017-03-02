//https://climate.nasa.gov/vital-signs/global-temperature/

var w,h;
var data;
$(document).ready(function() {

  w = $(window).width();
  h = $(window).height();



  $.ajax({
    url: "data/data.csv",
    success: function(result) {
       data = $.csv.toArrays(result);
      //  console.log(data[0]);
      //console.log(data.length - 1);
      drawShapes(data,14,80,80,true);
    }
  });

  //width, height, curve, text

  $("#inputWidth").change(function() {
    var inputWidth=  $("#inputWidth").val();
    var inputHeight = $("#inputHeight").val();
    var inputCurve = $("#inputCurve").val();
    var inputText = $("#inputText").val();
    console.log(inputWidth);
    $("svg").remove();
    //updateShapes(data,inputWidth,inputHeight,inputCurve,inputText);
  });

  $("#inputHeight").change(function() {
    var inputWidth=  $("#inputWidth").val();
    var inputHeight = $("#inputHeight").val();
    var inputCurve = $("#inputCurve").val();
    var inputText = $("#inputText").val();
    console.log(inputHeight);
    $("svg").remove();
    //updateShapes(inputWidth,inputHeight,inputCurve,inputText);
  });

  $("#inputCurve").change(function() {
    var inputWidth=  $("#inputWidth").val();
    var inputHeight = $("#inputHeight").val();
    var inputCurve = $("#inputCurve").val();
    var inputText = $("#inputText").val();
    console.log(inputCurve);
    $("svg").remove();
    //updateShapes(inputWidth,inputHeight,inputCurve,inputText);
  });

  // $("#inputText").change(function() {
  //   var inputWidth=  $("#inputWidth").val();
  //   var inputHeight = $("#inputHeight").val();
  //   var inputCurve = $("#inputCurve").val();
  //   var inputText = $("#inputText").val();
  //   console.log(inputText);
  //   drawShapes(inputWidth,inputHeight,inputCurve,inputText);
  // });

});

function drawShapes(data,step,base,ratio,showText){

  var h = (base+ratio) * Math.round(data.length / num);

var r  = new Rune({
     container: "#canvas",
     width: (w - 30),
     height: 4000,
     debug: false,
   });

  for (var i = 1; i < (data.length - 1); i++) {
    var year = data[i][0];

    var num = Math.round((w-100)/step/13);
    var x = 20 + step*14 * (i % num);
    var y = 100 + (base+ratio) * Math.round(i / num);

    // var step = 10; //input width
    // var ratio = 20; //input curve
    // var base = 30; //input height
    var patternPath = r.path(x, y)
      .stroke(0)
      .fill(false)
      .strokeWidth(2);

    for (var j = 1; j < 12; j++) {
      var temp = data[i][j];
      //console.log(data[0][j]);
      //console.log(temp);
      //patternPath.lineTo((step * j),(data[i][j] * ratio+base))
      patternPath.curveTo((step * j), (data[i][j] * ratio + base), (step * j + step * (j + 1)) / 2, ((data[i][j] * ratio + base) + (data[i][j + 1] * ratio + base)) / 2)

    }
    patternPath.curveTo((step * 12), (data[i][12] * ratio + base), (step * 12 + step * 13) / 2, ((data[i][12] * ratio + base) + 0) / 2)
    patternPath.lineTo((step * 13), 0)
    patternPath.closePath();

  }
  r.draw();
}
