//Parameters
const mainPeriodFilterGUID = '7a324fcaa0054c03bdd621d54137418d';
const addPeriodFilterGUID = '799f3135b9f5429cbddc2fb318885f21';

//Code block bellow (Do not change)
visApi().onSelectedValuesChangedListener(
  {
    guid: mainPeriodFilterGUID + '_onSelectedValuesChangedListener',
    widgetGuid: mainPeriodFilterGUID,
  },
  function (info) {
    visApi().setFilterSelectedValues(addPeriodFilterGUID, [
      [(parseInt(info.selectedValues[0][0]) - 1).toString()],
    ]);
  },
);

//Default render
FilterRender({ filter: w.general, style: w.style, textStyle: w.textStyle, data: w.data });
