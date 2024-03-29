//Parameters
const filterPeriodMinimalValue = 1;
const addHistogramGUID = '3d14c443079a4cc8a6b7a2b5762e940f';
const mainSeriesFilterGUID = 'b2e2fec4563a48778b4fc3cb5f9db01d';
const addPeriodFilterGUID = '799f3135b9f5429cbddc2fb318885f21';

//Code block bellow (Do not change)
const mainHistogramGUID = w.general.renderTo;
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
        if (!selectedValues || selectedValues.length === 0 || selectedValues[0].length === 0) {
          render(result);
          return;
        }
        selectedValue = selectedValues[0][0];
        seriesIndex = 0;
        w.series.forEach((item, index) => {
          if (item.name.includes(selectedValue)) {
            seriesIndex = index;
          }
        });
        result.push(w.series[seriesIndex]);
        if (addPeriodFilterValue >= filterPeriodMinimalValue) {
          result.push(
            visApi().getWidgets()[addHistogramNumberFromAllWidgets].w.series[seriesIndex],
          );
        }
        render(result);
      },
    );

    //Standart render of histogram
    function render(series) {
      let xAxisDeepClone = structuredClone(w.xAxis);
      xAxisDeepClone.categories = [
        ...new Set(
          xAxisDeepClone.categories.concat(
            visApi().getWidgetByGuid(addHistogramGUID).w.xAxis.categories,
          ),
        ),
      ].sort();

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
      w.series.forEach((item, index) => {
        if (item.name.includes(currentState)) {
          seriesIndex = index;
        }
      });
      resultStart.push(w.series[seriesIndex]);
      if (addPeriodFilterValue >= filterPeriodMinimalValue) {
        resultStart.push(
          visApi().getWidgets()[addHistogramNumberFromAllWidgets].w.series[seriesIndex],
        );
      }
      return resultStart;
    }

    //First timer render call
    render(prepareData());
  },
);

console.log(w);
