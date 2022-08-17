module.exports = function validateCpf(strCPF) {
  try{
    var soma = 0;
    var resto;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10)) ) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  } catch(e){
    return false;
  }
};