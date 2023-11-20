function _1(md) {
  return (
    md`# hw6`
  )
}

function _artistver(__query, FileAttachment, invalidation) {
  return (
    __query(FileAttachment("../artistVer.csv"), { from: { table: "artistVer" }, sort: [], slice: { to: null, from: null }, filter: [], select: { columns: null } }, invalidation)
  )
}

function _artistpublic(__query, FileAttachment, invalidation) {
  return (
    __query(FileAttachment("../artistPublic.csv"), { from: { table: "artistPublic" }, sort: [], slice: { to: null, from: null }, filter: [], select: { columns: null } }, invalidation)
  )
}

function _dataArtistver(artistver) {
  return (
    artistver.map(item => item["3）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"])
  )
}

function _dataArtistpublic(artistpublic) {
  return (
    artistpublic.map(item => item["4）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"])
  )
}

function _dataList() {
  return (
    []
  )
}

function _7(dataList, artistver, artistpublic) {
  dataList.length = 0;

  for (var y = 1; y <= 5; y++) {
    dataList.push({ dataSet: "artist", degree: y, count: 0 });
    dataList.push({ dataSet: "artistpublic", degree: y, count: 0 });
  }
  artistver.forEach(x => {
    var i = (x["3）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"] - 1) * 2;
    dataList[i].count++;
  })
  artistpublic.forEach(x => {
    var i = (x["4）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"]) * 2 - 1;
    dataList[i].count++;
  })
  return dataList
}


function _8(md) {
  return (
    md`---
Simple baseline`
  )
}

function _selectDataSet(Inputs) {
  return (
    Inputs.checkbox(["artist", "artistpublic"], { label: "Choose datasets", value: ["artist", "artistpublic"] })
  )
}

function _10(Plot, dataList, selectDataSet) {
  return (
    Plot.plot({
      grid: true,
      y: { label: "count" },
      marks: [
        Plot.ruleY([0]),
        Plot.barY(dataList.filter(d => selectDataSet.includes(d.dataSet)), Plot.stackY({ x: "degree", y: "count", tip: true, fill: "dataSet", title: d => `data set: ${d.dataSet}\ndegree: ${d.degree}\ncount: ${d.count}` })),
      ],
      color: {
        domain: ['artist', 'artistpublic'],
        range: ['#84C1FF', '#FF95CA'],
        legend: true
      }
    })
  )
}

function _11(md) {
  return (
    md`---
Medium baseline`
  )
}

function _selectDataSetSVG1(Inputs) {
  return (
    Inputs.checkbox(["artist", "artistpublic"], { label: "Choose datasets", value: ["artist", "artistpublic"] })
  )
}

function _chart(dataList, selectDataSetSVG1, d3) {
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(dataList.map(d => d.dataSet)));

  const filteredData = dataList.filter(d => selectDataSetSVG1.includes(d.dataSet));

  let grouped = Array.from(d3.group(filteredData, d => d.degree), ([i, degree]) => {
    return { degree: i, ...Object.fromEntries(degree.map(item => [item.dataSet, item.count])) };
  });

  const stack = d3.stack().keys(['artist', 'artistpublic']);
  const dataSet = stack(grouped);

  const xScale = d3.scaleBand()
    .domain(dataList.map(d => d.degree))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(dataSet, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
    .domain([0, yMax]).nice()
    .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(['artist', 'artistpublic'])
    .range(['#84C1FF', '#FF95CA']);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  dataSet.forEach((serie) => {
    let bars = g.append("g")
      .attr("fill", colorScale(serie.key))
      .selectAll("rect")
      .data(serie);

    bars.enter().append("rect")
      .attr("x", d => xScale(d.data.degree))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _selectDataSetSVG2(Inputs) {
  return (
    Inputs.checkbox(["artist", "artistpublic"], { label: "Choose datasets", value: ["artist", "artistpublic"] })
  )
}

function _chart1(dataList, selectDataSetSVG2, d3) {
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(dataList.map(d => d.dataSet)));

  const filteredData = dataList.filter(d => selectDataSetSVG2.includes(d.dataSet));

  let grouped = Array.from(d3.group(filteredData, d => d.degree), ([i, degree]) => {
    return { degree: i, ...Object.fromEntries(degree.map(item => [item.dataSet, item.count])) };
  });

  const stack = d3.stack().keys(['artist', 'artistpublic']);
  const dataSet = stack(grouped);

  const xScale = d3.scaleBand()
    .domain(dataList.map(d => d.degree))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(dataSet, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
    .domain([0, yMax]).nice()
    .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(['artist', 'artistpublic'])
    .range(['#84C1FF', '#FF95CA']);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  dataSet.forEach((serie) => {
    let bars = g.append("g")
      .attr("fill", colorScale(serie.key))
      .selectAll("rect")
      .data(serie);

    bars.enter().append("rect")
      .attr("x", d => xScale(d.data.degree))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .transition()
      .duration(1000)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _16(md) {
  return (
    md`---
Strong baseline`
  )
}

function _selectDataSetSVG3(Inputs) {
  return (
    Inputs.checkbox(["artist", "artistpublic"], { label: "Choose datasets", value: ["artist", "artistpublic"] })
  )
}

function _chart2(dataList, selectDataSetSVG3, d3) {
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(dataList.map(d => d.dataSet)));

  const filteredData = dataList.filter(d => selectDataSetSVG3.includes(d.dataSet));

  let grouped = Array.from(d3.group(filteredData, d => d.degree), ([i, degree]) => {
    return { degree: i, ...Object.fromEntries(degree.map(item => [item.dataSet, item.count])) };
  });

  const stack = d3.stack().keys(['artist', 'artistpublic']);
  const dataSet = stack(grouped);

  const xScale = d3.scaleBand()
    .domain(dataList.map(d => d.degree))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(dataSet, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
    .domain([0, yMax]).nice()
    .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(['artist', 'artistpublic'])
    .range(['#84C1FF', '#FF95CA']);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const defs = svg.append("defs");
  const filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");

  filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 4)
    .attr("result", "blur");

  filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 4)
    .attr("dy", 4)
    .attr("result", "offsetBlur");

  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode")
    .attr("in", "offsetBlur");
  feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");


  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  dataSet.forEach((serie) => {
    let bars = g.append("g")
      .attr("fill", colorScale(serie.key))
      .selectAll("rect")
      .data(serie);

    bars.enter().append("rect")
      .attr("x", d => xScale(d.data.degree))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]))
      .attr("filter", "url(#drop-shadow)")
      .on("mouseover", function (d) {
        d3.select(this).attr("fill", "#CE0000");
      })
      .on("mouseout", function (d) {
        d3.select(this).attr("fill", colorScale(serie.key));
        d3.select(".tooltip").remove();
      });
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistVer.csv", { url: new URL("./files/363ea43eed3c6a6a6fed83d3e26ac23641da56f4f0689da720760208af84f1c3caff531322fc2ceeaf3924e4ff2f0ca4314a49adfe0e45701c6687fc36ee24d3.csv", import.meta.url), mimeType: "text/csv", toString }],
    ["artistPublic.csv", { url: new URL("./files/41a9c6bfdf8907c7f19b5a52517012d51d11afcdf769218a6b5c1af5288c865ca2bf10f0fdac5144f8d3676054b833c736642053e880c85ec6123fb15744ae7f.csv", import.meta.url), mimeType: "text/csv", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistver")).define("artistver", ["__query", "FileAttachment", "invalidation"], _artistver);
  main.variable(observer("artistpublic")).define("artistpublic", ["__query", "FileAttachment", "invalidation"], _artistpublic);
  main.variable(observer("dataArtistver")).define("dataArtistver", ["artistver"], _dataArtistver);
  main.variable(observer("dataArtistpublic")).define("dataArtistpublic", ["artistpublic"], _dataArtistpublic);
  main.variable(observer("dataList")).define("dataList", _dataList);
  main.variable(observer()).define(["dataList", "artistver", "artistpublic"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof selectDataSet")).define("viewof selectDataSet", ["Inputs"], _selectDataSet);
  main.variable(observer("selectDataSet")).define("selectDataSet", ["Generators", "viewof selectDataSet"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot", "dataList", "selectDataSet"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof selectDataSetSVG1")).define("viewof selectDataSetSVG1", ["Inputs"], _selectDataSetSVG1);
  main.variable(observer("selectDataSetSVG1")).define("selectDataSetSVG1", ["Generators", "viewof selectDataSetSVG1"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["dataList", "selectDataSetSVG1", "d3"], _chart);
  main.variable(observer("viewof selectDataSetSVG2")).define("viewof selectDataSetSVG2", ["Inputs"], _selectDataSetSVG2);
  main.variable(observer("selectDataSetSVG2")).define("selectDataSetSVG2", ["Generators", "viewof selectDataSetSVG2"], (G, _) => G.input(_));
  main.variable(observer("chart1")).define("chart1", ["dataList", "selectDataSetSVG2", "d3"], _chart1);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof selectDataSetSVG3")).define("viewof selectDataSetSVG3", ["Inputs"], _selectDataSetSVG3);
  main.variable(observer("selectDataSetSVG3")).define("selectDataSetSVG3", ["Generators", "viewof selectDataSetSVG3"], (G, _) => G.input(_));
  main.variable(observer("chart2")).define("chart2", ["dataList", "selectDataSetSVG3", "d3"], _chart2);
  return main;
}
