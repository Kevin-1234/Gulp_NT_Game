

$(document).ready(() => {


    const appendOptions = (allOptions, el, correctAns) => {

      
      //append options to the question about a plant's name
      var correctAnsIndex = allOptions.indexOf(correctAns)
      var answerIndexes = [-1,-1,-1,-1,-1]
      var answerOptions = []
      var correctAnsPos = Math.floor((Math.random() * 4) + 1);
      answerIndexes[correctAnsPos] = correctAnsIndex
      for(i = 0; i < 4; i++){
        var x = Math.floor((Math.random() * allOptions.length - 1) + 1);
        while(answerIndexes.includes(x) || x === correctAnsIndex){
          var x = Math.floor((Math.random() * allOptions.length - 1) + 1);
        }
        answerIndexes[answerIndexes.indexOf(-1)] = x
      }
      for(i=0; i <= 4; i++){
        answerOptions[i] = allOptions[answerIndexes[i]]
      }
      console.log(answerOptions)
      $('.choices').fadeOut(300)


      setTimeout(() => {
        $('.choices').empty()
        for(i = 0; i < answerIndexes.length; i++){
          $('.choices').append(`<input class="hidden" type="checkbox" id="option${i}" name="${answerOptions[i]}" value="${answerOptions[i]}">
          <label class=" option${i} cursor-pointer h-10 border-solid border-2 border-blue-400 flex justify-center items-center rounded-full py-3 px-6 hover:bg-blue-400  hover:text-white transition ease-out duration-300" for="option${i}"> ${answerOptions[i]}</label><br>
          `)
          }

        // change the color of each button when being clicked
      alterColor = (y) => {
        alterColorToReturn = () => {
          
          $(`.option${y}`).addClass('bg-blue-400')
          $(`.option${y}`).addClass('text-white')
          //$(`#option${y}`).prop('disabled', false);
            
          
          
          for(x = 0; x < answerIndexes.length; x++){
            if (x === y){
              continue
            }else{
              $(`.option${x}`).removeClass('bg-blue-400')
              $(`.option${x}`).removeClass('text-white')
              //$(`#option${x}`).prop('disabled', true);
              $(`#option${x}`).prop('checked', false);


            }
          }
        } 
        return alterColorToReturn
      }
      for(x = 0; x < answerIndexes.length; x++){
        $(`.option${x}`).click(alterColor(x))
      } 
      }, 300);
      
      $('.choices').fadeIn(300) 

      $("#checkBtn").remove()
      
      $(".buttomBtns").prepend(`<button class=" w-20  py-1 bg-green-600 text-white rounded-md focus:ring-4 focus:ring-green-500 focus:ring-opacity-50" id="checkBtn">
    Check
  </button>
  `)
        
      
      
      

     
       

      
      $('.notification').fadeOut()
      //check selected option
      $('#checkBtn').click(() => {
        $('.notification').empty()
        clearTimeout(toggle2)
        clearTimeout(toggle1)
        correct = 0
        optionsSelected = 0
        for(x = 0; x <= answerIndexes.length - 1; x++){
          //console.log($(`#option${x}`).val())
          if ($(`#option${x}`).is(":checked")) {
            optionsSelected++
            
            if ($(`#option${x}`).val() === correctAns) {
              correct = true
            }
            
          }

        }

        //pop up notification based the answer
        if(correct === true){
         
          $('.notification').append(`<div class=" correct bg-green-500 px-3 py-2 rounded-lg text-white">
              <span>Correct answer! Good job!</span>
            </div>`)
 
        }else{
          $('.notification').append(
            `<div class="worng bg-red-500 px-3 py-2 rounded-lg text-white">
            <span>Wrong answer! Please try again!</span>
          </div>`
          )

        }
        $('.notification').fadeIn(300)
        var toggle1 =  setTimeout(() => {
          $('.notification').fadeOut(300)
        }, 1700);
          
       
        
  
        var toggle2 =  setTimeout(() => {
          $('.notification').empty()
        }, 2000)
        console.log(toggle1)
        console.log(toggle2)
      })
    }


    const toQuiz = (el, allPlantName, allPlantHabitat, allEatenPart) => {
      const toReturn = () => {

        $("main").fadeOut(400);
        //$(".quiz").removeClass('z-10');
        $("main").addClass('z-0');
        $(".quiz").removeClass('z-0');
        $(".quiz").addClass('z-10');
        $(".quiz").fadeIn(400);

        
        $('.quizImageLg').attr('src', el.imageL)
        $('#nexBtn').remove()
        $('.buttomBtns').append(` <button class=" w-20  py-1 bg-green-600 text-white rounded-md focus:ring-4 focus:ring-green-500 focus:ring-opacity-50" id="nexBtn">
        Next
      </button> `)
        appendOptions(allPlantName, el, el.CommenName)
        
        var numOfQuesCompleted = [1]
        $(`#nexBtn`).click(
          toNextQuiz(el, allPlantHabitat, allEatenPart, numOfQuesCompleted)
          
        )
        
      }        
      return toReturn     
    }

    const toNextQuiz = (el, allPlantHabitat, allEatenPart, numOfQuesCompleted) => {
      const toReturn = () => {
        var mapQuestions = {
          0: "Plant name",
          1: "Eaten part",
          2: "Habitat"
        }

        if($('#nexBtn').text() === "Finish"){

          $(".quiz").fadeOut(400);
          $("main").removeClass('z-0');
          $("main").addClass('z-10');
          $(".quiz").removeClass('z-10');
          $(".quiz").addClass('z-0');
          $("main").fadeIn(400);
          let length = numOfQuesCompleted.length
          console.log(numOfQuesCompleted.length)
          for(i = 0; i < length; i++){
            numOfQuesCompleted.pop()
          }

          
          
        }

        console.log("numOfQuesCompleted.length: " + numOfQuesCompleted.length)
        if(numOfQuesCompleted.length === 3){
          $('#nexBtn').text("Finish")

        }

       


        var x = Math.floor((Math.random() * 2) + 1);
        while(mapQuestions[x] === $('#quizQues').attr('name')){
          var x = Math.floor((Math.random() * 2) + 1);
        }
        $('#quizQues').fadeOut(200)
        setTimeout(() => {

          if(x === 1){
            $('#quizQues').attr('name', "Eaten part")
            $('#quizQues').text("Which part of the plant can be eaten?")
            let partEaten = el.PartEaten[0]
            appendOptions(allEatenPart, el, partEaten)
          }else if(x === 2){
            $('#quizQues').attr('name', "Habitat")
            $('#quizQues').text("Where can we find it?")
            let Habitat = el.Habitat[0]
            appendOptions(allPlantHabitat, el, Habitat)
          }
          
        }, 200);
        
        $('#quizQues').fadeIn(200)
        //$(".buttomBtns").empty()
    
        
       // appendOptions(el, )
       numOfQuesCompleted.push(1)

      }

      return toReturn

    }

    $(".quiz").fadeOut();
    

    


    $.getJSON('plant-data.json', (data) => {
      
      

      var allPlantName = []
      var allPlantHabitat = ["0W", "MW", "Riverene / SFR", "Monsoon Vine Thicket", "Sandsheet / Flood plain", "Coastal", "Rocky / Escarpment", "Wetland"]
      var allEatenPart = ["Seed", "Root", "Fleshy fruit", "Flowers", "Stem"]

      data.forEach(el => {
        allPlantName.push(el.CommenName)
      })

      console.log(allPlantHabitat)
      console.log(allEatenPart)
      var index = 1
      data.forEach(el => {
        
        $('.cardContainer').append(`<div class="card${index} rounded-lg bg-white border-gray-200 shadow-md overflow-hidden relative transform hover:scale-110  hover:shadow-lg transition ease-out duration-300"> 
        <img src="${el.imageS}" class="h-32 sm:h-48 w-full object-cover">
        <div class="m-4">
          <span class="font-bold">Quiz ${index}</span>
          <span class="block text-gray-500 text-sm">To be completed...</span>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
        </div>
        <div class="badge">
          <svg class="inline-block w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>25 mins</span>
        </div>
        </div>`)


        
        $(`.card${index}`).click(          
          toQuiz(el, allPlantName, allPlantHabitat, allEatenPart)
        );

        
        index++
      })
      
      // const nameOptions = []

      // data.forEach(el => {
      //   if (!nameOptions.includes(el.CommenName)){
      //     nameOptions.push(el.CommenName)
      //   }
      // })








      


    })
    



})

