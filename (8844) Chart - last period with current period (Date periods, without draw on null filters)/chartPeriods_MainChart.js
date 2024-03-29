//Parameters
const addChartGUID = '0a8570d7b83f4419b76542ba4826c33b';
const mainSeriesFilterGUID = 'edd2c24744e148eb981d5ca138b80cc9';
const mainPeriodFilterGUID = 'b36c7848c5c84894b33078205bb66e55';

//Code block bellow (Do not change)
const mainChartGUID = w.general.renderTo;
//Draw on series filter change
visApi().onAllWidgetsLoadedListener(
  {
    guid: mainChartGUID + '_AllWidgetsLoaded',
  },
  function () {
    //Check main chart on list
    if (visApi().getWidgetByGuid(mainChartGUID) !== undefined) {
      let addChartNumberFromAllWidgets;
      visApi()
        .getWidgets()
        .forEach((item, index) => {
          if (item.w.general.renderTo === addChartGUID) {
            addChartNumberFromAllWidgets = index;
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
              seriesIndex = index;
            }
          });
          if (drawSecondSeries) {
            result.push(w.series[seriesIndex]);
            result.push(visApi().getWidgets()[addChartNumberFromAllWidgets].w.series[seriesIndex]);
          }
          render(result);
        },
      );

      //Standart render of chart
      function render(series) {
        let xAxisDeepClone = structuredClone(w.xAxis);
        xAxisDeepClone.categories = [
          ...new Set(
            xAxisDeepClone.categories.concat(
              visApi().getWidgetByGuid(addChartGUID).w.xAxis.categories,
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
        let drawSecondSeries = false;
        let addPeriodFilterSelectedValues = visApi().getSelectedValues(mainPeriodFilterGUID);
        addPeriodFilterSelectedValues.length > 0
          ? addPeriodFilterSelectedValues[0].length > 0
            ? (drawSecondSeries = true)
            : (drawSecondSeries = false)
          : (drawSecondSeries = false);

        w.series.forEach((item, index) => {
          if (item.name.includes(currentState)) {
            seriesIndex = index;
          }
        });

        if (drawSecondSeries) {
          resultStart.push(w.series[seriesIndex]);
          resultStart.push(
            visApi().getWidgets()[addChartNumberFromAllWidgets].w.series[seriesIndex],
          );
        }
        return resultStart;
      }

      //First timer render call
      render(prepareData());
    }
  },
);
