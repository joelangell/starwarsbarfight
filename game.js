$(document).ready(function(){

    //array of char objs
    var charArr = [
    
        {
            name: "Han Solo",
            hp: 75,
            image: "han2.jpg",
            attack: 6,
            counter: 10
        },
        
        {
            name: "Cornelius Evazan",
            hp: 80,
            image: "cornelius.jpg",
            attack: 6,
            counter: 15
        },
    
        {
            name: "Ponda Baba",
            hp: 120,
            image: "pondababa.png",
            attack: 6,
            counter: 20
        },
    
        {
            name: "Death Sticks Guy",
            hp: 50,
            image: "death-sticks.jpg",
            attack: 6,
            counter: 30
        },
    
        {
            name: "Greedo",
            hp: 75,
            image: "greedo.jpg",
            attack: 6,
            counter: 50
        },
    
        {
            name: "Patrick Swayze",
            hp: 150,
            image: "swayze.jpg",
            attack: 6,
            counter: 100
        }
    ]
    
    
    // var chosenHero
    var isHeroChosen
    var isHeroAlive
    // var chosenEnemy
    var isEnemyChosen
    var isEnemyAlive
    var vanquished = 0
    // var heroStats = []
    
    
    function initGame() {
        isHeroChosen = false
        isEnemyChosen = false
        var num = Math.floor(12 / charArr.length)
        for (var i = 0; i < charArr.length; i++) {
            var charThing = $("<div id = 'character-" + i + "' class= 'char col-md-" + num + "' value = '" + i + "'></div>")
            $(".characters").append(charThing)
            charThing.html(
                "<img src = './assets/images/" + charArr[i].image + "' style= 'width: 150px; height: 150px;'/><h5 class = nameBox>" + charArr[i].name + "<br>" + "HP: " + charArr[i].hp + "<br>" + "Counter: " + charArr[i].counter + "</h5>"
            )
        }
    }
    initGame()
    
    $(document).on("click", ".char", function pickChar() {
        if (!isHeroChosen) {
            chosenHero = charArr[$(this).attr("value")]
            console.log(chosenHero)
            heroStats = [chosenHero.hp,chosenHero.attack]
            
            isHeroChosen = true
            $(this).css("border-color", "green")
            var bigHero = $("<div id = 'selectedHero' class = 'col-md-4'></div>")
            var textArea = $("<div id = 'textArea' class = 'col-md-4'></div>")
            $(".gameplay").append(bigHero)
            $(".gameplay").append(textArea)
            var textBox1 = $("<div id = 'text1'></div>")
            $("#textArea").append(textBox1)
            var textBox2 = $("<div id = 'text2'></div>")
            $("#textArea").append(textBox2)
            $(this).appendTo("#selectedHero")
            // charThing.html(
            //     "<img src = './assets/images/" + charArr[i].image + "' style= 'width: 300px; height: 300px;'/><h5>" + charArr[i].name + "<br>" + "HP: " + charArr[i].hp + "</h5>"
            // )
        }
        else if (!isEnemyChosen) {
            chosenEnemy = charArr[$(this).attr("value")]
            console.log(chosenEnemy)
            isEnemyChosen = true
            $("#attack1").show()
            var bigEnemy = $("<div id = 'selectedEnemy' class = 'col-md-4'></div>")
            $(".gameplay").append(bigEnemy)
            $(this).appendTo("#selectedEnemy")
        }
    })
    

    $("#attack1").on("click", function() {
        attack()
    })
    
    function attack() {
        isHeroAlive = true
        isEnemyAlive = true
        $("#text1").empty()
        $("#text2").empty()
        var enemyDamage = chosenEnemy.hp -= chosenHero.attack
        
        $("#text1").text("You attack " + chosenEnemy.name + " for " + chosenHero.attack + " damage - reducing remaining HP to " + enemyDamage + ".")
        
        counter = setTimeout(function() {
            $("#text2").text(chosenEnemy.name + " counters with an attack dealing " + chosenEnemy.counter + " damage. You have " + heroDamage + " HP remaining.")
        }, 5000)
        chosenHero.attack += chosenHero.attack
        var heroDamage = chosenHero.hp -= chosenEnemy.counter
        

        if (chosenHero.hp <= 0) {
            isHeroAlive = false
            $("#text1").empty()
            $("#text2").empty()
            clearTimeout(counter)
            $("#text1").text("You're dead now. Sorry - probably should have been nicer to people.")
            $("#text2").text("Try again!")
        }

        else if (chosenEnemy.hp <= 0) {
            isEnemyAlive = false
            isEnemyChosen = false
            vanquished++
            console.log(vanquished)
            $("#text1").empty()
            $("#text2").empty()
            $("#selectedEnemy").empty()
            $("#text1").text("You've defeated " + chosenEnemy.name + " and devastated his family. I hope you're proud of yourself.")
            $("#text2").text("Select a new enemy to pummel mercilessly so you can feel like a tough guy.")
            clearTimeout(counter)
        }
        
        if (vanquished === 5) {
            $("#text1").empty()
            $("#text2").empty()
            $("#selectedEnemy").empty()
            $("#text1").text("You win! You've defeated all of your enemies and a few unfortunate strangers - congratulations!")
        }

    }


    $("#reset1").on("click", function() {
        reset()
    })
    
    function reset() {
        $("#selectedHero").remove()
        $("#selectedEnemy").remove()
        $("#textArea").remove()
        initGame()
    }


});



