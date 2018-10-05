var barData = [20, 30, 45, 15, 25, 35];

var height = 200,
    width = 600,
    barWidth = 50,
    barOffset = 5;
    
d3.select('#bar-chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#C9D7D6')
  .selectAll('rect').data(barData)
  .enter().append('rect')
  .style('fill', '#C61C6F')
  .attr('width', barWidth)
  .attr('height', function(d) {
      return d;
  })
  .attr('x', function(d, i) {
      return i * (barWidth+barOffset);
  })
  .attr('y', function(d) {
      return height-d;
  })