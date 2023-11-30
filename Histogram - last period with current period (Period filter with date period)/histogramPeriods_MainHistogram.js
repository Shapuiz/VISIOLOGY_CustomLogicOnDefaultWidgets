//Parameters
const mainHistogramGUID = 'd959b23022ae4b12bb25e227fb6962be';
const addHistogramGUID = '3d14c443079a4cc8a6b7a2b5762e940f';
const mainSeriesFilterGUID = 'b2e2fec4563a48778b4fc3cb5f9db01d';
const mainPeriodFilterGUID = '972890be0ea44e26b567b16c132e1ed4';

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
        let isNeedToUpdateName = false;
        let drawSecondSeries = false;
        let addPeriodFilterSelectedValues = visApi().getSelectedValues(mainPeriodFilterGUID);
        addPeriodFilterSelectedValues.length > 0
          ? addPeriodFilterSelectedValues[0].length > 0
            ? (drawSecondSeries = true)
            : (drawSecondSeries = false)
          : (drawSecondSeries = false);

        if (!selectedValues || selectedValues.length === 0 || selectedValues[0].length === 0) {
          render(result);
          return;
        }
        selectedValue = selectedValues[0][0];
        seriesIndex = 0;
        w.series.forEach((item, index) => {
          if (item.name.includes(selectedValue)) {
            item.name === selectedValue ? (isNeedToUpdateName = true) : false;
            seriesIndex = index;
          }
        });

        result.push(w.series[seriesIndex]);
        isNeedToUpdateName ? (result[0].name = result[0].name + ' (ТГ)') : result[0].name;
        if (drawSecondSeries) {
          result.push(
            visApi().getWidgets()[addHistogramNumberFromAllWidgets].w.series[seriesIndex],
          );
          isNeedToUpdateName ? (result[1].name = result[1].name + ' (ПГ)') : result[1].name;
        }
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
      let isNeedToUpdateName = false;
      let drawSecondSeries = false;
      let addPeriodFilterSelectedValues = visApi().getSelectedValues(mainPeriodFilterGUID);
      addPeriodFilterSelectedValues.length > 0
        ? addPeriodFilterSelectedValues[0].length > 0
          ? (drawSecondSeries = true)
          : (drawSecondSeries = false)
        : (drawSecondSeries = false);

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

      if (drawSecondSeries) {
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
