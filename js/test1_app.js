// Creating function for Data plotting
function BuildPlots(id) {
    // get data from the json file
    d3.json("samples.json").then(function(data) {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        
        // filter by id
        var sampleId = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(sampleId);
  
        //  top 10 
        var sampleValues = sampleId.sample_values.slice(0, 10).reverse();
  
        // Only top 10 otu ids . 
        var OTU_top = (sampleId.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's  for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
  
        //  top 10 labels for the plot
        var labels = sampleId.otu_labels.slice(0, 10);
  
         console.log(`Sample Values: ${sampleValues}`)
      
        // create trace variable for the plot
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'magenta'},
            type:"bar",
            orientation: "h",
        };
  
        //  data variable
        var data = [trace];
  
        //  layout variable to set  layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // create the bar plot
        Plotly.newPlot("bar", data, layout);
  
        
      
        //  Bubble chart
        var trace1 = {
            x: sampleId.otu_ids,
            y: sampleId.sample_values,
            mode: "markers",
            marker: {
                size: sampleId.sample_values,
                color: sampleId.otu_ids
            },
            text: sampleId.otu_labels
  
        };
  
        //  layout for  Bubble Plot
        var layoutBubble = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        // create data variable 
        var data1 = [trace1];
  
        // create  Bubble Plot
        Plotly.newPlot("bubble", data1, layoutBubble); 
  
        //  Gauge chart
  
        var data_gauge = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: ` Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "purple" },
                    { range: [2, 4], color: "magenta" },
                    { range: [4, 6], color: "yellow" },
                    { range: [6, 8], color: "pink" },
                    { range: [8, 9], color: "gray" },
                  ]}
              
          }
        ];
        var layoutGauge = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", data_gauge, layoutGauge);
      });
  }  
  // function to get the needed data
  function DemoInfo(id) {
    // read the json file to get data
    d3.json("samples.json").then(function(data) {
        
        //  metadata info for  demographic info
        var metadata = data.metadata;
  
        console.log(metadata)
  
        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
  
        // select demographic panel for data
        var demographicInfo = d3.select("#sample-metadata");
        
        // clear demographic info when new id is clicked
        demographicInfo.html("");
  
        // grab  demographic info data for id and append
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
  }
  
  // function for the change event
  function optionChanged(id) {
    BuildPlots(id);
    DemoInfo(id);
  }
  
  //  function for the initial data rendering
  function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
  
    // read the data 
    d3.json("samples.json").then(function(data) {
        console.log(data)
  
        //  id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
  
        // call  functions to display data and plots
        BuildPlots(data.names[0]);
        DemoInfo(data.names[0]);
    });
  }
  
  init();
  