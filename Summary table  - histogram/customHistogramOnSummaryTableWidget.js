//############################## Custom histogram on summary table widget ##############################
//Parameters:
const tableColumnsToDraw = [0, 1, 2]; //Array of column numbers with data in which to draw a histogram (Starting from 0)
const histogramColour = ["darkblue", "orange", "green"] //Colors of the histogram in the table (HEX)
const maxHistogramWidth = 100; //Maximum width of the histogram as a percentage of the maximum cell width. Specified in % from 1 to 100.
const minimalHistogramWidth = 5; //Minimum width of the histogram. This value will be applied for elements whose width is less than the number specified in this parameter.


//Code block bellow (Do not change)!

//Flat table widget render
var dataGrid = OlapTableRender({
    general: w.general,
    pivotGridOptions: w.pivotGridOptions,
    style: w.style,
    errorState: w.errorState,
    textFormatters: w.textFormatters
 });

 const tableWidgetGUID = w.general.renderTo;

 //Calling drawing a histogram function then "onContentReady" worked successfully 
visApi().onAllWidgetsLoadedListener({
    guid: (tableWidgetGUID + "_onAllWidgetsLoaded")
}, function() {
    let targetTableOnList = $('div[id="' + tableWidgetGUID + '"]').length;
    if (targetTableOnList > 0) {
        //To draw on first load
        changeDOM();
        dataGrid.pivotGridInstance.option("onContentReady", function() {
        changeDOM();
        });
    }
});

//Modifies the DOM tree table by adding histogram elements 
function changeDOM () {
    let tableWidgetApiCall = visApi().getWidgetByGuid(tableWidgetGUID);
    console.log("visApi",visApi().getWidgetByGuid(tableWidgetGUID))
    console.log("tableWidgetGUID",tableWidgetGUID)
    console.log("tableWidgetApiCall",tableWidgetApiCall)
    drawHistogramOnTable(tableWidgetApiCall.widgetDataContainer.dataFrame.cols.length, tableWidgetApiCall.widgetDataContainer.dataFrame.rows.length);
    $('div [id="' + tableWidgetGUID + '"]').find('div [id^=tableHistogramDiv]').animate({
        opacity: 1 / 4
    }, 800);
}

//Drawing a histogram
function drawHistogramOnTable(tableColumnsQuantity, tableRowsQuantity) {
    console.log('drawHistogramOnTable start')
    $('div [id="' + tableWidgetGUID + '"]').find('div [id^=tableHistogramDiv]').remove();
    let lengthAllTableCells = $('div [id="' + tableWidgetGUID + '"]').find('td').not('.dx-last-cell').not('.dx-pivotgrid-expanded').length;
    let startDrawingFromCell = 8 + tableColumnsQuantity;

    //Iterating through the array of required columns
    for (let columnIterator = 0; columnIterator < tableColumnsToDraw.length; columnIterator++) {
        let curColumnNumber = tableColumnsToDraw[columnIterator];
        let curColumnMaxValue = getcurColumnMaxValue(curColumnNumber, tableColumnsQuantity, lengthAllTableCells);
        for (let cellIterator = startDrawingFromCell + tableColumnsToDraw[columnIterator]; cellIterator < lengthAllTableCells; cellIterator += tableColumnsQuantity) {
            let curCell = $('div [id="' + tableWidgetGUID + '"]').find('td').not('.dx-last-cell').not('.dx-pivotgrid-expanded')[cellIterator]
            let curCellSpan = $(curCell).children('span')[0];
            let curCellValue = parseFloat(curCellSpan.textContent.trim().replace(/ /g, ""));
            if (curCellValue > 0 && Object.is(curCellValue, NaN) === false) {
                let curCellWidthValue = getDataColumnWidth(curCellSpan);
                let curCellHistogramWidth = getHistogramWidth(curCellValue, curColumnMaxValue, curCellWidthValue, maxHistogramWidth, minimalHistogramWidth);
                let curCellHeight = getDataCellHeight(curCellSpan);
                let div = addDivWithHistogramLine(curCellHistogramWidth, curCellHeight, columnIterator);
                $(curCellSpan).parent().prepend(div);
            }
        }
    }

    //Function for getting cell width
    function getDataColumnWidth(thisCell) {
        let thisCellWidth = $(thisCell).parent('td')[0].offsetWidth;
        return thisCellWidth;
    }

    //The function of obtaining the height of the cell
    function getDataCellHeight(thisCell) {
        let thisCellHeight = $(thisCell).parent()[0].offsetHeight - 14;
        return thisCellHeight;
    }

    //Function for getting the maximum value in the specified column
    function getcurColumnMaxValue(thisColumnNumber, tableColumnsQuantity, lengthAllTableCells) {
        let thisValuesArray = [];
        let thisValue;
        let thisColumnMaxValue;
        let thisItemCell;

        for (let cellIterator = startDrawingFromCell + thisColumnNumber; cellIterator < lengthAllTableCells; cellIterator += tableColumnsQuantity) {
            thisItemCell = $('div [id="' + tableWidgetGUID + '"]').find('td').not('.dx-last-cell').not('.dx-pivotgrid-expanded')[cellIterator]
            thisValue = parseFloat($(thisItemCell).children('span')[0].textContent.trim().replace(/ /g, ""));
            if (Object.is(thisValue, NaN) === false) {
                thisValuesArray.push(thisValue);
            }
        }
        thisColumnMaxValue = Math.max.apply(Math, thisValuesArray);
        return thisColumnMaxValue;
    }

    //Function for getting the histogram width for the current cell
    function getHistogramWidth(thisCellValue, thisColumnMaxValue, thisColumnWidthValue, maxHistogramWidth, minimalHistogramWidth) {
        let thisValueRatio = parseFloat((thisCellValue / (thisColumnMaxValue / 100)));
        let thisCellHistogramWidth = (thisValueRatio * 0.01) * ((parseFloat(thisColumnWidthValue) - 18) * (maxHistogramWidth * 0.01));
        if (thisCellHistogramWidth < 0) {
            thisCellHistogramWidth = (thisCellHistogramWidth * (-1));
        }
        if (thisCellHistogramWidth < minimalHistogramWidth) {
            thisCellHistogramWidth = minimalHistogramWidth;
        }

        return thisCellHistogramWidth;
    }

    //Function that creates a div element of the histogram
    function addDivWithHistogramLine(thisCellHistogramWidth, thisCellHeight, thisColumnIterator) {
        let histogramLineDiv = document.createElement("div");
        histogramLineDiv.id = "tableHistogramDiv";
        $(histogramLineDiv).css({
            "background": histogramColour[thisColumnIterator],
            "height": thisCellHeight,
            "width": thisCellHistogramWidth,
            "position": "absolute",
            "opacity": "0%",
            "border-radius": "3px"
        });
        return histogramLineDiv;
    }
}

//Render table
dataGrid;
//######################################################################################################