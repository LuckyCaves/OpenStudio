if(true) { //validacion de sesion ira aqui

} else {
//redirigir a inicio de sesion ira aqui
}

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

let description_input = document.getElementById("description");

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
let c_sku;
let c_image;
let c_description;

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
        tab_button_1.click();
        return;
    }

    if(title_input.value !== "" && year_input.value !== "" && category_input.value !== "none" && media_input.value !== "" && height_input.value !== "" && width_input.value !== "" && stock_input.value !== "" && price_input.value !== "") {
        c_title = title_input.value;
        c_year = year_input.value;
        c_category = category_input.value;
        c_media = media_input.value;
        c_size = width_input.value + " x " + height_input.value;
        c_stock = stock_input.value;
        c_price = price_input.value;
        tab_button_3.click();
        c_sku = c_name.substring(0, 3) + c_title.substring(0, 3) + c_price.toString();
    } else {
        alert("CAMPOS VACIOS");
    }
}

function save_third_tab_values () {
    if(c_name == undefined || c_email == undefined) {
        alert("MISSING FIELDS IN THE FIRST SECTION");
        tab_button_1.click();
        return;
    }

    if(c_title == undefined || c_year  == undefined || c_category  == undefined || c_media == undefined || c_size == undefined || c_stock  == undefined || c_stock  == undefined || c_price == undefined) {
        alert("MISSING FIELDS IN THE SECOND SECTION");
        tab_button_2.click();
        return;
    }

    if(c_image == undefined) {
        alert("PLEASE UPLOAD AN IMAGE")
        return;
    }

    if(c_description == undefined) {
        alert("PLEASE WRITE A DESCRIPTION FOR YOUR PRODUCT")
        return;
    } else {
        c_description = description_input.value;
    }

    let postData = {
        artist: c_name,
        title: c_title,
        year: c_year,
        category: c_category,
        method: c_media, 
        dimensions: c_size,
        price: c_price,
        quantity: c_stock,
        image: c_image
    };

    fetch("/admin_products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (response.ok) {
            console.log("Product created successfully");
        } else {
            // Handle error response
            throw new Error("Failed to create product");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to create product. Please try again.");
    });
}

save_btn_one.addEventListener('click', function () {
    save_first_tab_values();
});

save_btn_two.addEventListener('click', function () {
    save_second_tab_values();
});

save_btn_thr.addEventListener('click', function () {
    save_third_tab_values();
});

Dropzone.autoDiscover = false;
var myDropzone = new Dropzone("#myDropzone", {
    url: "/upload", 
    paramName: "file", 
    maxFilesize: 2, // Maximum file size in MB
    maxFiles: 1, // Limit to one file
    acceptedFiles: "image/*", 
    init: function () {
        this.on('success', function (file, response) {
          c_image = `http://localhost:3000/web/images/${response}`; 
        });
      }
});

myDropzone.on("maxfilesexceeded", function(file) {
    alert("Products may only have one image.");
    this.removeFile(file);
});

