document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    console.log('valores leidos del formulario', {username, password})
    login(username, password)
})

function login(username, password){
    localStorage.removeItem('token')
    let message = ''
    let alertType = ''
    const REQRES_ENDPOINT = 'https://dummyjson.com/auth/login'
    fetch(REQRES_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({username, password})
    })
    .then((response) =>{
        if(response.status === 200){
            alertType = 'success'
            message = 'Inicio de sesión exitoso'
            alertBuilder(alertType, message)
            response.json().then((data) => {
                localStorage.setItem('token', data.token)
            }) 
            setTimeout(() =>{
                location.href = 'admin/shopping.html'
            }, 2000)
            
        }
        else{
            alertType = 'danger'
            message = 'Correo o contraseña invalida'
            alertBuilder(alertType, message)
        }
        console.log('respuesta del servicio', response)
        
    })
    .catch((error) =>{
        alertType = 'danger'
        message = 'Ocurrio un error inesperado'
        console.log('error en el servicio', error)
        alertBuilder(alertType, message)
    })

}

function alertBuilder(alertType, message){
    const alert = `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
    document.getElementById('alert').innerHTML = alert
}
