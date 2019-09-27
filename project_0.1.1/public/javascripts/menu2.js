let switch0 = true;
let switch1 = false;
let switch2 = false;
let switch3 = false;
let on = 1 ;

getJapan();

const what = document.getElementById('what');
const time = document.getElementById('japan_scj');
const table = document.getElementById('japan_table_div');
const main1 = document.getElementById('main1');
const main2 = document.getElementById('main2');
const main3 = document.getElementById('main3');


main1.addEventListener('click', function() { // 소개
  if(switch1==false) { // 킬때 
    if(switch0==true || switch2==true || switch3==true) { 
      time.style.display="none";
      table.style.display="none";
      switch0=false;
      switch2=false;
      switch3=false;
    }
    what.style.display="block";
    switch1=true;
    on = 1;
  }
  if(on==1){
    main1.style.background="#1AAB8A";
    main2.style.background="black";
    main3.style.background="black";
  }
  });

main2.addEventListener('click', function() { // 시간표
  if(switch2==false) {
    if(switch0==true || switch1==true || switch3==true) {
      what.style.display="none";
      table.style.display="none"
      switch0=false;
      switch1=false;
      switch3=false;
    }
    time.style.display="block";
    switch2=true;
    on = 2;
  }
  if(on==2){
    main1.style.background="black";
    main2.style.background="#1AAB8A";
    main3.style.background="black";}
  
});

main3.addEventListener('click', function() { // 후쿠오카
  if(switch3==false) {
    if(switch0==true ||switch1==true || switch2==true) {
      what.style.display="none";
      time.style.display="none";
      switch0=false;
      switch1=false;
      switch2=false;
    }
    table.style.display="block";
    switch3=true;
    on = 3;
    
  } 
  if(on==3){
    main1.style.background="black";
    main2.style.background="black";
    main3.style.background="#1AAB8A";
  }

  })

  function getJapan(){
    fetch('/japan',{method: 'GET'}).then((response) =>{
      if(response.status == '200'){
        return response.json();
      }
    })
    [

      {
        j_id,
        j_place,
        j_img,
        j_explain,

      },
      {
        j_id,
        j_place,
        j_img,
        j_explain
      },
      {
        j_id,
        j_place,
        j_img,
        j_explain
      }
    ]
      

    .then((result) => {
      var table = document.getElementById('japan_table_div');

      result.map((japan) => {
        var div = document.createElement("div");
        div.setAttribute('id', 'japan_place');
        div.textContent = japan.j_place;
        table.appendChild(div);
        
        var img = document.createElement("img");
        img.setAttribute('src' , japan.j_img);
        img.setAttribute('width' , '800');
        img.setAttribute('height' , '400');
        div = document.createElement("div");
        div.setAttribute('id', 'japan_img');
        div.appendChild(img);
        table.appendChild(div);;
        var explain = document.createElement("div");
        explain.setAttribute('id' , 'japan_explain');
        explain.textContent = japan.j_explain;
        table.appendChild(explain);
      }) 
    })
    .catch((error) => {
      console.error('fetch호출에서 에러발생' + error.message);
    });
}