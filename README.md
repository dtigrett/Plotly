
In this assignment, an interactive dashboard was built to explore the Belly Button Biodiversity dataset, a catalog of microbes that colonize human navels.The dataset revealed that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

The first step in building the dashboard was to use the D3 library to read in the json file that contained the Belly Button Biodiversity dataset. A horizontal bar chart and a bubble chart was created that displayed the top 10 OTU's in an individual. A dropdown menu on the dashboard also displayed the sample metadata (an individual's demographic information). Anytime a new sample or ID number was selected on the dropdown menu it would then load the new demographic information as well as update the plots to reflect the new sample id data.


