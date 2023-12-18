//Parameters
const mainHistogramGUID = '3ea6c96a876a4c40afb97e743f05148b';

//Code block bellow (Do not change)
visApi()
  .getWidgetDataByGuid(mainHistogramGUID)
  .then((data) => {
    let values = data.data.cols.map((item) => ({ text: item[0], id: item[0] }));
    w.data.data = values;
    FilterRender({ filter: w.general, style: w.style, textStyle: w.textStyle, data: w.data });
  });
