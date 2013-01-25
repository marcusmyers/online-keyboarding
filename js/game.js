function randomFromTo(from, to){
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    var arrstring = new Array("a", "s", "d", "f",
    "j", "k", "l", ";", "all", "add", 
    "adds", "has", "lads", "javascript", "yawn", "queen",
    "red", "place", "word", "message", "many", "dog",
    "cat", "can't", "water", "places", "deliver", "messages",
    "crazy", "face", "who", "where", "pine", "children", "age", "laptop",
    "bell", "pet", "friend", "end");


    var score = 0;

    $(document).ready(function() {

        var children = $("#boxcontainer").children();
        var child = $("#boxcontainer div:first-child");

        var currentEl;
        var currentElPress;

        var win_width = $(window).width();
        var text_move_px = 400;
        var box_left = (win_width/3) - (text_move_px/6);

        var playGame;
        var stop;
        
        $(".animatedbox").css("left", box_left+"px");

        $("#btnplay").click(function() {

            if ($(this).text() == "Play") {
                startPlay();
                playGame = setInterval(startPlay, 23000);
                $(this).text("Pause");
            } else if ($(this).text() == "Pause") {
                stop = true;
                if ($("#boxcontainer").find(".current").length == 0) {
                  $(this).text("Play");
                } else {
                  $(this).text("wait a moment");
                }
                clearInterval(playGame);
            }
            return false;
        });

        var con_height = $("#boxcontainer").height();
        var con_pos = $("#boxcontainer").position();
        var min_top = con_pos.top;

        // 56 = animated box top & bottom padding + font size
        var max_top = min_top + con_height - 56;

        function startPlay() {

            child = $("#boxcontainer div:first-child");
            child.addClass("current");
            currentEl = $(".current");
            
            for (i=0; i<children.length; i++) {

                var delaytime = i * 3000;

                setTimeout(function() {
                    randomIndex = randomFromTo(0, arrstring.length - 1);
                    randomTop = randomFromTo(min_top, max_top);
                    child.animate({"top": randomTop+"px"}, 'slow');
                    child.find(".match").text("");
                    child.find(".unmatch").text(arrstring[randomIndex]);
                    child.show();
                    child.animate({
                       left: "+="+text_move_px
                    }, 8000, function() {
                        currentEl.removeClass("current");
                        currentEl.fadeOut('fast');
                        currentEl.animate({
                            left: box_left+"px"
                        }, 'fast');
                        if (currentEl.attr("id") == "last") {
                            child.addClass("current");
                            currentEl = $(".current");
                            if (stop) {
                               $("#btnplay").text("Play");
                            }
                        } else {
                            currentEl.next().addClass("current");
                            currentEl = currentEl.next();
                        }
                    });
                    child = child.next();
                }, delaytime);
            }            
        }

        // on ie $(window).keypress() won't  work
        $(document).keypress(function(event) {
            currentElPress = $(".current");
            
            var matchSpan = currentElPress.find(".match");
            var unmatchSpan = currentElPress.find(".unmatch");
            var unmatchText = unmatchSpan.text();
            var inputChar;

            if ( $.browser.msie || $.browser.opera ) {
                inputChar = String.fromCharCode(event.which);
            } else {
                inputChar = String.fromCharCode(event.charCode);
            }

            if (inputChar == unmatchText.charAt(0)) {
                unmatchSpan.text(unmatchText.replace(inputChar, ""));
                matchSpan.append(inputChar);
                if (unmatchText.length == 1) {
                    currentElPress.stop().effect("explode", 500);
                    currentElPress.animate({
                        left: box_left+"px"
                    }, 'fast');
                    if (currentElPress.attr("id") == "last" && stop) {
                        $("#btnplay").text("Play");
                    }

                    currentElPress.removeClass("current");
                    currentElPress = currentElPress.next();
                    currentElPress.addClass("current");
                    currentEl = currentElPress;
                    score += 50;
                    $("#score").text(score).effect("highlight", { 
                        color: '#000000'
                    }, 1000);
                } else {
                    score += 10;
                    $("#score").text(score);
                }
            }
        });
    });