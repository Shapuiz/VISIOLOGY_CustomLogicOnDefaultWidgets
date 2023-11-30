<h3>Описание/Description:</h3></br>
RUS: Данный виджет добавляет на виджет гистограммы еще один столбец который показывает предыдущий период (Фильтры обычные,целое число).</br>
ENG: This widget adds another column to the histogram widget that shows the previous period (Normal filters, integer).</br>
<h3>Инструкция/Instruction:</h3>

![image](https://github.com/Shapuiz/VISIOLOGY_CustomLogicOnDefaultWidgets/assets/116454253/71d8d9d2-4275-4c96-92a9-1fe275b8b504)

RUS:</br>

1. Необходимо добавить на дашборд все элементы:</br>
   1.1 Гистограмму</br>
   1.2 Фильтр по сериям</br>
   1.3 Фильтр по периоду</br>
   1.4 Дополнительную гистограмму</br>
   1.5 Дополнительный фильтр по периоду</br>
   Элементы 1.4 и 1.5 должны быть точными копиями элементов 1.1 и 1.2</br>
2. Добавить во все элементы соответствующий им код из файлов:</br>
   1.1 => histogramPeriods_MainHistogram.js</br>
   1.2 => histogramPeriods_MainFilterWithSeries.js</br>
   1.3 => histogramPeriods_MainFilterWithPeriod.js</br>
   1.4 => histogramPeriods_AdditionalHistogram.js</br>
   1.5 => histogramPeriods_AdditionalFilterWithPeriod.js</br>
   И заполнить параметры, где
   filterPeriodMinimalValue - Число, равное минимальному значению в фильтре периода (Основного)<br>
   mainHistogramGUID - Строка, GUID основной гистограммы (Куда добавляется столбец)<br>
   addHistogramGUID = Строка, GUID дополнительной гистограммы (Копия из которой забирается столбец)<br>
   mainSeriesFilterGUID = Строка, GUID основного фильтра с сериями<br>
   addPeriodFilterGUID = Строка, GUID дополнительного фильтра с периодом<br>
   mainPeriodFilterGUID = Строка, GUID основного фильтра с периодом<br>
   3.Сохранить дашборд.</br>
   </br>
   ВНИМАНИЕ!
   1.Данный функционал будет работать только если в фильтре по периоду содержится числовое значение (Например: [2019, 2020] или [1,2])
   2.В текущей версии нельзя иметь одинаковые наименования показателей, например:</br>
   ['Чеки','Чеки Дыбенко','Чеки Янино'] - Не будет работать</br>
   ['Чеки Все','Чеки Дыбенко','Чеки Янино'] - Будет работать</br>
   3.В данном кейсе фильтр по сериям является кастомным фильтром, фильтр по периоду (Основной и соответственно копия) настраиваются через стандартный функционал "Влияет на..."
   </br>
   ENG:</br>
3. You need to add all the elements to the dashboard:</br>
   1.1 Histogram</br>
   1.2 Filter by series</br>
   1.3 Filter by period</br>
   1.4 Additional histogram</br>
   1.5 Additional filter by period</br>
   Elements 1.4 and 1.5 must be exact copies of elements 1.1 and 1.2</br>
4. Add the corresponding code from the files to all the elements:</br>
   1.1 => histogramPeriods_MainHistogram.js</br>
   1.2 => histogramPeriods_Main Filter With Series.js</br>
   1.3 => histogramPeriods_Main Filter With Period.js</br>
   1.4 => histogramPeriods_AdditionalHistogram.js</br>
   1.5 => histogramPeriods_AdditionalFilterWithPeriod.js</br>
   And fill in the parameters where
   filterPeriodMinimalValue - A number equal to the minimum value in the filter of the period (Main)<br>
   mainHistogramGUID - String, GUID of the main histogram (Where the column is added)<br>
   addHistogramGUID = String, GUID of the additional histogram (A copy from which the column is taken)<br>
   mainSeriesFilterGUID = String, GUID of the main filter with addPeriodFilterGUID series<br>
   addPeriodFilterGUID = String, GUID of an additional filter with the period<br>
   mainPeriodFilterGUID = String, GUID of the main filter with a period<br>
5. Save the dashboard.</br>
   </br>
   Attention!
   1.This functionality will only work if the period filter contains a numeric value (for example: [2019, 2020] or [1,2])
   2.In the current version, it is impossible to have the same names of indicators, for example:<br>
   ['Checks','Checks Dybenko','Checks Yanino'] - Will not work</br>
   ['All Checks','Dybenko Checks','Yanino Checks'] - Will work</br>
   3.In this case, the filter by series is a custom filter, the filter by period (the Main one and, accordingly, a copy) are configured through the standard functionality "Affects ..."
   </br>
