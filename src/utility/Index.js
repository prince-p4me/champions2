import Toast from 'react-native-simple-toast';

function showResponse(response) {
  if (response && response.message && !response.message.includes("Data") && !response.message.includes("Found")) {
    setTimeout(() => {
      Toast.showWithGravity(response.message, Toast.SHORT, Toast.BOTTOM);
    }, 1500);
  }
}

function showToast(message) {
  Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
}

function getFormattedAdress(data, coords) {
  let obj = {
    full_address: data?.formatted_address,
    state: "",
    pin: "",
    city: '',
    lat_long: (coords.latitude + "," + coords.longitude)
  };
  for (let i = 0; i < data.address_components.length; i++) {
    if (data.address_components[i].types.includes("administrative_area_level_1")) {
      obj.state = data.address_components[i].long_name;
    }
    if (data.address_components[i].types.includes("administrative_area_level_2")) {
      obj.city = data.address_components[i].long_name;
    }
    if (data.address_components[i].types.includes("postal_code")) {
      obj.pin = data.address_components[i].long_name;
    }
  }
  return obj;
}

export { showResponse, showToast, getFormattedAdress };
