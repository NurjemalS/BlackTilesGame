$(function(){
    $("#slideshow div:gt(0)").hide();
    $("#slide1").fadeIn(350).delay(300).fadeOut(350, function(){
        $("#slide2").fadeIn(350).delay(300).fadeOut(350, function(){
            $("#slide3").fadeIn(350).delay(300).fadeOut(350, function(){
                $("#game").fadeIn(500, game());
                $("#tapmsg").css("display", "block");
                $("#tapmsg").fadeOut(1800);
                $("body").css("background" ,"#fff");
                $("#slideshow").css("display", "none");
            })
        });
    });


    setTimeout(function(){
        var timer = setInterval(decCounter, 1000) ; // 1second
                
        function decCounter(){
            var counter = parseInt($("#time").text()) ;
                    
            if(counter != 0){
                counter -- ;
                        
            }else if(counter == 0){
                if(HiScore <= totalScore){
                  
                    localStorage.setItem("hiscore", totalScore)

                    $("#hiscore").text(HiScore);
                    $("#newScore").css("display", "block");
                    $.confetti.start();

                    setTimeout(() => {
                        $.confetti.stop();
                    }, 1000)
                    $("#f5").css("display", "block");
                }else if(HiScore > totalScore){
                    $("#timeUp").css("display", "block");
                    $("#f5").css("display", "block");
                }

                $("table tr th").addClass("unclickable");
            }

            $("#time").text(counter);
        }
    }, 2400);


    
    var clickables = [] ; // size 3
    var tileScore;
    var totalScore = 0;
    let HiScore = localStorage.getItem("hiscore") ;
    HiScore = HiScore === null ? 0 : HiScore ;
    $("#hiscore").text(HiScore);
    //console.log(HiScore);
  

    var r1 = Math.floor(Math.random() * 15 + 1);
    var r2 = Math.floor(Math.random() * 15 + 1);
    var r3 = Math.floor(Math.random() * 15 + 1);
    var r4;
    
    while(r1 == r2){
        r2 = Math.floor(Math.random() * 15 + 1);
    }
    while(r1 == r3 || r2 == r3){
        r3 = Math.floor(Math.random() * 15 + 1);
    }

    clickables.push(r1);
    clickables.push(r2);
    clickables.push(r3);
    
    for (var i = 0; i < clickables.length; ++i) {
        $("#" + clickables[i]).css("background-color", "#000");
    }

    function game(){
    
        function updateTile(index){
            let colorgrey = "#565759";
            let colorblack = "#000";

            $("#" + index).animate({backgroundColor: colorgrey}, 200, function(){
                $("#" + index).animate({backgroundColor: colorblack}, 100);
            }) ;
        }

        $("table tr th").each(function(){
            $(this).click(function(){
                for(var i = 0; i<clickables.length; ++i){ 
                    if($(this).attr("id") == clickables[i]){
                        r4 = Math.floor(Math.random() * 15 + 1);
                        while(clickables[0] == r4 || clickables[1] == r4 || clickables[2] == r4){
                            r4 = Math.floor(Math.random() * 15 + 1);
                        }
                       
                        updateTile(r4);
                        clickables.push(r4);
                        //console.log(clickables);
    
                        let colorgreen = "#068f31" ;
                        let colorwhite = "#FFF" ;
                        $(this).animate({backgroundColor: colorgreen}, 100, function(){
                            $(this).animate({backgroundColor: colorwhite}, 200) ;
                        }) ;

                        //score calc
                        if(tileScore == undefined){
                            tileScore = 5 ;
                        }

                        //$(this).text("+" + tileScore);
                        $(this).append("<span class=tile> +"+ tileScore+ "</span>");
                        $(".tile").animate({top : "-=85px", opacity:0.1}, 500,
                            function(){
                                $(this).remove() ;
                        });
                
                        totalScore += tileScore ; 
                       
                        $("#score").text(totalScore);


                        //update array clickables
                        let id_tile = parseInt($(this).attr("id"));
                        //console.log("clicked" + id_tile );
                        clickables = clickables.filter(function(item){
                            return item != id_tile;
                        }) ;
                        
                        setInterval(function(){
                            let w = $("#timebarinside").width();
                            $("#timebarinside").css("width", (w-80) + "px");
                        }, 1000) ;

                        tileScore = Math.ceil($("#timebarinside").width()/100);
                        $("#timebarinside").css("width", 500 + "px");

                    }
                }
            });
        });

    }

}) ;