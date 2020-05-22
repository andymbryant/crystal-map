const filepath = './data/map-data.json'

const svg = d3.select("#map").append("svg")
const mapCtr = document.getElementById("map-ctr")

const width = mapCtr.offsetWidth
const height = mapCtr.offsetHeight

svg
  .attr("width", width)
  .attr("height", height)

d3.json(filepath)
  .then(function(res) {
    const {metadata, data}  = res

    const graphWidth = width
    const graphHeight = height
    console.log(metadata.ranges.x[1])

    const xScale = d3.scaleLinear()
      .domain([metadata.ranges.x[0], metadata.ranges.x[1]])
      .range([0, graphWidth])

    const yScale = d3.scaleLinear()
      .domain([metadata.ranges.y[0],metadata.ranges.y[1]])
      .range([0, graphHeight])

    svg.append("g")
      .attr("id", "locations")

    svg
      .select("#locations")
      .selectAll('location')
      .data(data)
      .enter()
      .append("circle")
        .attr('class', 'location')
        .attr("cx", function(d) {
          return xScale(d.coordinates[0])
        })
        .attr("cy", function(d) {
          return yScale(d.coordinates[1])
        })
        .attr("r", 5)
        .attr("fill", 'green')
  })