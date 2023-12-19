//Parameters
const mainPeriodFilterGUID = 'b36c7848c5c84894b33078205bb66e55';
const addPeriodFilterGUID = 'ef4471486a644f1881db18fdb3332739';

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
      console.log('stringDate', stringDate);
      let date = new Date(stringDate);
      let newDate = new Date(date.setDate(date.getDate() - 7));
      let mnth = ('0' + (newDate.getMonth() + 1)).slice(-2);
      let day = ('0' + newDate.getDate()).slice(-2);
      return [newDate.getFullYear(), mnth, day].join('-');
    }
  },
);

//Default render
DateFilterRender({ filter: w.general, textStyle: w.textStyle, data: w.data });
