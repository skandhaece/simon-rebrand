$(document).ready(function(){
    var themeSong = new Audio("./music/theme-song.mp3")
    
    $("button").fadeOut();

    async function mainRunning(level,score)
    {
        var buttonPressSound = new Audio("./music/button-clicking.mp3")
        
        var gameOver = new Audio("./music/game-over.mp3")
        
        
        // $("h1").text(textOfButton)
        $("span").text(level)
        $("emp").text(score)
        let realAnswerKey = []
        realAnswerKey = answerKey(level);
        let color =["green","red","yellow","blue"];
        $("button").off("click");
        for(let i=0;i<level;i++)
        {
            // console.log(realAnswerKey);
            let textOfButton = $("."+color[realAnswerKey[i]]).text();
            // console.log(textOfButton);
            $("."+color[realAnswerKey[i]]).addClass("button-display");
            // console.log($("."+color[realAnswerKey[i]]).attr("class"));
            $("."+color[realAnswerKey[i]]).text(i+1);
            await sleep(1000)
                $("."+color[realAnswerKey[i]]).removeClass("button-display"); 
                // console.log($("."+color[realAnswerKey[i]]).attr("class"));
                $("."+color[realAnswerKey[i]]).text(textOfButton);
                
            

        }
        console.log(`fullanswerkey: ${realAnswerKey}`)
        $("button").on("click");

        var check = 0;
        $("button").on("click",function(){
            
            buttonPressSound.play();
            
            var keyPressed = this.innerHTML;
            console.log(`Key pressed: ${keyPressed}`)
            console.log(`Check Value: ${check}`)
            console.log(`Expected: ${realAnswerKey[check]}`)
            console.log(`fullanswerkey: ${realAnswerKey}`)

            if(realAnswerKey[check] == keyPressed)
            {
                
                score += 1
                $("emp").text(score)
            }
            if(realAnswerKey[check] != keyPressed)
            {
                themeSong.pause();
                gameOver.play();
                
                console.log("+++++++++++++++++++++++++++++++++++++")
                $("button").off("click");
                $("button").fadeOut();
                $("h1").text(`SCORE: ${score}`)
                $("h3").text("CLICK TO REPLAy");
                
                $("h3").on("click",function(){
                    themeSong.play();
                    $("button").fadeIn();
                    $("h1").html("LEVEL<span>1</span>")
                    $("h3").html("Score:<emp>0</emp>")
                    mainRunning(1,0);
                });
            }
            check +=1;
            if(check == level)
            {
                check = 0;
                mainRunning(level + 1, score)
                return
            }
            console.log("+++++++++++++++++++++++++++++++++++++")
        })
        

    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    function answerKey(levelOfPlayer)
    {
        var i = levelOfPlayer;
        var answerToBeReturned = []
        while(i !== 0)
        {
            let answer = Math.floor((Math.random() * 4));
            answerToBeReturned.push(answer);
            i -= 1;

        }
        return answerToBeReturned;
    }

    function setup()
    {   
        $("h1").text("Click to begin")
        $("h3").text(" ")
        
        $(document).on("click",function(){
            $(document).off("click");
            $("button").fadeIn();
            $("h1").html("LEVEL<span>1</span>")
            $("h3").html("Score:<emp>0</emp>")
            themeSong.play();
            setTimeout(function(){
                themeSong.play();
            },137000);
            mainRunning(1,0);
        });
        
    }
    setup();

    
});
