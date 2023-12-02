//Parameters
const filterPeriodMinimalValue = 1;
const mainHistogramGUID = 'd959b23022ae4b12bb25e227fb6962be';
const addHistogramGUID = '3d14c443079a4cc8a6b7a2b5762e940f';
const mainSeriesFilterGUID = 'b2e2fec4563a48778b4fc3cb5f9db01d';
const addPeriodFilterGUID = '799f3135b9f5429cbddc2fb318885f21';

//Code block bellow (Do not change)

//Draw on series filter change
visApi().onAllWidgetsLoadedListener(
  {
    guid: mainHistogramGUID + '_AllWidgetsLoaded',
  },
  function () {
    let addHistogramNumberFromAllWidgets;
    visApi()
      .getWidgets()
      .forEach((item, index) => {
        if (item.w.general.renderTo === addHistogramGUID) {
          addHistogramNumberFromAllWidgets = index;
        }
      });

    visApi().onSelectedValuesChangedListener(
      {
        guid: mainSeriesFilterGUID + 'onSelecteValuesChangedListener',
        widgetGuid: mainSeriesFilterGUID,
      },
      function (info) {
        let selectedValues = info.selectedValues;
        let selectedValue;
        let result = [];
        let seriesIndex;
        let addPeriodFilterValue = visApi().getSelectedValues(addPeriodFilterGUID)[0][0];
        let isNeedToUpdateName = false;

        if (!selectedValues || selectedValues.length === 0 || selectedValues[0].length === 0) {
          render(result);
          return;
        }
        selectedValue = selectedValues[0][0];
        seriesIndex = 0;
        w.series.forEach((item, index) => {
          if (item.name.includes(selectedValue)) {
            item.name === selectedValue ? (isNeedToUpdateName = true) : false;
            console.log('isNeedToUpdateName', isNeedToUpdateName);
            console.log('item.name', item.name);
            seriesIndex = index;
          }
        });

        result.push(w.series[seriesIndex]);
        isNeedToUpdateName ? (result[0].name = result[0].name + ' (ТГ)') : result[0].name;

        if (addPeriodFilterValue >= filterPeriodMinimalValue) {
          result.push(
            visApi().getWidgets()[addHistogramNumberFromAllWidgets].w.series[seriesIndex],
          );
          isNeedToUpdateName ? (result[1].name = result[1].name + ' (ПГ)') : result[1].name;
          console.log('counter');
        }
        console.log('result', result);
        render(result);
      },
    );

    //Standart render of histogram
    function render(series) {
      Highcharts.chart({
        chart: w.general,
        xAxis: w.xAxis,
        yAxis: w.yAxis,
        plotOptions: w.plotOptions,
        series: series,
        drilldown: w.drilldown,
        legend: w.legend,
        tooltip: w.tooltip,
      });
    }

    //First time render
    function prepareData() {
      let currentState = visApi().getSelectedValues(mainSeriesFilterGUID)[0][0];
      let seriesIndex = 0;
      let resultStart = [];
      let addPeriodFilterValue = visApi().getSelectedValues(addPeriodFilterGUID)[0][0];
      let isNeedToUpdateName = false;

      w.series.forEach((item, index) => {
        if (item.name.includes(currentState)) {
          isNeedToUpdateName = true;
          seriesIndex = index;
        }
      });

      resultStart.push(w.series[seriesIndex]);
      isNeedToUpdateName
        ? (resultStart[0].name = resultStart[0].name + ' (ТГ)')
        : resultStart[0].name;
      if (addPeriodFilterValue >= filterPeriodMinimalValue) {
        resultStart.push(
          visApi().getWidgets()[addHistogramNumberFromAllWidgets].w.series[seriesIndex],
        );
        isNeedToUpdateName
          ? (resultStart[1].name = resultStart[1].name + ' (ПГ)')
          : resultStart[1].name;
      }
      return resultStart;
    }

    //First timer render call
    render(prepareData());
  },
);

console.log(w);