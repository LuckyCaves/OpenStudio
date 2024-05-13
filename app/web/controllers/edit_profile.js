let temp_mail;
let temp_name;

function getUserInfo() {
    return fetch('/user-info')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                temp_mail = data.email;
                temp_name = data.name;
                document.getElementById("Artist-Name").innerHTML = temp_name;
                document.getElementById("Edit-email").defaultValue = temp_mail;
            } else {
                console.error('Error obtaining the user data:', data.message);
            }
        })
        .catch(error => {
            console.log(response);
            console.error('Error request:', error);
        });
}

getUserInfo();
document.getElementById("Edit-password").defaultValue = "New password";

document.getElementById("dimiss-edits").addEventListener('click', function () {
    window.location.href = '/profile';
});

document.getElementById("delete-profile").addEventListener('click', function () {
    let data = {
        email: temp_mail
    };

    fetch(`/delete-user`, {
        method: 'DELETE',
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo eliminar el producto');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // "eliminado con éxito"
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});

document.getElementById("save-edits").addEventListener('click', function () {
    if(document.getElementById("Edit-password").value !== "" && document.getElementById("Edit-email").value !== "") {
        let updateUser = async () => {
            let data = {
                email: temp_mail, // Current email
                newEmail: document.getElementById("Edit-email").value, // New email
                newPassword: document.getElementById("Edit-password").value // New password
            };
        
            try {
                const response = await fetch('/update-user', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                const result = await response.json();
                console.log(result); 
            } catch (error) {
                console.error('Error:', error);
            }
        }
        updateUser();
        alert("USER INFORMATION UPDATED SUCCESFULLY");
    } else {
        alert("NEW EMAIL AND/OR PASSWORD CANNOT BE EMPTY");
    }
});

window.onload = function() {
    
};