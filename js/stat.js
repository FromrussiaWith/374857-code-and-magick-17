'use strict';

var CLOUD_WIDTH = 420; //ширина облака
var CLOUD_HEIGHT = 270; //высота облака
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10; //смещение
var FONT_GAP = 16; //высота шрифта
var margin = 20; //отступы
var BAR_HEIGHT = 150; //высота гистограммы
var BAR_WIDTH = 40; // ширина колонки
var indent = 90; // отступ между колонками

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = "16pt PT Mono";
  ctx.fillText("Ура вы победили!", CLOUD_X + margin, CLOUD_Y + margin + GAP);
  ctx.fillText("Список результатов: ", CLOUD_X + margin, CLOUD_Y + FONT_GAP + GAP + margin);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(CLOUD_X + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i, CLOUD_Y + GAP);
    ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_HEIGHT) * i, CLOUD_Y + GAP, (barWidth * times[i]) / maxTime, BAR_WIDTH);
  };

  function drawHistogram(arrayTimes, arrayNames) {

    var step = BAR_HEIGHT / (getMaxValue(times) - 0);
    var startX = CLOUD_X + margin;
    var startY = CLOUD_Y + BAR_HEIGHT + margin + GAP + indent ;

    for (var i = 0; i < arrayTimes.length; i++) {
        var barHeight = arrayTimes[i] * step;
        var getY = startY - arrayTimes[i] * step;
        var getX = startX + indent * i;

        ctx.fillStyle = fillBarColor(names[i]);
        ctx.fillRect(getX, getY, BAR_WIDTH, barHeight);

        ctx.fillText(arrayNames[i], getX, startY + margin);
        ctx.fillText(arrayTimes[i].toFixed(0), getX, getY - GAP);
      }
    }
  };
