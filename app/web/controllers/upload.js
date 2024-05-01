
//validar sesion iniciada
//  SI NO: redirigir a inicio de sesion
//get del nombre y del mail del usuario (ya inicio sesion, estos son datos conocidos)
//insertar nombre y mail en campos

//hacer que al dar click a Save en Continue:
//  verifique que todos los campos esten llenos
//      SI NO: Alert
//  guardar en variables los datos en los inputs
//  dar click al boton del siguiente tab

//REPETIR PARA LA SIGUIENTE TAB

//ultimo boton hace lo mismo pero en vez de enviar a la siguiente tab hace un post a la base de datos
//+ investigar como hacer lo de subir las imagenes

//VARS
let name_input = document.getElementById("name");
let email_input = document.getElementById("email");
let check = document.getElementById("checkInfo");

let title_input = document.getElementById("title");
let year_input = document.getElementById("year");
let category_input = document.getElementById("category");
let media_input = document.getElementById("media");
let height_input = document.getElementById("height");
let width_input = document.getElementById("width");
let stock_input = document.getElementById("stock");
let price_input = document.getElementById("price");

let save_btn_one = document.getElementById("btn-1");
let save_btn_two = document.getElementById("btn-2");
let save_btn_thr = document.getElementById("btn-3");

let tab_button_1 = document.getElementById("nav-first-tab");
let tab_button_2 = document.getElementById("nav-second-tab");
let tab_button_3 = document.getElementById("nav-third-tab");

//GLOBAL VARS TO STORE CURRENT PRODUCT BEING ADDED
let c_name;
let c_email;
let c_title;
let c_year;
let c_category;
let c_media;
let c_size;
let c_stock;
let c_price;

save_btn_one.addEventListener('click', function () {
    save_first_tab_values();
});

save_btn_two.addEventListener('click', function () {
    save_second_tab_values();
});

function save_first_tab_values () {
    console.log(name_input.value);
    if(name_input.value !== "" && email_input.value !== "") {
        c_name = name_input.value;
        c_email = email_input.value;
        tab_button_2.click();
    } else {
        alert("CAMPOS VACIOS");
    }
}

function save_second_tab_values () {
    if(c_name == undefined || c_email == undefined) {
        alert("CAMPOS VACIOS EN LA SECCION ANTERIOR");
        return;
    }

    if(title_input.value !== "" && year_input.value !== "" && category_input.value !== "none" && media_input.value !== "none" && height_input.value !== "" && width_input.value !== "" && stock_input.value !== "" && price_input.value !== "") {
        c_title = title_input.value;
        c_year = year_input.value;
        c_category = category_input.value;
        c_media = media_input.value;
        c_size = width_input.value + " x " + height_input.value;
        c_stock = stock_input.value;
        c_price = price_input.value;
        tab_button_3.click();
    } else {
        alert("CAMPOS VACIOS");
    }
}

if(true) { //validacion de sesion ira aqui

} else {
//redirigir a inicio de sesion ira aqui
}