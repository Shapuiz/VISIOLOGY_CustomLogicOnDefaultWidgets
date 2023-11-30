//Parameters
const mainPeriodFilterGUID = '972890be0ea44e26b567b16c132e1ed4';
const addPeriodFilterGUID = '3b8ea07dca53457baf4a3619e1ea64dd';

//Code block bellow (Do not change)
visApi().onSelectedValuesChangedListener(
  {
    guid: mainPeriodFilterGUID + '_onSelectedValuesChangedListener',
    widgetGuid: mainPeriodFilterGUID,
  },
  function (info) {
    let valuesToInsert = [
      new Date(convertDateSubOneYear(info.selectedValues[0][0])),
      new Date(convertDateSubOneYear(info.selectedValues[0][1])),
    ];
    let isBlackMainPeriodFilter = info.selectedValues[0].length ? true : false;
    isBlackMainPeriodFilter
      ? visApi().setDateFilterSelectedValues(addPeriodFilterGUID, valuesToInsert)
      : visApi().setDateFilterSelectedValues(addPeriodFilterGUID, []);

    //Function for data convert
    function convertDateSubOneYear(stringDate) {
      let date = new Date(stringDate),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [date.getFullYear() - 1, mnth, day].join('-');
    }
  },
);

//Default render
DateFilterRender({ filter: w.general, textStyle: w.textStyle, data: w.data });
