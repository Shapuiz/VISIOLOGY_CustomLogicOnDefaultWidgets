//############################## Custom detalization page by double click on last drilldown level element ##############################
//Parameters:
const mainTableGUID = '0661ceb0deec4e7ba60ef703f9697c08'; //The GUID of the widget with the main table
const detailPageID = 1; //The number of the detail page. Starts from 0
const detailPageFilterGUID = '2ed48402e64b4f1c88eab04f50999efa'; //

//Code block bellow (Do not change)!
$('div [id="' + mainTableGUID + '"]').click(function () {
  let lastDrilldownLevelCells = $('div [id="' + mainTableGUID + '"]')
    .find('.dx-last-cell')
    .not('.dx-pivotgrid-collapsed');

  //Remove old event listeners
  lastDrilldownLevelCells.off('click');

  //Add new event listeners
  lastDrilldownLevelCells.on('click', function (info) {
    let currentTargetElementValue = $(info.currentTarget).children('span')[0].innerHTML;
    visApi().setFilterSelectedValues(detailPageFilterGUID, [[currentTargetElementValue]]);
    $('button')[detailPageID].click();
    console.log(clickedElementValue.innerTEXT);
  });
});
