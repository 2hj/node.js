//서버에 보내기전 
document.getElementById('join-form').addEventListener('submit',(e) => {
  var u_userId = document.getElementById('id_join').value.trim();
  var u_name = document.getElementById('name_join').value.trim();
  var u_password = document.getElementById('password_join').value.trim();

  //정규식
  var idReg1 = /[^a-z0-9-_]/g;//영문 소문자, 숫자, 특수기호 - _ 를 제외한 모든 값
  var idReg2 = /[a-z0-9-_]{5,20}/g;//영문 소문자, 숫자, 특수기호 - _ 로 이루어져있고 5~20사이의 길이인 것만
  var idReg3 = /[a-z0-9-_]{21,}/g;//영문 소문자, 숫자, 특수기호 - _ 로 이루어져있고 21이상의 길이인 것만
  var nameReg = /[^A-Za-z가-힣]/g;//한글, 영문 대 소문자 외의 모든 값
  var passReg1 = /\s/g;//공백, 탭, 용지 공급 등을 비롯한 모든 공백 문자들
  var passReg2 = /\S{8,16}/g;//공백, 탭, 용지 공급 등을 비롯한 모든 공백 문자가 아닌 값들 중 8~16사이의 길이인 것만
  var passReg3 = /\S{17,}/g;//공백, 탭, 용지 공급 등을 비롯한 모든 공백 문자가 아닌 값들 중 17이상의 길이인 것만
  var passReg4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;//모든 한글 문자들

  var idCheck1 = idReg1.test(u_userId);
  var idCheck2 = idReg2.test(u_userId);
  var idCheck3 = idReg3.test(u_userId);
  var nameCheck = nameReg.test(u_name);
  var passCheck1 = passReg1.test(u_password);
  var passCheck2 = passReg2.test(u_password);
  var passCheck3 = passReg3.test(u_password);
  var passCheck4 = passReg4.test(u_password);
  console.log('idcheck1: '+!idCheck1);
  console.log('idcheck2: '+idCheck2);
  console.log('idcheck3: '+!idCheck3);
  console.log('namecheck: '+!nameCheck);
  console.log('passcheck1: '+!passCheck1);
  console.log('passcheck2: '+passCheck2);
  console.log('passcheck3: '+!passCheck3);
  console.log('passcheck4: '+passCheck4);
  if(idCheck1 || !idCheck2 || idCheck3) {
    e.preventDefault();
    return alert('ID는 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.');
  }else if(nameCheck) {
    e.preventDefault();
    return alert('이름은 한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)');
  }else if(passCheck1 || !passCheck2 || passCheck3) {
    e.preventDefault();
    return alert('비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.');
  }

  //form.submit;
});