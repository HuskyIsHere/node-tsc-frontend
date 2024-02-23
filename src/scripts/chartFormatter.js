//Formatter to generate charts
export var chartFormatter = function(cell, formatterParams, onRendered){
    var content = document.createElement("span");
    var values = cell.getValue();

    //invert values if needed
    if(formatterParams.invert){
        values = values.map(val => val * -1);
    }

    //add values to chart and style
    content.classList.add(formatterParams.type);
    content.innerHTML = values.join(",");

    //setup chart options
    var options = {
        width: 145,
    }

    if(formatterParams.fill){
        options.fill = formatterParams.fill
    }

    //instantiate piety chart after the cell element has been aded to the DOM
    onRendered(function(){
        peity(content, formatterParams.type,  options);
    });

    return content;
};
