var barData = []; //The visualized data on the bar chart

for (var i=0; i<10; i++) { //Adding random data
    barData.push(Math.round(Math.random()*100)+5);
} 

var height = 200,
    width = 600,
    //barOffset = 5,
    tempColor,
    barWidth = 50;
    
var yScale = d3.scale.linear() //Limiting the height of the bars on the Y dimension using a quantitative scale
               .range([0, height])
               .domain([0, d3.max(barData)+(d3.max(barData)*0.1)]); //The extra 10% makes the chart more readable

var xScale = d3.scale.ordinal() //Limiting the width of the bars on the X dimension using an ordinal scale
               .rangeBands([0, width], 0.1)
               .domain(d3.range(0, barData.length));

var colors = d3.scale.linear()
               .range(['#FFB832', '#C61C6F'])
               .domain([0, d3.max(barData)+(d3.max(barData)*0.5)]);

var tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('padding', '0 10px')
                .style('background', 'white')
                .style('opacity', 0)

var barChart = d3.select('#bar-chart').append('svg') //Drawing the canvas
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .append('g') //Grouping all the rects of the bar chart together
    .selectAll('rect').data(barData) //Drawing the data
    .enter().append('rect')
    .style('fill', colors)
    .attr('width', xScale.rangeBand())
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('x', function(d, i) {
        return xScale(i); //Positioning the data on the X dimension
    })
    .attr('y', height)
    .on('mouseover', function(d) {
        tooltip.transition()
                .style('opacity', 1)
        tooltip.html(d)
                .style('left', (d3.event.pageX+7) + 'px')
                .style('top', (d3.event.pageY+12) + 'px')
        tempColor = this.style.fill;  
        d3.select(this)
        .style('fill', '#738A05')
        .style('opacity', '0.5');
    })
    .on('mouseout', function(d) {
        tooltip.transition()
        .style('opacity', 0)
        d3.select(this)
        .style('fill', tempColor)
        .style('opacity', '1');
    })

barChart.transition()
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('y', function(d) {
        return height-yScale(d); 
    })
    .duration(1000).ease('linear')

var yGuideScale = d3.scale.linear()
                    .range([height, 0])
                    .domain([0, d3.max(barData)+(d3.max(barData)*0.1)]);

var yAxis = d3.svg.axis()
            .scale(yGuideScale)
            .orient('left')
            .ticks(10)

var yGuide = d3.select('svg').append('g')
yAxis(yGuide)
yGuide.attr('transform', 'translate(35, 0)')
        .selectAll('path')
        .style({'fill': 'none', 'stroke': '#000'})
yGuide.selectAll('line')
        .style({'stroke': '#000'})

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function(d, i) {
        return !(i % (barData.length/5));
    }))

var xGuide = d3.select('svg').append('g')
xAxis(xGuide)
xGuide.attr('transform', 'translate(0, '+ (height-30) +')')
        .selectAll('path')
        .style({'fill': 'none', 'stroke': '#000'})
xGuide.selectAll('line')
        .style({'stroke': '#000'})
