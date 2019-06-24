'use strict';

var CLOUD_WIDTH = 420; //ширина облака
var CLOUD_HEIGHT = 270; //высота облака
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10; //смещение
var FONT_GAP = 16; //высота шрифта
var MARGIN = 20; //отступы
var BAR_HEIGHT = 150; //высота гистограммы
var BAR_WIDTH = 40; // ширина колонки
var INDENT = 90; // отступ между колонками

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = "16pt PT Mono";
  ctx.fillText("Ура вы победили!", CLOUD_X + MARGIN, CLOUD_Y + MARGIN + GAP);
  ctx.fillText("Список результатов: ", CLOUD_X + MARGIN, CLOUD_Y + FONT_GAP + GAP + MARGIN);

  //Рисуем гистограмму
  function drawHistogram(arrayTimes, arrayNames) {

    var step = BAR_HEIGHT / (getMaxValue(times) - 0);
    var startX = CLOUD_X + 2 * MARGIN;
    var startY = CLOUD_Y + BAR_HEIGHT + MARGIN * 3 + GAP * 2;

    for (var i = 0; i < arrayTimes.length; i++) {
        var barHeight = arrayTimes[i] * step;
        var newY = startY - arrayTimes[i] * step;
        var newX = startX + INDENT * i;

        ctx.fillStyle = fillBarColor(names[i]);
        ctx.fillRect(newX, newY, BAR_WIDTH, barHeight);

        ctx.fillStyle = '#000';
        ctx.fillText(arrayNames[i], newX, startY + MARGIN);
        ctx.fillText(arrayTimes[i].toFixed(0), newX, newY - GAP);
      }
    }
  drawHistogram(times, names);

  // Вспомогательные функции
  // Ищем наихудший результат
  function getMaxValue(array) {
    var maxElement = array[0];

    for (var i = 0; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }

    return maxElement;
  }

  // Вычисляем цвет в зависимости от имени игрока
  function fillBarColor(namePlayer) {
    var randomOpacity = Math.random().toFixed(2);
    if (namePlayer === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';
    }
  }
};
