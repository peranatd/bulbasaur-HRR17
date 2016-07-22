// import dimple from 'dimple-js';
import dimple from '../node_modules/dimple-js/dist/dimple.latest.js';
import d3 from 'd3';

// data === {
//   dataset: ....,
//   x: the name of the x-axis,
//   charts: [ {y: ...., type: .... }, {y: ...., type: .... }, .... ]
// }

let makeCharts = function(data, height, width) {
  let svg = dimple.newSvg(".chart", height, width).attr('class', 'chartSvg');

  // For each "chart" object,
    // "typify" the type...
    // add the category axis and measure axis...
    // add the series
    // draw
  data.charts.forEach((chart) => {
    chart.type ? chart.type : "scatter";
    if (chart.y) {
      let newChart = new dimple.chart(svg, data.dataset);
      let newChartType = typify(chart.type);

      newChart.addCategoryAxis('x', data.x);
      newChart.addMeasureAxis('y', chart.y);

      newChart.addSeries(null, newChartType);

      newChart.draw();
    }
  });
};

let deleteCharts = function() {
  d3.select('.chartSvg').remove();
};

let typify = function(typeString) {
  if (typeString === "bar") {
    return dimple.plot.bar;
  } else if (typeString === "histogram") {
    return dimple.plot.histogram;
  } else if (typeString === "line") {
    return dimple.plot.line;
  } else if (typeString === "scatter") {
    return dimple.plot.scatter;
  }
};

module.exports = { makeCharts, deleteCharts };
