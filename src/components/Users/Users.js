export function addStudent(phoneNumber, name) {
  if (localStorage.getItem(phoneNumber)) {
    return 'invalid';
  }
  localStorage.setItem(phoneNumber, name);
  return 'valid';
}
function getName(phoneNumber) {
  var name = localStorage.getItem(phoneNumber);
  if (name) {
    return name;
  }
  return 'not found';
}

export default getName;
