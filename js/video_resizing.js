(function($) {
  var $myIFRAME   = $(".iframe-video"),
      ogWidth     = 800,
      ogHeight    = 450,
      ogRatio     = ogWidth / ogHeight,
      windowWidth = 0,//store windowWidth here, this is just a different way to store this data
      resizeTimer = null;

  function setIFrameSize() {
      if (windowWidth < 480) {

          var parentDivWidth = $myIFRAME.parent().width(),//be aware this will still only get the height of the first element in this set of elements, you'll have to loop over them if you want to support more than one iframe on a page
              newHeight      = (parentDivWidth / ogRatio);

          $myIFRAME.addClass("iframe-class-resize").css({ height : newHeight, width : parentDivWidth });
      } else {
          $myIFRAME.removeClass("iframe-class-resize").css({ width : '', height : '' });
      }
  }

  setIFrameSize();

  $(window).resize(function () {

      //only run this once per resize event, if a user drags the window to a different size, this will wait until they finish, then run the resize function
      //this way you don't blow up someone's browser with your resize function running hundreds of times a second
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
          //make sure to update windowWidth before calling resize function
          windowWidth = $(window).width();

          setIFrameSize();

      }, 75);

  });
})(jQuery)