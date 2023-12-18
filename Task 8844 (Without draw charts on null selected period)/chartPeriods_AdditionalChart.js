//Parameters
const mainSeriesFilterGUID = 'edd2c24744e148eb981d5ca138b80cc9';

//Code block bellow (Do not change)
visApi().onSelectedValuesChangedListener(
  {
    guid: mainSeriesFilterGUID + '_onSelectedValuesChangedListener',
    widgetGuid: mainSeriesFilterGUID,
  },
  function (info) {
    let selectedValues = info.selectedValues;
    let result = [];
    let selectedValue;
    let seriesIndex;

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
    render(result);
  },
);

//Standart render of chart
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
  let seriesIndex;
  w.series.forEach((item, index) => {
    if (item.name.includes(currentState)) {
      seriesIndex = index;
    }
  });
  let resultStart = [];
  resultStart.push(w.series[seriesIndex]);
  return resultStart;
}

//First timer render call
render(prepareData());
