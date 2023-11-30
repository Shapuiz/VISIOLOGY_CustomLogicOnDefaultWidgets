<h3>Описание/Description:</h3></br>
RUS: Данный виджет добавляет гистограмму в ячейки таблицы, основываясь на максимальном значении столбца.</br>
ENG: This widget adds a histogram to the table cells based on the maximum value of the column.</br>
<h3>Инструкция/Instruction:</h3></br>
RUS:</br>
Инструкция по настройке гистограммы для виджета плоской таблицы:</br>
1.Добавить виджет "Плоская таблица" на дашборд</br>
2.Добавить для каждого столбца с данными, на котором будет отрисована гистограмма, виджет "Текст"</br>
3.Настроить виджеты "Текст" следующим образом:</br>
3.1 В параметр "Настройки" -> "Настройка текста" -> "Текст" записать значение = @value</br>
3.2 В параметр "Привязка данных" выбрать источник данных аналогичный плоской таблице, анологичную группу показателей и добавить "Расчетный показатель", который будет вычислять максимальное значение из доступных для столбца с гистограммой (Функция агрегирования "Max" и выбрать необходимый показатель)</br>
4.Скопировать весь код в код виджета "Плоская таблица"</br>
5.Подставить нужные параметры в блоке "Parameters", где:</br>
5.1 tableColumnsToDraw - Массив столбцов, для которых будет отрисована гистограмма. Начинается с нуля</br>
5.2 maximumValuesTextWidgetGUIDs - Массив из GUIDов виджетов "Текст", порядок заполнения должен быть равен порядку столбцов в параметре tableColumnsToDraw</br>
5.3 histogramColour - Массив цветов гистограмм, порядок заполнения должен быть равен порядку столбцов в параметре tableColumnsToDraw (HEX)</br>
5.4 maxHistogramWidth - Максимальная длинная гистограммы (Значение от 1 до 100). Равно процентному соотношению от максимальной ширины ячейки.</br>
5.5 minimalHistogramWidth - Минимальная длинная гистограммы, указывается число. Данному числу будет равен минимальный размер гистограммы в px</br>
</br>
ENG:</br>
Instructions for setting up a histogram for a flat table widget:</br>
1.Add the "Flat Table" widget to the dashboard</br>
2.Add a "Text" widget for each column with data on which the histogram will be drawn</br>
3.Configure the "Text" widgets as follows:</br>
3.1 In the "Settings" -> "Text Settings" -> "Text" parameter, write the value = @value</br>
3.2 In the "Data binding" parameter, select a data source similar to a flat table, anological group of indicators and add a "Calculated indicator" that will calculate the maximum value available for a column with a histogram. (Aggregation function "Max" and select the required indicator)</br>
4.Copy the entire code into the code of the "Flat Table" widget</br>
5.Substitute the necessary parameters in the "Parameters" block, where:</br>
5.1 tableColumnsToDraw - This is an array of columns for which a histogram will be drawn. It starts from scratch</br>
5.2 maximumValuesTextWidgetGUIDs - This is an array of "Text" widget GUIDs, the order of filling should be equal to the order of columns in the tableColumnsToDraw parameter</br>
5.3 histogramColour - Array of histogram colors, the order of filling should be equal to the order of columns in the tableColumnsToDraw (HEX) parameter</br>
5.4 maxHistogramWidth - Maximum histogram length (Value from 1 to 100). Is equal to the percentage of the maximum width of the cell</br>
5.5 minimalHistogramWidth - The minimum length of the histogram, a number is specified. This number will be equal to the minimum size of the histogram in px</br>
<br>
