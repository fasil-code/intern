(function($) { 
    $(function() { 
  
      //  open and close nav 
      $('#navbar-toggle').click(function() {
        $('nav ul').slideToggle();
      });
  
  
      // Hamburger toggle
      $('#navbar-toggle').on('click', function() {
        this.classList.toggle('active');
      });
  
  
      // If a link has a dropdown, add sub menu toggle.
      $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.navbar-dropdown').slideToggle("slow");
  
        // Close dropdown when select another dropdown
        $('.navbar-dropdown').not($(this).siblings()).hide("slow");
        e.stopPropagation();
      });
  
  
      // Click outside the dropdown will remove the dropdown class
      $('html').click(function() {
        $('.navbar-dropdown').hide();
      });
    }); 
  })(jQuery); 

  var main2=document.getElementById('main2')
      var main1=document.getElementById('wrap');
      var test=document.getElementById('test');

      test.addEventListener('click',function(){
        main2.style.display='none'
      })
    
   // <!-- {% if table_one %}
//   <td class="data">{{results[i][2]}}</td>
//   <td class="data">{{results[i][3]}}</td>
//   <td class="data">{{results[i][5]}}</td>
// {% endif %}
// {% if table_two %}
//   <td class="data">{{results[i+size][4]+results[i+size][5]}}</td>
//   <td class="data">{{results[i+size][6]+results[i+size][7]}}</td>
//   <td class="data">{{results[i+size][8]+results[i+size][9]+results[i+2][10]}}</td>
//   <td class="data">{{results[i+size][11]+results[i+size][12]+results[i+2][13]+results[i+2][14]}}</td>

//   <td class="data">{{results[i+size][15]+results[i+size][16]}}</td>
//   <td class="data">{{results[i+size][15]+results[i+size][16]}}</td>
//   <td class="data">{{results[i+size][15]+results[i+size][16]}}</td>
//   {% endif %}
//   <td class="data"><a href="{{ url_for('generate_pdf') }}?id={{results[i][0]}}"  target="blank">Report</a></td>
//    