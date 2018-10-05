var barData = [20, 30, 45, 15, 25, 35, 70,   //The visualized data on the bar chart
                37, 87, 30, 45, 55, 10, 33, 
                63, 87, 60, 25, 55, 14, 22]; 

var height = 200,
    width = 600,
    barWidth = 50,
    barOffset = 5;
    
var yScale = d3.scale.linear() //Limiting the height of the bars on the Y dimension using a quantitative scale
               .range([0, height])
               .domain([0, d3.max(barData)+(d3.max(barData)*0.1)]); //The extra 10% makes the chart more readable

var xScale = d3.scale.ordinal() //Limiting the width of the bars on the X dimension using an ordinal scale
               .rangeBands([0, width])
               .domain(d3.range(0, barData.length));

d3.select('#bar-chart').append('svg') //Drawing the canvas
  .attr('width', width)
  .attr('height', height)
  .style('background', '#C9D7D6')
  .selectAll('rect').data(barData) //Drawing the data
  .enter().append('rect')
  .style('fill', '#C61C6F')
  .attr('width', xScale.rangeBand())
  .attr('height', function(d) {
      return yScale(d);
  })
  .attr('x', function(d, i) {
      return xScale(i); //Positioning the data on the X dimension
  })
  .attr('y', function(d) {
      return height-yScale(d); //Positioning the data on the Y dimension
  })