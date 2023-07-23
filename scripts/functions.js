$(document).ready(function () {

  /* VARIABLES */

  var winwidth = $(window).width();
  var winheight = $(window).height();
  var bodyheight = $("body").height();
  var headerheight = $(".hdrcontain").height();
  var footerheight = $(".footer").height();

  var contentheight = $(".subcontent").height();
  var midpoint = winheight / 2 - headerheight;
  var botpoint = winheight - headerheight;
  var tempheight = winheight - headerheight - footerheight;

  var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
  var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
  var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());

  /* LOGO */

  logohover = $(".logohover");
  logohover.hide();

  $(".logo").hover(function () {
    $(document).bind("mousemove", function (e) {
      logohover.offset({
        top: e.pageY - (logohover.outerHeight() + 20),
        left: e.pageX - (logohover.outerWidth() / 2)
      });
    });
    logohover.animate({ opacity: "show" }, { duration: 800, easing: 'easeInExpo' });
  }, function () {
    logohover.animate({ opacity: "hide" }, { duration: 800, easing: 'easeOutExpo' });
    $(document).unbind("mousemove");
  });

  /* MENU */

  var menuheight = null;
  $(window).load(function () {
    $(".menuopen").delay(1400).animate({ opacity: "show" }, { duration: 300 });
    $(".menuopen").click(function () {
      menuheight = 82 + $(".menu").outerHeight();
      $(".menuopen").delay(100).animate({ opacity: "hide" }, { duration: 100 });
      $(".menuclose").delay(200).animate({ opacity: "show" }, { duration: 100 });
      $(".hdrcontain").animate({ height: menuheight }, { duration: 200 });
    });
    $(".menuclose").click(function () {
      $(".menuclose").delay(100).animate({ opacity: "hide" }, { duration: 100 });
      $(".menuopen").delay(200).animate({ opacity: "show" }, { duration: 100 });
      $(".hdrcontain").animate({ height: 82 }, { duration: 200 });
    });
  });

  $(".colourstrip").html("<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>");

  /* FORMS */

  $("textarea, input").addClass("field");
  $("textarea, input").click(function () {
    if ($(this).hasClass("field")) {
      $(this).attr({ value: "" });
      $(this).removeClass("field");
    }
  });

  $("#submit").click(function () {
    $("#form").submit();
  });

  /* FOOTER */

  var footerfixed = false;

  if (winheight > bodyheight) {
    $(".footer").css({ position: "fixed", bottom: "0" });
    footerfixed = true;
  }

  $("#year").text((new Date).getFullYear());

  $(".backtop").click(function () {
    $("html, body").scrollTop(0);
  });

  /* NEWS */

  var curnewsitemset = $(".newsitemset:first-child");
  var newsmasterheight = curnewsitemset.height();
  var numnewsitemsets = $(".newsmaster").children().length;
  var numnewsitemsetpos = null;

  $(".newsmaster").css({ height: 50 });

  if (numnewsitemsets > 1) {
    for (i = 0; i < numnewsitemsets; i++) {
      $(".pagination").append("<div>" + (i + 1) + "</div>");
    }
  }
  var curpagination = $(".pagination div:first-child");
  curpagination.addClass("on");

  $(window).load(function () {
    newsmasterheight = curnewsitemset.height();
    $(".newsmaster").css({ height: newsmasterheight + 40 });

    $(".newsitemset").hide();
    curnewsitemset.show();

    $(".pagination div").click(function () {
      if ($(this).index() != curnewsitemset.index()) {
        curpagination.removeClass("on");
        curpagination = $(this);
        curpagination.addClass("on");
        numnewsitemsetpos = $(this).index() + 1;
        $("html, body").animate({ scrollTop: 0 }, { duration: 500, easing: 'easeInOutExpo' });
        curnewsitemset.animate({ opacity: "hide" }, {
          duration: 250,
          complete: function () {
            curnewsitemset = $(".newsitemset:nth-child(" + numnewsitemsetpos + ")");
            curnewsitemset.animate({ opacity: "show" }, { duration: 250 });
            newsmasterheight = curnewsitemset.height() + 40;
            $(".newsmaster").animate({ height: newsmasterheight }, { duration: 500, easing: 'easeInOutExpo' });
          }
        });
      }
    });
  });

  /* WORK */

  var numberofitems = $(".workcarousel").children().length;
  var curitemnumber = 1;
  var getworkitems = $(".workcarousel").html();
  $(".workeg").hide().css({ opacity: 0.2 });
  $("#viewcurrent").html(curitemnumber);
  $("#viewtotal").html(numberofitems);

  if (numberofitems < 1) {
    $(".workcarousel").hide();
    $(".prev, .next, .view").hide();
  } else if (numberofitems == 1) {
    $(".prev, .next, .view").hide();
    $(".workcarousel .workeg").css({ opacity: 1 }).show();
  } else if (numberofitems == 2) {
    $(".workcarousel").append(getworkitems, getworkitems);
  } else if (numberofitems > 2 && numberofitems < 6) {
    $(".workcarousel").append(getworkitems);
  }

  if (numberofitems > 1) {
    for (i = 0; i < numberofitems; i++) {
      $(".cardots").append("<div></div>");
    }
  }

  var curcardot = $(".cardots div:first-child");
  curcardot.addClass("on");

  if (numberofitems > 1) {
    var prev2workeg = $(".workeg:last-child").prev();
    var prev1workeg = $(".workeg:last-child");
    var curworkeg = $(".workeg:first-child");
    var next1workeg = $(".workeg:nth-child(2)");
    var next2workeg = $(".workeg:nth-child(3)");
    var crslovrrd = false;

    $(".workeg").hide().css({ opacity: 0.2 });

    prev2workeg.css({ left: "-206%" }).show();
    prev1workeg.css({ left: "-103%" }).show();
    curworkeg.css({ opacity: 1 }).show();
    next1workeg.css({ left: "103%" }).show();
    next2workeg.css({ left: "206%" }).show();

    $(".next, .workeg, .nextvid div").click(function () {
      if (crslovrrd == false) {
        crslovrrd = true;
        prev2workeg.animate({ left: "-309%" }, { duration: 900, easing: 'easeOutExpo' });
        prev1workeg.animate({ left: "-206%" }, { duration: 900, easing: 'easeOutExpo' });
        curworkeg.animate({ left: "-103%", opacity: 0.2 }, { duration: 900, easing: 'easeOutExpo' });
        next1workeg.animate({ left: "0", opacity: 1 }, { duration: 900, easing: 'easeOutExpo' });
        next2workeg.animate({ left: "103%" }, { duration: 900, easing: 'easeOutExpo' });

        goneworkeg = prev2workeg;
        prev2workeg = prev1workeg;
        prev1workeg = curworkeg;
        curworkeg = next1workeg;
        next1workeg = next2workeg;
        if (next1workeg.is(':last-child')) {
          next2workeg = $(".workeg:first-child");
        } else {
          next2workeg = next2workeg.next();
        }

        next2workeg.css({ left: "309%" }).show().animate({ left: "206%" }, {
          duration: 900, easing: 'easeOutExpo',
          complete: function () {
            goneworkeg.hide();
            crslovrrd = false;
          }
        });

        if (curitemnumber < numberofitems) { curitemnumber = curitemnumber + 1; }
        else { curitemnumber = 1; }
        $("#viewcurrent").html(curitemnumber);

        curcardot.removeClass("on");
        if (curcardot.is(':last-child')) { curcardot = $(".cardots div:first-child"); }
        else { curcardot = curcardot.next(); }
        curcardot.addClass("on");
      }
    });

    $(".prev").click(function () {
      if (crslovrrd == false) {
        crslovrrd = true;
        next2workeg.animate({ left: "309%" }, { duration: 900, easing: 'easeOutExpo' });
        next1workeg.animate({ left: "206%" }, { duration: 900, easing: 'easeOutExpo' });
        curworkeg.animate({ left: "103%", opacity: 0.2 }, { duration: 900, easing: 'easeOutExpo' });
        prev1workeg.animate({ left: "0", opacity: 1 }, { duration: 900, easing: 'easeOutExpo' });
        prev2workeg.animate({ left: "-103%" }, { duration: 900, easing: 'easeOutExpo' });

        goneworkeg = next2workeg;
        next2workeg = next1workeg;
        next1workeg = curworkeg;
        curworkeg = prev1workeg;
        prev1workeg = prev2workeg;
        if (prev1workeg.is(':first-child')) {
          prev2workeg = $(".workeg:last-child");
        } else {
          prev2workeg = prev2workeg.prev();
        }

        prev2workeg.css({ left: "-309%" }).show().animate({ left: "-206%" }, {
          duration: 900, easing: 'easeOutExpo',
          complete: function () {
            goneworkeg.hide();
            crslovrrd = false;
          }
        });

        if (curitemnumber > 1) { curitemnumber = curitemnumber - 1; }
        else { curitemnumber = numberofitems; }
        $("#viewcurrent").html(curitemnumber);
      }
    });
  }

  /* LOADING */

  var randomnum = 1 + Math.floor(Math.random() * 5);
  if (randomnum == 1) { $(".subpage .loadscreen").css({ background: "#0b5967" }); }
  if (randomnum == 2) { $(".subpage .loadscreen").css({ background: "#0b671e" }); }
  if (randomnum == 3) { $(".subpage .loadscreen").css({ background: "#47145c" }); }
  if (randomnum == 4) { $(".subpage .loadscreen").css({ background: "#705d5c" }); }
  if (randomnum == 5) { $(".subpage .loadscreen").css({ background: "#4d0e0e" }); }

  $(".loader").html('<table><tr><td><div class="loadanim"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></td></tr></table>');

  loadanimation();

  if (isiDevice || isWindowsPhone || isAndroid) { var loadheight = botpoint; }
  else { var loadheight = tempheight; }

  $(".subcontent").css({ height: loadheight });

  /*if (contentheight > botpoint) {
    $(".subcontent").css({ height: botpoint });
    loadheight = "100%";
  } else if (contentheight <= botpoint && contentheight > tempheight) {
    loadheight = "100%";
  } else {
    $(".subcontent").css({ height: tempheight });
    loadheight = tempheight;
  }*/

  var homecntheight = $(".homecontent").height();
  if (tempheight > homecntheight) {
    $(".homecontent").css({ height: loadheight });
  }

  $(".loadscreenbg").height(loadheight);
  $(".subpage .loadscreen").css({ top: midpoint }).delay(600).animate({ height: 60, top: midpoint - 30 }, {
    duration: 400, easing: 'easeInExpo',
    complete: function () { $(this).animate({ height: loadheight, top: 0 }, { duration: 600, easing: 'easeOutExpo' }); }
  });
  $(".subpage .loader").delay(100).animate({ opacity: "show" }, { duration: 300 });

  var realheight = null;
  var loadaddition = null;
  var preloadheight = $(".realheight").height();

  $(window).load(function () {
    realheight = $(".realheight").height();
    loadaddition = realheight - preloadheight;
    newcntheight = contentheight + loadaddition;

    $(".homepage .loader").delay(1400).animate({ opacity: "hide" }, { duration: 300 });
    $(".homepage .loadscreen").delay(1400).animate({ opacity: "hide" }, { duration: 300 });

    $(".subpage .loader").delay(600).animate({ opacity: "hide" }, { duration: 600 });
    $(".subpage .loadscreenfg").delay(1000).animate({ opacity: "show" }, {
      duration: 600,
      complete: function () {
        $(".subpage .loadscreenbg, .subpage .loadscreen").animate({ opacity: "hide" }, { duration: 600 });
        $(".subpage .loadscreenfg").css({ height: "100%" });
        if (newcntheight > tempheight) {
          $(".subcontent").animate({ height: newcntheight }, {
            duration: 400, easing: 'easeInExpo',
            complete: function () { $(".subcontent").css({ height: "auto" }); }
          });
        }
        $(this).delay(400).animate({ opacity: "hide" }, { duration: 400 });
      }
    });

    if (footerfixed == true && newcntheight > tempheight) {
      $(".footer").css({ position: "relative" });
    }
  });

  /* HOME */

  $(".homeblock").click(function (event) {
    event.preventDefault();
  });

  var hbcurrent = null;
  var hblink = null;
  var hbdisable = false;

  // touch

  if (isiDevice || isWindowsPhone || isAndroid) {

    $(".homeblock").click(function () {
      if (hbcurrent != null) {
        $("#" + hbcurrent).find(".hbinfo").animate({ top: "-95px" }, { duration: 150 });
        $("#" + hbcurrent).find(".hbicon").animate({ opacity: "hide", top: "75" }, { duration: 150 });
        $("#" + hbcurrent).find(".hbtrans").delay(150).animate({ opacity: "hide" }, { duration: 150 });
      }
      if ($(this).attr("id") == hbcurrent) {
        hblink = $(this).attr("href");
        // Commented next line so homepage links dont work for portfolio
        // window.location = hblink;
      }
      else {
        hbcurrent = $(this).attr("id");
        $(this).find(".hbtrans").animate({ opacity: "show" }, { duration: 150 });
        $(this).find(".hbinfo").delay(150).animate({ top: "0" }, { duration: 150 });
        $(this).find(".hbicon").delay(150).animate({ opacity: "show", top: "0" }, { duration: 150 });
      }
    });

  }

  // mouse

  else {

    $(window).load(function () {

      $(".homeblock").hover(function () {
        if (hbdisable == false) {
          $(this).find(".hbtrans").delay(150).animate({ opacity: "show" }, { duration: 150 });
          $(this).find(".hbinfo").delay(300).animate({ top: "0" }, {
            duration: 150,
            complete: function () { hbcurrent = $(this).parent().attr("id"); }
          });
          $(this).find(".hbicon").delay(300).animate({ opacity: "show", top: "0" }, { duration: 150 });
        }
      }, function () {
        if (hbdisable == false) {
          $(this).find(".hbinfo").animate({ top: "-95px" }, { duration: 150 });
          $(this).find(".hbicon").animate({ opacity: "hide", top: "75" }, { duration: 150 });
          $(this).find(".hbtrans").delay(150).animate({ opacity: "hide" }, { duration: 150 });
        }
      });

      $(".homeblock").click(function () {
        if ($(this).attr("id") == hbcurrent && hbdisable == false) {
          hbdisable = true;
          hblink = $(this).attr("href");
          $(".hbtrans").css({ opacity: "0.8" });
          $(".hbtrans").animate({ opacity: "show" }, { duration: 300 });
          $(this).find(".hbtrans, .hbinfo, .hbicon").animate({ opacity: "hide" }, { duration: 150 });
          setTimeout(function () {
            $(".hbtrans").css({ opacity: "0.6" }).hide();
            hbdisable = false;
          }, 1650);
          setTimeout(function () {
            // Commented next line so homepage links dont work for portfolio
            // window.location = hblink;
          }, 600);
        }
      });

    });

  }

  /* TWITTER */

  $(".tweetblock").append('<div class="hbtrans"></div>');

  if (winwidth < 480) {
    $(".tweetblock:nth-last-child(2)").append('<div class="twcontain"><div class="twwrap"><a href="http://twitter.com/OFandyt" target="_blank" class="twhdr">FOLLOW US ON TWITTER</a><div class="feed"></div></div></div>');
  } else if (winwidth >= 480 && winwidth < 750) {
    $(".tweetblock:nth-child(11)").append('<div class="twcontain"><div class="twwrap"><a href="http://twitter.com/OFandyt" target="_blank" class="twhdr">FOLLOW US ON TWITTER</a><div class="feed"></div></div></div>');
  } else if (winwidth >= 750 && winwidth < 1000) {
    $(".tweetblock:nth-child(17)").append('<div class="twcontain"><div class="twwrap"><a href="http://twitter.com/OFandyt" target="_blank" class="twhdr">FOLLOW US ON TWITTER</a><div class="feed"></div></div></div>');
  } else if (winwidth >= 1000 && winwidth < 1250) {
    $(".tweetblock:nth-child(23)").append('<div class="twcontain"><div class="twwrap"><a href="http://twitter.com/OFandyt" target="_blank" class="twhdr">FOLLOW US ON TWITTER</a><div class="feed"></div></div></div>');
  } else if (winwidth >= 1250 && winwidth < 1500) {
    $(".tweetblock:nth-child(29)").append('<div class="twcontain"><div class="twwrap"><a href="http://twitter.com/OFandyt" target="_blank" class="twhdr">FOLLOW US ON TWITTER</a><div class="feed"></div></div></div>');
  } else if (winwidth >= 1500 && winwidth < 2000) {
    $(".tweetblock:nth-child(35)").append('<div class="twcontain"><div class="twwrap"><a href="http://twitter.com/OFandyt" target="_blank" class="twhdr">FOLLOW US ON TWITTER</a><div class="feed"></div></div></div>');
  } else if (winwidth >= 2000) {
    $(".tweetblock:nth-child(31)").append('<div class="twcontain"><div class="twwrap"><a href="http://twitter.com/OFandyt" target="_blank" class="twhdr">FOLLOW US ON TWITTER</a><div class="feed"></div></div></div>');
  }

});

function loadanimation() {
  $(".loadanim div:nth-child(1)").delay(100).animate({ opacity: "show" }, { duration: 50 });
  $(".loadanim div:nth-child(2)").delay(150).animate({ opacity: "show" }, { duration: 50 });
  $(".loadanim div:nth-child(3)").delay(200).animate({ opacity: "show" }, { duration: 50 });
  $(".loadanim div:nth-child(4)").delay(250).animate({ opacity: "show" }, { duration: 50 });
  $(".loadanim div:nth-child(5)").delay(300).animate({ opacity: "show" }, { duration: 50 });
  $(".loadanim div:nth-child(6)").delay(350).animate({ opacity: "show" }, { duration: 50 });
  $(".loadanim div:nth-child(7)").delay(400).animate({ opacity: "show" }, { duration: 50 });
  $(".loadanim div:nth-child(8)").delay(450).animate({ opacity: "show" }, { duration: 50 });
  $(".loadanim div:nth-child(1)").delay(350).animate({ opacity: "hide" }, { duration: 200 });
  $(".loadanim div:nth-child(2)").delay(400).animate({ opacity: "hide" }, { duration: 200 });
  $(".loadanim div:nth-child(3)").delay(450).animate({ opacity: "hide" }, { duration: 200 });
  $(".loadanim div:nth-child(4)").delay(500).animate({ opacity: "hide" }, { duration: 200 });
  $(".loadanim div:nth-child(5)").delay(550).animate({ opacity: "hide" }, { duration: 200 });
  $(".loadanim div:nth-child(6)").delay(600).animate({ opacity: "hide" }, { duration: 200 });
  $(".loadanim div:nth-child(7)").delay(650).animate({ opacity: "hide" }, { duration: 200 });
  $(".loadanim div:nth-child(8)").delay(700).animate({ opacity: "hide" }, {
    duration: 200,
    complete: function () { loadanimation(); }
  });
}









