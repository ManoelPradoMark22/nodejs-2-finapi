module.exports = function validateHexa(strHexa) {
  try{
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    return regex.test(strHexa);

  } catch(e){
    return false;
  }
};