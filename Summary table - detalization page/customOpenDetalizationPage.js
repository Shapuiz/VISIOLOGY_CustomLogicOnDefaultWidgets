//############################## Custom detalization page by double click on last drilldown level element ##############################
//Parameters:
const mainTableGUID = '0661ceb0deec4e7ba60ef703f9697c08'; //The GUID of the widget with the main table
const detailPageID = 1; //The number of the detail page. Starts from 0
const detailPageFilterGUID = '2ed48402e64b4f1c88eab04f50999efa'; //

let olapTableRender = OlapTableRender({
  general: w.general,
  pivotGridOptions: w.pivotGridOptions,
  style: w.style,
  errorState: w.errorState,
  textFormatters: w.textFormatters,
});

let oldOnContentReady = olapTableRender.pivotGridInstance.option('onContentReady');
olapTableRender.pivotGridInstance.option('onContentReady', function (event) {
  let lastDrilldownLevelCells = $('div [id="' + mainTableGUID + '"]')
    .find('.dx-last-cell')
    .not('.dx-pivotgrid-collapsed');

  //add custom cursor styles
  let newStyleValue = $(lastDrilldownLevelCells).attr('style') + 'cursor: pointer;';
  lastDrilldownLevelCells.attr('style', newStyleValue);

  //Remove old event listeners
  lastDrilldownLevelCells.off('click');

  //Add new event listeners
  lastDrilldownLevelCells.on('click', function (info) {
    let currentTargetElementValue = $($(info.currentTarget).children('span')[0]).text();
    visApi().setFilterSelectedValues(detailPageFilterGUID, [[currentTargetElementValue]]);
    $('button')[detailPageID].click();
  });
  oldOnContentReady(event);
});
olapTableRender; //эта строчка всегда должна оставаться последней
