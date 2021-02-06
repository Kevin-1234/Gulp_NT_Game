

$(document).ready(() => {


    const appendOptions = (allOptions, el, correctAnswers) => {

      
      //append options to the quiz
      var correctAnswersIndexs = []
      correctAnswers.forEach(element => {
        correctAnswersIndexs.push(allOptions.indexOf(element))
      });
      
      var answerIndexes = [-1,-1,-1,-1,-1]
      var answerOptions = []

      //abiarily assign position to correct options
      var correctAnswersPos = []
      for(i = 0; i < correctAnswers.length; i++){
        let x = Math.floor((Math.random() * 5) + 1)
        while(correctAnswersPos.includes(x - 1)){
          x = Math.floor((Math.random() * 5) + 1)
        }
        correctAnswersPos.push(x - 1)

      }

      for(i = 0; i <= correctAnswersPos.length; i++){
        answerIndexes[correctAnswersPos[i]] = correctAnswersIndexs[i]
      }
      console.log("answerIndexes: " + answerIndexes)

      //abiarily assign position to incorrect options
      for(i = 0; i < 5 - correctAnswersPos.length; i++){
        var x = Math.floor((Math.random() * allOptions.length - 1) + 1);
        while(answerIndexes.includes(x) || x === correctAnswersIndexs){
          var x = Math.floor((Math.random() * allOptions.length - 1) + 1);
        }
        answerIndexes[answerIndexes.indexOf(-1)] = x
      }
      for(i=0; i <= 4; i++){
        answerOptions[i] = allOptions[answerIndexes[i]]
      }
      console.log(answerOptions)
      $('.choices').fadeOut(200)


      setTimeout(() => {
        $('.choices').empty()
        for(i = 0; i < answerIndexes.length; i++){
          $('.choices').append(`<input class="hidden" type="checkbox" id="option${i}" name="${answerOptions[i]}" value="${answerOptions[i]}">
          <label class=" option${i} cursor-pointer h-10  border-solid border-2 rounded-lg border-blue-400 flex justify-center  items-center  py-3 px-6 mt-1 hover:bg-blue-400  hover:text-white transition ease-out duration-300 w-full lg:w-auto md:rounded-full" for="option${i}"> ${answerOptions[i]}</label><br>
          `)
          }

        // change the color of each button when being clicked
      alterColor = (y) => {
        alterColorToReturn = () => {
          
          $(`.option${y}`).addClass('bg-blue-400')
          $(`.option${y}`).addClass('text-white')
          
          //$(`#option${y}`).prop('disabled', false);
            
          
          
          for(x = 0; x < answerIndexes.length; x++){
            
            if(x !== y){
              $(`.option${x}`).removeClass('bg-blue-400')
            $(`.option${x}`).removeClass('text-white')
            //$(`#option${x}`).prop('disabled', true);
            $(`#option${x}`).prop('checked', false);
            }else{
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
      
      $('.choices').fadeIn(200) 

      $("#checkBtn").remove()
      
      $(".buttomBtns").prepend(
        `
        <button class=" w-28  py-1 bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-200 ease-in-out" id="checkBtn">
        <svg class=" inline-block w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
        Check
      </button>
        
        
      `)
            
      
      var toggle1
      var toggle2

      function toggle1Function() {
        toggle1 =  setTimeout(() => {
          //$('.notification').fadeOut(300)
          $('.wrong').fadeOut(300)
          $('.correct').fadeOut(300)
        }, 1700);
      }

      function toggle2Function() {
        toggle2 =  setTimeout(() => {
          $('.notification').empty()
        }, 2000)
      }
      
      function stopToggleFunction() {
        console.log("toggle1: " + toggle1)
        console.log("toggle2: " + toggle2)
        clearTimeout(toggle1);
        clearTimeout(toggle2);
      }
      
      //$('.notification').fadeOut()
      //check selected option
      $('.wrong').fadeOut(300)
      $('.correct').fadeOut(300)
      $('#checkBtn').click(() => {
        //$('.notification').empty()
        //clearTimeout(myVar)
        //clearTimeout(toggle1)
        stopToggleFunction()
        $('.wrong').fadeOut(150)
        $('.correct').fadeOut(150)
        correct = false
        
        for(x = 0; x <= answerIndexes.length - 1; x++){
          //console.log($(`#option${x}`).val())
          if ($(`#option${x}`).is(":checked")) {
            console.log($(`#option${x}`).val())
            if ( correctAnswers.includes($(`#option${x}`).val())) {
              correct = true
            }
            
          }

         

        }
        console.log(correctAnswers)
        
        //pop up notification based the answer
        if(correct === true){
          
          
          // $('.notification').append(`<div class=" notificationText correct absolute bottom-0 left-0 bg-green-500 px-3 py-2 rounded-lg text-white">
          //     <span>Correct answer! Good job!</span>
          //   </div>`)
          $('.correct').fadeIn(300)
          $('#nexBtn').removeClass("invisible")
          $('#nexBtn').addClass("visible")
 
        }else{
          // $('.notification').append(
          //   `<div class="worng absolute bottom-0 left-0 bg-red-500 px-3 py-2 rounded-lg text-white">
          //   <span>Wrong answer! Please try again!</span>
          // </div>`
          // )
          $('.wrong').fadeIn(300)
          // $('.notificationBox').removeClass("bg-green-500 invisible " )
          // $('.notificationBox').addClass("bg-red-500 visible")
        }
        //$('.notification').fadeIn(300)


        
          
       
        toggle1Function()
        //toggle2Function()
  
        


        console.log(toggle1)
        console.log(toggle2)
      })
    }


    const toQuiz = (el, nextElement, allPlantName, allPlantHabitat, allEatenPart, index) => {
      const toReturn = () => {

        $("main").fadeOut(400);
        //$(".quiz").removeClass('z-10');
        $("main").addClass('z-0');
        $(".quiz").removeClass('z-0');
        $(".quiz").addClass('z-10');
        $(".quiz").fadeIn(400);

        
        $('.quizImageLg').attr('src', el.imageS)
        $('#nexBtn').remove()
        $('.buttomBtns').append(` <button class=" w-24  invisible py-1 bg-green-600 text-white rounded-md focus:ring-4 focus:ring-green-500 focus:ring-opacity-50" id="nexBtn">
        Next
        <svg class=" inline-block w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        
      </button> `)
        let elCommenName = []
        elCommenName.push(el.CommenName)
        appendOptions(allPlantName, el, elCommenName)
        
        var numOfQuesCompleted = [1]
        $(`#nexBtn`).click(
          toNextQuiz(el, nextElement, allPlantName, allPlantHabitat, allEatenPart, numOfQuesCompleted, index)
          
        )
        // get back to the quize list
        $('#allQuizzes').click(
          () => {
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
            $('#quizQues').attr('name', "Plant name")
            $('#quizQues').text("What is the name of this plant in the picture above?")
          }
  
        )  

        
      }        
      return toReturn     
    }

    const toNextQuiz = (el, nextElement, allPlantName, allPlantHabitat, allEatenPart, numOfQuesCompleted, index) => {
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
          $(`svg`).remove(`.status${index}`)
          $(`.content${index}`).append(`<svg class="status${index} w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`)
          $(`.quizSlogan${index}`).text("Great job!")
          $('#quizQues').attr('name', "Plant name")
          $('#quizQues').text("What is the name of this plant in the picture above?")

          return
        //   <div class="badge">
        //   <svg class="inline-block w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        // </div>
          
        }

        
        if(numOfQuesCompleted.length === 5){
          $('#nexBtn').text("Finish")

        }

       

        // show questions arbitrarily 

        if(numOfQuesCompleted.length === 3){
          $('.quizImageLg').attr('src', nextElement.imageS)
          $('#quizQues').attr('name', "Plant name")
          $('#quizQues').text("What is the name of this plant in the picture above?")
          let nextElementCommenName = []
          nextElementCommenName.push(nextElement.CommenName)  
          appendOptions(allPlantName, nextElement, nextElementCommenName)
          numOfQuesCompleted.push(1)

        }else{
          console.log("numOfQuesCompleted.length: " + numOfQuesCompleted.length)
          var x = Math.floor((Math.random() * 2) + 1);
          while(mapQuestions[x] === $('#quizQues').attr('name')){
          var x = Math.floor((Math.random() * 2) + 1);
          }
          $('#quizQues').fadeOut(200)
          setTimeout(() => {

           
              if(x === 1){
                $('#quizQues').attr('name', "Eaten part")
                $('#quizQues').text("Which part of the plant can be eaten?")
                console.log("yes")
                console.log("numOfQuesCompleted.length: " + numOfQuesCompleted.length)
                if(numOfQuesCompleted.length < 3){
                  console.log("yes")
                  appendOptions(allEatenPart, el, el.PartEaten)
                }else if(numOfQuesCompleted.length > 3){
                  appendOptions(allEatenPart, nextElement, nextElement.PartEaten)
                }
                
              }else if(x === 2){
                $('#quizQues').attr('name', "Habitat")
                $('#quizQues').text("Where can we find it?")
                console.log("yes")
                console.log("numOfQuesCompleted.length: " + numOfQuesCompleted.length)
                if(numOfQuesCompleted.length < 3){
                  console.log("yes")
                  console.log("el.Habitat: " + el.Habitat)
                  appendOptions(allPlantHabitat, el, el.Habitat)
                }else if(numOfQuesCompleted.length > 3){
                  appendOptions(allPlantHabitat, nextElement, nextElement.Habitat)
                }

            }
            numOfQuesCompleted.push(1)
    
          }, 200);

        } 
        
        
        
        
        $('#quizQues').fadeIn(200)
        //$(".buttomBtns").empty()
    
        
       // appendOptions(el, )
       
       $('#nexBtn').removeClass("visible")
       $('#nexBtn').addClass("invisible")

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
      console.log()
      var index = 0
      var quizNumber = 1
      var landingPageData = []

      for(i = 0; i <= data.length; i++ ){

        if(i % 2 === 0){
          landingPageData.push(data[i])

        }
      }
      
      //data.slice(0, Math.floor(data.length / 2) + 1)
      landingPageData.forEach(el => {
        
        $('.cardContainer').append(`<div class="card${index} cursor-pointer rounded-lg bg-white border-gray-200 shadow-md overflow-hidden relative transform hover:scale-110  hover:shadow-lg transition ease-out duration-300"> 
        <img src="${el.imageS}" class="h-32 h-48 w-full object-cover">
        <div class="content${index} flex flex-row justify-between px-6 items-center  m-4">
          <div>
            <span class="font-bold ">Quiz ${quizNumber}</span>
            <span class="quizSlogan${index} block text-gray-500 text-sm ">To be completed...</span>
          </div>
          
          <svg class=" status${index} block w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
        </div>

        </div>`)

        var nextElement = null
        if(index < data.length - 1){

          nextElement = data[index + 1]
          console.log("nextElement:" + nextElement.CommenName)
        }
        
       
        $(`.card${index}`).click(          
          toQuiz(el, nextElement, allPlantName, allPlantHabitat, allEatenPart, index)
        );

        
        index += 2
        quizNumber++
      })
      

      
      // const nameOptions = []

      // data.forEach(el => {
      //   if (!nameOptions.includes(el.CommenName)){
      //     nameOptions.push(el.CommenName)
      //   }
      // })








      


    })
    



})

