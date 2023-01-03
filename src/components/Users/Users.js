function checkNumber(phoneNumber) {
  if (localStorage.getItem(phoneNumber)) {
    return true;
  }
  return false;
}

function addStudent(phoneNumber, name) {
  if (checkNumber(phoneNumber)) return false;
  localStorage.setItem(phoneNumber, name);
  return true;
}

function getName(phoneNumber) {
  var name = localStorage.getItem(phoneNumber);
  if (name) {
    return name;
  }
  return 'not found';
}

export { getName, addStudent, checkNumber };
