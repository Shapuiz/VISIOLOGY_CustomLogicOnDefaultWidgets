//Parameters
const mainHistogramGUID = 'd959b23022ae4b12bb25e227fb6962be';

//Code block bellow (Do not change)
visApi()
  .getWidgetDataByGuid(mainHistogramGUID)
  .then((data) => {
    let values = data.data.cols.map((item) => ({ text: item[0], id: item[0] }));
    w.data.data = values;
    FilterRender({ filter: w.general, style: w.style, textStyle: w.textStyle, data: w.data });
  });
