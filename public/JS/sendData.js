var role = document.getElementById('roles')
var email = document.getElementById('email')
var password = document.getElementById('password')
var usn = document.getElementById('usn')

document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault()
  alert('FORM SUBMITTED')
  console.log(email.value, password.value, usn.value)
  sendData()
})


role.addEventListener('change', (e) => {
  console.log(role.value)
  if(role.value === 'student'){
    usn.style.display = 'inline'   
  }else{
    usn.style.display = 'none'
  }
})


const sendData = () => {

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')


  if(role.value === 'student'){
    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({
        "type": 'student',
        "email": email.value,
        "password": password.value,
        "usn": usn.value
      }),
      headers: headers
    }).then(res => console.log(res))
  }else if(role.value === 'alumni'){
    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({
        type: 'alumni',
        email: email.value,
        password: password.value,
      })
    }).then(res => console.log(res))
  }else{
    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({
        type: 'alumni',
        email: email.value,
        password: password.value,
      })
    }).then(res => console.log(res))
  }
}