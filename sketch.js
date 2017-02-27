//https://climate.nasa.gov/vital-signs/global-temperature/
var r = new Rune({
  container: "#canvas",
  width: 1800,
  height: 1000,
  debug: false,
});

$(document).ready(function() {
  $.ajax({
    url: "data/data.csv",
    success: function(result) {
      var data = $.csv.toArrays(result);
    //  console.log(data[0]);
      for (var i = 1; i < (data.length-1) ; i++) {
        var year = data[i][0];
        var x = 20+150*(i%10);
        var y = 100+100*Math.round(i/10);
        var step = 10;
        var ratio = 20;
        var base = 30;
        var patternPath = r.path(x, y)
          .stroke(0)
          .fill(false)
          .strokeWidth(2);

        for (var j = 1; j < 13; j++) {
          var temp = data[i][j];
          console.log(data[0][j]);
          console.log(temp);
          patternPath.lineTo((step * j),(data[i][j] * ratio+base))

        }
        patternPath.lineTo((step*13),0)
        patternPath.closePath();
        r.draw();
      }
    }
  });
});
