navigator.geolocation.watchPosition((position) => {

    axios({

        method: "POST",
        url: "/",
        data:{

            lat: position.coords.latitude,
            lon: position.coords.longitude
        }
    })
},
(error) => {
    if (error.code == error.PERMISSION_DENIED){
        
        alert("For the app to run properly, you must grant the permision to access your location.")
    }
});    