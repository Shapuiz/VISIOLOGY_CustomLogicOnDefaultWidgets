//############################## Custom histogram on summary table widget ##############################
//Parameters:
const tableColumnsToDraw = [0, 1, 2]; //Array of column numbers with data in which to draw a histogram (Starting from 0)
const histogramColour = ["blue", "yellow", "green"] //Colors of the histogram in the table (HEX)
const tableWidgetGUID = "85bf4cf106ee42828121fe78d5a5fcbd"; //Table GUID
const maxHistogramWidth = 100; //Maximum width of the histogram as a percentage of the maximum cell width. Specified in % from 1 to 100.
const minimalHistogramWidth = 5; //Minimum width of the histogram. This value will be applied for elements whose width is less than the number specified in this parameter.

visApi().onAllWidgetsLoadedListener({
    guid: (tableWidgetGUID + "_onAllWidgetsLoaded")
}, function() {
    let targetTableOnList = $('div[id="' + tableWidgetGUID + '"]').length;
    if (targetTableOnList > 0) {
        let tableWidgetApiCall = visApi().getWidgetByGuid(tableWidgetGUID);
        drawHistogramOnTable(tableWidgetApiCall.widgetDataContainer.dataFrame.cols.length, tableWidgetApiCall.widgetDataContainer.dataFrame.rows.length);
        $('div [id="' + tableWidgetGUID + '"]').find('div [id^=tableHistogramDiv]').animate({
            opacity: 1 / 4
        }, 1000);
    }
});

//Drawing a histogram
function drawHistogramOnTable(tableColumnsQuantity, tableRowsQuantity) {
    let lengthAllTableCells = $('div [id="' + tableWidgetGUID + '"]').find('td').children('span').length;
    let startDrawingFromCell = lengthAllTableCells - (tableColumnsQuantity * tableRowsQuantity);

    //Iterating through the array of required columns
    for (let columnIterator = 0; columnIterator < tableColumnsToDraw.length; columnIterator++) {
        let curColumnNumber = tableColumnsToDraw[columnIterator];
        let curColumnMaxValue = getcurColumnMaxValue(curColumnNumber, tableColumnsQuantity, lengthAllTableCells);
        for (let cellIterator = startDrawingFromCell + tableColumnsToDraw[columnIterator]; cellIterator < lengthAllTableCells; cellIterator += tableColumnsQuantity) {
            let curCell = $('div [id="' + tableWidgetGUID + '"]').find('td').children('span')[cellIterator];
            let curCellValue = parseFloat($('div [id="' + tableWidgetGUID + '"]').find('td').children('span')[cellIterator].textContent.trim().replace(' ', ''));
            if (curCellValue > 0 && Object.is(curCellValue, NaN) === false) {
                let curCellWidthValue = getDataColumnWidth(curCell);
                let curCellHistogramWidth = getHistogramWidth(curCellValue, curColumnMaxValue, curCellWidthValue, maxHistogramWidth, minimalHistogramWidth);
                let curCellHeight = getDataCellHeight(curCell);
                let div = addDivWithHistogramLine(curCellHistogramWidth, curCellHeight, columnIterator);
                $(curCell).parent().prepend(div);
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

        for (let cellIterator = startDrawingFromCell + thisColumnNumber; cellIterator < lengthAllTableCells; cellIterator += tableColumnsQuantity) {
            thisValue = parseFloat($('div [id="' + tableWidgetGUID + '"]').find('td').children('span')[cellIterator].textContent.trim().replace(' ', ''));
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
            "opacity": "0%"
        });
        return histogramLineDiv;
    }
}
//##############################################################################################
