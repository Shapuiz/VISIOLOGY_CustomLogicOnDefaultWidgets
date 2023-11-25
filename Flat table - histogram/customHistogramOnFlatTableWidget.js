//############################## Custom histogram on flat table widget ##############################
//Parameters:
const tableColumnsToDraw = [2, 3]; //Array of table column numbers with data in which to draw a histogram (Starting from 0)
const maximumValuesTextWidgetGUIDs = ["b8459e0632084431b67e01c89d4184a9", "5f67ad64902c49ebb305c94cfae99de1"]; //Array of "Text" widget GUIDs with maximum column value
const histogramColour = ["blue", "cyan"]; //Colors of the histogram in the table (HEX)
const maxHistogramWidth = 100; //Maximum width of the histogram as a percentage of the maximum cell width. Specified in % from 1 to 100.
const minimalHistogramWidth = 5; //Minimum width of the histogram. This value will be applied for elements whose width is less than the number specified in this parameter.


//Code block bellow (Do not change)!

//Flat table widget render
var dataGrid = DataGridRender({
    general: w.general,
    errorState: w.errorState,
    dataGridOptions: w.dataGridOptions,
    textFormatters: w.textFormatters,
    style: w.style,
});

const tableWidgetGUID = w.general.renderTo;

//Calling drawing a histogram function then "onContentReady" worked successfully 
visApi().onAllWidgetsLoadedListener({
    guid: (tableWidgetGUID + "_onAllWidgetsLoaded")
}, function() {
    let targetTableOnList = $('div[id="' + tableWidgetGUID + '"]').length;
    if (targetTableOnList > 0) {
        dataGrid.dataGridInstance.option("onContentReady", function() {
            let tableWidgetApiCall = visApi().getWidgetByGuid(tableWidgetGUID);
            drawHistogramOnTable(tableWidgetApiCall.widgetDataContainer.dataFrame.cols.length, tableWidgetApiCall.widgetDataContainer.dataFrame.rows.length);
            $('div [id="' + tableWidgetGUID + '"]').find('div [id^=tableHistogramDiv]').animate({
                opacity: 1 / 4
            }, 800);
        });
    }
});

//Drawing a histogram
function drawHistogramOnTable(tableColumnsQuantity, tableRowsQuantity) {
    let lengthAllTableCells = $('div [id="' + tableWidgetGUID + '"]').find('td').length;
    let startDrawingFromCell = tableColumnsQuantity;

    //Iterating through the array of required columns
    for (let columnIterator = 0; columnIterator < tableColumnsToDraw.length; columnIterator++) {
        let curColumnMaxValue = parseFloat($('div[id="' + maximumValuesTextWidgetGUIDs[columnIterator] + '"]').find('div')[0].textContent);
        for (let cellIterator = startDrawingFromCell + tableColumnsToDraw[columnIterator]; cellIterator < lengthAllTableCells; cellIterator += tableColumnsQuantity) {
            let curCell = $('div [id="' + tableWidgetGUID + '"]').find('td')[cellIterator];
            let curCellValue = parseFloat($('div [id="' + tableWidgetGUID + '"]').find('td')[cellIterator].textContent.trim().replace(/ /g, ""));
            if (curCellValue > 0 && Object.is(curCellValue, NaN) === false) {
                let curCellWidthValue = getDataColumnWidth(curCell);
                let curCellHeight = getDataCellHeight(curCell);
                let curCellHistogramWidth = getHistogramWidth(curCellValue, curColumnMaxValue, curCellWidthValue, maxHistogramWidth, minimalHistogramWidth);
                let div = addDivWithHistogramLine(curCellHistogramWidth, curCellHeight, columnIterator);
                if ($(curCell).find('div[id="tableHistogramDiv"]').length < 1) {
                    $(curCell).prepend(div);
                }
            }
        }
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

    //The function of obtaining the height of the cell
    function getDataCellHeight(thisCell) {
        let thisCellHeight = $(thisCell)[0].offsetHeight - 14;
        return thisCellHeight;
    }

    //Function for getting cell width
    function getDataColumnWidth(thisCell) {
        let thisCellWidth = $(thisCell)[0].offsetWidth;
        return thisCellWidth;
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
            "opacity": "0%"
        });
        return histogramLineDiv;
    }
}

//Render table
dataGrid;
//######################################################################################################