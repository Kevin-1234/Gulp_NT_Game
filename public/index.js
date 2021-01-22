

$(document).ready(() => {

    $(".quiz").fadeOut();
    $.getJSON('plant-data.json', (data) => {
      
      index = 1

      const appendContent = (el) => {


      }

      allPlantName = []
      data.forEach(el => {
        allPlantName.push(el.CommenName)
      })


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

        $(`.card${index}`).click((e) => {
        
          $("main").fadeOut();
          $(".quiz").removeClass('z-10');
          $("main").addClass('z-0');
          $(".quiz").removeClass('z-0');
          $(".quiz").addClass('z-10');
          $(".quiz").fadeIn(400);
  
          
          
          
          
          $('.choices').append(`<input class="" type="checkbox" id="option${index}" name="${el.CommenName}" value="${el.CommenName}">
            <label class=" option${index} cursor-pointer h-10 border-solid border-2 border-blue-400 flex justify-center items-center rounded-full py-3 px-6 hover:bg-blue-400  hover:text-white transition ease-out duration-300" onClick="" for="option${index}"> ${el.CommenName}</label><br>
            `)
          
          

          // change the color of each button when being clicked
          alterColor = (y) => {
            alterColorToReturn = () => {
              $(`.option${y}`).addClass('bg-blue-400')
            } 
            return alterColorToReturn
          }

          for(x = 1; x < i; x++){
            
            $(`.option${x}`).click(
              (e) => {
                $(`.option${x}`).addClass('bg-blue-400')
              }
              //alterColor(x)
              
             )
          }
          
        
          
          //check selected option
          $('#checkBtn').click(() => {
            
            for(x = 1; x < i; x++){
              //console.log($(`#option${x}`).val())
              if ($(`#option${x}`).is(":checked")) {
                
                if ($(`#option${x}`).val() === data[0].CommenName) {
                  console.log("Correct answer")
                  break
                }
                
              }
  
            }
  
            //console.log("Wrong answer")
    
            
    
          })
    
      });




        index++
      })
      
      // const nameOptions = []

      // data.forEach(el => {
      //   if (!nameOptions.includes(el.CommenName)){
      //     nameOptions.push(el.CommenName)
      //   }
      // })








      


    })
    


  $('#nexBtn').click((e) => 
  { 
    $('#quizQues').html("Where can you find it?")

  })


})

