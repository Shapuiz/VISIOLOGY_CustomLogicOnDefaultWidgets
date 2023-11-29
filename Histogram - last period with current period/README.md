<h3>Описание/Description:</h3></br>
<div style="padding-left: 10px">
RUS: Данный виджет добавляет на виджет гистограммы еще один столбец который показывает предыдущий период.</br>
ENG: This widget adds another column to the histogram widget that shows the previous period.</br>
</div>
<h3>Инструкция/Instruction:</h3>
![image](https://github.com/Shapuiz/VISIOLOGY_CustomLogicOnDefaultWidgets/assets/116454253/7b29b1fc-54fa-4c70-82e8-7930ac76f126)
</br>
<div style="padding-left: 10px">
RUS:</br>
1. Необходимо добавить на дашборд все элементы:</br>
<div style="padding-left: 25px">
1.1 Гистограмму</br>
1.2 Фильтр по сериям</br>
1.3 Фильтр по периоду</br>
1.4 Дополнительную гистограмму</br>
1.5 Дополнительный фильтр по периоду</br>
</div>
Элементы 1.4 и 1.5 должны быть точными копиями элементов 1.1 и 1.2</br>
2. Добавить во все элементы соответствующий им код из файлов:</br>
<div style="padding-left: 25px">
1.1 => histogramPeriods_MainHistogram.js</br>
1.2 => histogramPeriods_MainFilterWithSeries.js</br>
1.3 => histogramPeriods_MainFilterWithPeriod.js</br>
1.4 => histogramPeriods_AdditionalHistogram.js</br>
1.5 => histogramPeriods_AdditionalFilterWithPeriod.js</br>
</div>
И заполнить параметры, где
<div style="padding-left: 25px">
filterPeriodMinimalValue - Число, равное минимальному значению в фильтре периода (Основного)<br>
mainHistogramGUID - Строка, GUID основной гистограммы (Куда добавляется столбец)<br>
addHistogramGUID = Строка, GUID дополнительной гистограммы (Копия из которой забирается столбец)<br>
mainSeriesFilterGUID = Строка, GUID основного фильтра с сериями<br>
addPeriodFilterGUID = Строка, GUID дополнительного фильтра с периодом<br>
mainPeriodFilterGUID = Строка, GUID основного фильтра с периодом<br>
</div>
3.Сохранить дашборд.</br>
</br>
ВНИМАНИЕ! Данный функционал будет работать только если в фильтре по периоду содержится числовое значение (Например: [2019, 2020] или [1,2])
</div>
</br>
<div style="padding-left: 10px">
ENG:</br>
1. You need to add all the elements to the dashboard:</br>
<div style="padding-left: 25px">
1.1 Histogram</br>
1.2 Filter by series</br>
1.3 Filter by period</br>
1.4 Additional histogram</br>
1.5 Additional filter by period</br>
</div>
Elements 1.4 and 1.5 must be exact copies of elements 1.1 and 1.2</br>
2. Add the corresponding code from the files to all the elements:</br>
<div style="padding-left: 25px">
1.1 => histogramPeriods_MainHistogram.js</br>
1.2 => histogramPeriods_Main Filter With Series.js</br>
1.3 => histogramPeriods_Main Filter With Period.js</br>
1.4 => histogramPeriods_AdditionalHistogram.js</br>
1.5 => histogramPeriods_AdditionalFilterWithPeriod.js</br>
</div>
And fill in the parameters where
<div style="padding-left: 25px">
filterPeriodMinimalValue - A number equal to the minimum value in the filter of the period (Main)<br>
mainHistogramGUID - String, GUID of the main histogram (Where the column is added)<br>
addHistogramGUID = String, GUID of the additional histogram (A copy from which the column is taken)<br>
mainSeriesFilterGUID = String, GUID of the main filter with addPeriodFilterGUID series<br>
addPeriodFilterGUID = String, GUID of an additional filter with the period<br>
mainPeriodFilterGUID = String, GUID of the main filter with a period<br>
</div>
3. Save the dashboard.</br>
</br>
Attention! This functionality will only work if the period filter contains a numeric value (for example: [2019, 2020] or [1,2])
</div>
</br>

