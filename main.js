$(document).ready(function() {
  makeRandBoxes();

  $('#makeBox').click(function(){
    var color = $('#color-picker').val();
    console.log(color);
    $('#boxes').append( makeBox(color) );
  });

  $('#randBox').click(makeRandBoxes);

  $('#boxes').on('click', 'div', boxClicked);

  $('#favorites').click(moveToFavorites);

  $('#clearFavorites').click(clearFavorites);

  function makeBox(color) {
    var $box = $('<div>');
    $box.css('background-color', color);
    return $box;
  }

  function randomColor() {
    var randInt = Math.floor(Math.random() * (0xFFFFFF + 1)).toString(16);
    var padded = '000000' + randInt;
    return '#' + padded.slice(-6);
  }

  function rgbToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  function invertColor(hexTripletColor) {
      var color = hexTripletColor;
      color = color.substring(1);           // remove '#'
      color = parseInt(color, 16);          // convert to integer
      color = 0xFFFFFF ^ color;             // invert three bytes
      color = color.toString(16);           // convert to hex
      color = ("000000" + color).slice(-6); // pad with leading zeros
      color = "#" + color;                  // prepend '#'
      return color;
  }

  function makeRandBoxes() {
    $('#boxes div').remove();
    var newBoxes = [];
    for (var i = 0; i < 10; i++) {
      newBoxes.push( makeBox(randomColor()) );
    }
    $('#boxes').append(newBoxes);
  }

  function boxClicked() {
    //$('.selected').removeClass('selected'); // select only 1 at a time
    $(this).toggleClass('selected');
    var bgColor = rgbToHex( $(this).css('background-color') );
    $(this).css('border-color', invertColor(bgColor));
  }

  function moveToFavorites() {
    var $selected = $('.selected');

    $selected.appendTo($('#favorites'));

    console.log($selected);
    [].forEach.call($selected, function(box) {
      var $box = $(box);
      var bgColor = rgbToHex( $box.css('background-color') );
      $box.css('color', invertColor(bgColor));
      $box.text( bgColor );
    });

    $selected.removeClass('selected');
  }

  function clearFavorites() {
    $('#favorites div').remove();
  }

})
