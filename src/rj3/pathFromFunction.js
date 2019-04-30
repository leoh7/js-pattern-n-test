rj3.svg.samples = {};

rj3.svg.samples.functionBasedLine = function functionBasedLine() {
  var firstXCoord = 10,
      xDistanceBetweenPoints = 50,
      lineGenerator,
      svgHeight = 200;

  lineGenerator = rj3.svg.line()
    .x(function(d, i) { return firstXCoord + i * xDistanceBetweenPoints; })
    .y(function(d) { return svgHeight - this.getValue(d); });

  return lineGenerator;
};

(function() {
  // yearlyPriceGrapher 가 y 좌푯값의 접근자의 this 이다
  var yearlyPriceGrapher = {
      lineGenerator = rj3.svg.samples.functionBasedLine(),

      getValue: function getValue(year) {
        return 10 * Math.pow(1.8, year-2010);
      }
    },
    years = [2010, 2011, 2012, 2013, 2014, 2015],
    path = yearlyPriceGrapher.lineGenerator(years);

  document.getElementById('pathFromFunction').setAttribute('d', path);  
}());