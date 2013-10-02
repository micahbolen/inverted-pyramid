'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('version', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
 directive('invertedPyramid', ['inverted-pyramid', function(data) {
    return function(scope, elm, attrs) {
      elm.attr("version", data.version);
        elm.css({"display":"block","width":"700px","height":"300px" });
       var canvas = document.createElement('canvas');
       canvas.width = 700;
       canvas.height = 300;
       
       elm.append(canvas);
                
                var w = canvas.width;
                var h = canvas.height;
                var ctx = canvas.getContext('2d');


                scope.updateChart = function() {

                    var lines = [];


                    function plotLine(section, i, array) {
                        var y; // draw the divider line and start the trapezoid at this y position


                        if (i < ( data.segments.length - 1)) {
                            y = i * (250 / ( data.segments.length - 1));
                            if(y == 0) y = 2;

                        } else {
                            y = 250;

                        }
                        lines.push(y);

                    }
                    data.segments.forEach(plotLine, this);

                    var lineTween = new TWEEN.Tween( { y: 0 } )
                    .to( lines, 1000 )
                    .easing( TWEEN.Easing.Elastic.Out )
                    .onUpdate( function () {
                        ctx.clearRect ( 0 , 0 , w , h );
                        function drawLine(section, i, array) {

                            if ( ctx.setLineDash !== undefined )  ctx.setLineDash([0]);

                            if ( ctx.mozDash !== undefined ) ctx.mozDash = [];

                            ctx.lineWidth = 4;

                            // set line color
                            ctx.strokeStyle = '#ffffff';
                            ctx.beginPath();
                            ctx.moveTo(0, this[i]);
                            ctx.lineTo(w, this[i]);

                            ctx.stroke();
                            ctx.closePath();
                            ctx.save();


                            if ( ctx.setLineDash !== undefined )  ctx.setLineDash([4,6]);

                            if ( ctx.mozDash !== undefined ) ctx.mozDash = [4, 6];

                            ctx.lineWidth = 2;

                            // set line color
                            ctx.strokeStyle = '#999';
                            ctx.beginPath();
                            ctx.moveTo(0, this[i]);
                            ctx.lineTo(w, this[i]);

                            ctx.stroke();
                            ctx.closePath();
                            ctx.save();
                        }



                        function drawSections(section, i, a) {
                            if (i < data.segments.length - 1) {


                                // set line color
                                ctx.fillStyle = data.segments[i].color;

                                ctx.beginPath();

                                // http://stackoverflow.com/questions/18855315/how-can-i-solve-for-the-points-of-an-arbitrary-trapezoid-inscribed-inside-of-a-t

                                var x = 350 - (((350 - 200) * (300 - this[i])) / (300 - 0));

                                ctx.moveTo(x, this[i]);

                                var x2 = 350 - (((350 - 200) * (300 - this[i+1])) / (300 - 0));

                                ctx.lineTo(x2, this[i+1]);

                                var x3 = 350 +(((500 - 350)*(300 - this[i+1])) / (300 - 0));

                                ctx.lineTo(x3, this[i+1]);

                                var x4 = 350 +(((500 - 350)*(300 - this[i])) / (300 - 0));
                                ctx.lineTo(x4, this[i]);

                                ctx.closePath();
                                ctx.fill();
                                ctx.save();
                            } else {

                                // set line color
                                ctx.fillStyle = data.segments[i].color;

                                ctx.beginPath();

                                // http://stackoverflow.com/questions/18855315/how-can-i-solve-for-the-points-of-an-arbitrary-trapezoid-inscribed-inside-of-a-t

                                var x = 350 - (((350 - 200) * (300 - this[i])) / (300 - 0));

                                ctx.moveTo(x, this[i]);

                                var x2 = 350;

                                ctx.lineTo(x2, 300);



                                var x3 = 350 +(((500 - 350)*(300 - this[i])) / (300 - 0));
                                ctx.lineTo(x3, this[i]);

                                ctx.closePath();
                                ctx.fill();
                                ctx.save();
                            }

                        }



                        data.segments.forEach(drawSections, this);
                        data.segments.forEach(drawLine, this);

                    })
                    .onComplete( function() {


                        ctx.font = "14px Arial";


                        var labelTween = new TWEEN.Tween({a: 0})
                        .to({a: 1}, 1000)

                        .onUpdate( function() {
                            function drawLabels(section, i, a) {

                                var nameWidth = ctx.measureText(data.segments[i].name);
                                ctx.clearRect(2, lines[i]+4, nameWidth.width, 20);


                                ctx.fillStyle = "rgba(0,0,0,"+this.a+")";
                                ctx.fillText(data.segments[i].name, 2, lines[i]+16);

                                var convRateWidth = ctx.measureText(data.segments[i].convRate);
                                ctx.clearRect(510, lines[i]+4, convRateWidth.width, 20);


                                ctx.fillStyle = "rgba(117,148,177,"+this.a+")";
                                ctx.fillText(data.segments[i].convRate, 510, lines[i]+16);




                                ctx.fillStyle = "rgba(0,0,0,"+this.a+")";
                                var hitsWidth = ctx.measureText(numberWithCommas(data.segments[i].hits));
                                ctx.clearRect(700 - hitsWidth.width - 10, lines[i] + 4, hitsWidth.width, 20);
                                ctx.fillText(numberWithCommas(data.segments[i].hits), 700 - hitsWidth.width - 10, lines[i] + 16);
                            }
                            data.segments.forEach(drawLabels, this);
                        })
                        .start();



                    })
                    .start();

                };

                function animate() {


                    requestAnimationFrame(animate);
                    TWEEN.update();
                }

                function numberWithCommas(x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }


                scope.updateChart();
                animate();


            
    };
  }]);
