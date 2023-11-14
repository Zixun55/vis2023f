function _1(md){return(
md`# HW2 Strong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("../data.json").json()
)}

function _constellationNM(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _constellations(data,constellationNM){return(
data.map(item => constellationNM[item.Constellation])
)}

function _Counts(){return(
[]
)}

function _6(Counts,constellationNM,data)
{
  Counts.length = 0; //將yCounts清空
  for (var y=0; y<=11; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    Counts.push({num:y, gender:"male", count:0, constellation:constellationNM[y]}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    Counts.push({num:y, gender:"female", count:0, constellation:constellationNM[y]}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation)*2 + (x.Gender== "男" ? 0 : 1); 
    Counts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return Counts
}


function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _8(Plot,plot2,constellationNM,Counts){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  y: {label: "count"},
  x: {label: "constellation", ticks: 10, tickFormat: (d) => constellationNM[d]},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(Counts, {x: "num", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _10(Plot,plot1,constellationNM,data){return(
Plot.plot({  

	marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,   
	y: {grid: true, label: "count"}, 
  x: {label: "constellation", ticks: 10, tickFormat: (d) => constellationNM[d]},
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true })),    
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0 })
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("./files/2259824662fb612853b8873b8814ace51e8cbac39ba881850d66e26df63f1897b01d1bd3459af6529669fd912da9dd607a30666a93278d7fdfa10bbe22b8913d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellationNM")).define("constellationNM", _constellationNM);
  main.variable(observer("constellations")).define("constellations", ["data","constellationNM"], _constellations);
  main.variable(observer("Counts")).define("Counts", _Counts);
  main.variable(observer()).define(["Counts","constellationNM","data"], _6);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","constellationNM","Counts"], _8);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","constellationNM","data"], _10);
  return main;
}
