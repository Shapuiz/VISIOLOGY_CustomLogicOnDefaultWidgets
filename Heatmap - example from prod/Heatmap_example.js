//Параметры
const mainSeriesFilterGUID = '6a37a8eb035a4fdba63bc09119edd9af';
const valueTypeFilterGUID = '0a3e85f480de4c3fb74fda152e06b973';

//Code block bellow (do not change)
const [yData, xData] = w.data.rows.reduce(
  (acc, item) => {
    acc[0].push(item[0]);
    acc[1].push(item[1]);
    return acc;
  },
  [[], []],
);

let zData = w.data.values[0];

const uniqueX = [...new Set(xData)];
const uniqueY = [...new Set(yData)];

function getInitialZData() {
  let currentWidgetValue = visApi().getSelectedValues(mainSeriesFilterGUID);
  let isValidData =
    currentWidgetValue && currentWidgetValue.length > 0 ? currentWidgetValue.length : -1;
  if (isValidData === -1) {
    return;
  }
  currentWidgetValue = currentWidgetValue[0][0];
  const currentIdex = w.data.cols.findIndex((col) => col[0] === currentWidgetValue);
  zData = w.data.values[currentIdex];
}
setTimeout(() => getInitialZData(), 100);

//Отрисовка при изменении показателя
visApi().onSelectedValuesChangedListener(
  {
    guid: mainSeriesFilterGUID + w.general.renderTo + '_onSelectedValuesChangedListener',
    widgetGuid: mainSeriesFilterGUID,
  },
  function () {
    renderHeatMap();
  },
);

//Отрисовка при изменении разрядности в фильтре
visApi().onSelectedValuesChangedListener(
  {
    guid: valueTypeFilterGUID + w.general.renderTo + '_onSelectedValuesChangedListener',
    widgetGuid: valueTypeFilterGUID,
  },
  function () {
    renderHeatMap();
  },
);

//Чистая отрисовка
visApi().onWidgetLoadedListener(
  {
    widgetGuid: valueTypeFilterGUID,
    guid: w.general.renderTo + 'onWidgetLoadedListenerValueTypeFilterGUID',
  },
  function () {
    visApi().onWidgetLoadedListener(
      {
        widgetGuid: mainSeriesFilterGUID,
        guid: w.general.renderTo + 'onWidgetLoadedListenerMainSeriesFilterGUID',
      },
      function () {
        renderHeatMap();
      },
    );
  },
);

function renderHeatMap() {
  let currentWidgetValue = visApi().getSelectedValues(mainSeriesFilterGUID)[0][0];
  let currentTypeValue = visApi().getSelectedValues(valueTypeFilterGUID)[0][0];
  const currentIdex = w.data.cols.findIndex((col) => col[0] === currentWidgetValue);
  zData = w.data.values[currentIdex];
  console.warn(zData);
  let heatmapData = xData.map((xVal, index) => [
    uniqueX.indexOf(xVal),
    uniqueY.indexOf(yData[index]),
    zData[index],
  ]);

  //Подсчет итогов
  let columnResults = [];
  heatmapData.forEach((point) => {
    if (!columnResults[point[0]]) {
      columnResults[point[0]] = 0;
    }
    columnResults[point[0]] += point[2];
  });

  let rowResultsArray = uniqueY.reduce((acc, row) => {
    acc[row] = 0;
    return acc;
  }, {});

  heatmapData.forEach((point) => {
    let rowName = uniqueY[point[1]]; // Получаем название дня недели из uniqueY
    rowResultsArray[rowName] += point[2];
  });

  let totalResult = 0;
  if (currentWidgetValue !== 'Средний чек') {
    totalResult = Object.values(rowResultsArray).reduce((acc, value) => acc + value);
    switch (currentTypeValue) {
      case 'Тысячи':
        totalResult = (totalResult / 1000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        break;
      case 'Миллионы':
        totalResult = (totalResult / 1000000).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        break;
      default:
        totalResult = totalResult.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        break;
    }
  } else {
    totalResult = (
      Object.values(rowResultsArray).reduce((acc, value) => acc + value, 0) /
      (uniqueX.length * uniqueY.length)
    )
      .toFixed(1)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  let rowResultsArrayArray = uniqueY.map((row) => rowResultsArray[row]);

  //############################################# Отрисовка тепловой карты

  Highcharts.chart({
    legend: {
      enabled: false, // Отключаем отображение легенды
    },
    chart: {
      type: 'heatmap',
      renderTo: w.general.renderTo,
      marginTop: 35,
      marginBottom: 65,
      plotBorderWidth: 1,
    },
    xAxis: [
      {
        // Основная ось X для времени
        categories: uniqueX,
        opposite: true,
      },
      {
        // Дополнительная ось X для сумм
        linkedTo: 0,
        opposite: false,
        useHTML: true, // Включаем HTML для стилизации
        labels: {
          rotation: 315,
          formatter: function () {
            let valueToReturn = 0;
            if (currentWidgetValue !== 'Средний чек') {
              valueToReturn = columnResults[this.value];
              switch (currentTypeValue) {
                case 'Тысячи':
                  valueToReturn = (valueToReturn / 1000)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
                case 'Миллионы':
                  valueToReturn = (valueToReturn / 1000000)
                    .toFixed(3)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
                default:
                  valueToReturn = valueToReturn.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
              }
            } else {
              valueToReturn = (columnResults[this.value] / uniqueY.length)
                .toFixed(1)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
            return valueToReturn;
          },
          style: {
            fontSize: '8.5pt',
          },
        },
      },
    ],

    yAxis: [
      {
        // Основная ось Y для дней недели
        categories: uniqueY,
        title: {
          text: 'Д/Ч', // Заголовок для оси Y
          rotation: 0, // Убедитесь, что текст не повернут
          align: 'high', // Выравнивание текста
          offset: 0, // Смещение от оси
          x: -6, // Смещение по горизонтали (подберите подходящее значение)
          y: -15,
        },
        reversed: true,
      },
      {
        // Дополнительная ось Y для сумм
        linkedTo: 0,
        opposite: true,
        title: {
          text: '<b>' + totalResult + '</b>', // Заголовок для оси Y
          rotation: 0, // Убедитесь, что текст не повернут
          align: 'high', // Выравнивание текста
          offset: 0, // Смещение от оси
          x: 3, // Смещение по горизонтали (подберите подходящее значение)
          y: -15,
          style: {
            fontWeight: 'bold', // Делаем текст заголовка жирным
            fontSize: '9.5pt',
            textOutline: 'none',
          },
        },
        labels: {
          formatter: function () {
            let valueToReturn = 0;
            if (currentWidgetValue !== 'Средний чек') {
              valueToReturn = rowResultsArrayArray[this.value];
              switch (currentTypeValue) {
                case 'Тысячи':
                  valueToReturn = (valueToReturn / 1000)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
                case 'Миллионы':
                  valueToReturn = (valueToReturn / 1000000)
                    .toFixed(3)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
                default:
                  valueToReturn = valueToReturn.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
              }
            } else {
              valueToReturn = (rowResultsArrayArray[this.value] / uniqueX.length)
                .toFixed(1)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
            return valueToReturn;
          },
          style: {
            fontSize: '8.5pt',
          },
        },
      },
    ],

    accessibility: {},

    colorAxis: {
      min: null,
      maxColor: '#98FF98', //'#00ff55',//'#00ff7f',
      minColor: '#cc0605', //'#A52019',//'#cc0605',
    },
    series: [
      {
        name: 'Продажи СТиУ в разрезе времени',
        tooltip: {
          pointFormatter: function () {
            let xThisPointText = uniqueX[this.options.x];
            let yThisPointText = uniqueY[this.options.y];
            let thisPointValue = this.options.value;
            if (currentWidgetValue !== 'Средний чек') {
              switch (currentTypeValue) {
                case 'Тысячи':
                  thisPointValue = (thisPointValue / 1000)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
                case 'Миллионы':
                  thisPointValue = (thisPointValue / 1000000)
                    .toFixed(3)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
                default:
                  thisPointValue = thisPointValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
              }
              return xThisPointText + ', ' + yThisPointText + ': ' + thisPointValue;
            } else {
              return (
                xThisPointText +
                ', ' +
                yThisPointText +
                ': ' +
                thisPointValue.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              );
            }
          },
        },
        borderWidth: 0.25,
        borderColor: 'black',
        data: heatmapData,
        dataLabels: {
          formatter: function () {
            let currentPointValue = this.point.value;
            if (currentWidgetValue !== 'Средний чек') {
              switch (currentTypeValue) {
                case 'Тысячи':
                  currentPointValue = (currentPointValue / 1000)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
                case 'Миллионы':
                  currentPointValue = (currentPointValue / 1000000)
                    .toFixed(3)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
                default:
                  currentPointValue = currentPointValue
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                  break;
              }
              return currentPointValue;
            } else {
              return currentPointValue.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
          },
          enabled: true,
          color: '#000000',
          style: {
            textOutline: 'none',
            fontWeight: 'none',
            fontSize: '7.5pt',
          },
        },
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            yAxis: {
              labels: {
                format: '{substr value 0 1}',
              },
            },
          },
        },
      ],
    },
  });
}

console.warn('heatMapW', w);
