import Toast from 'react-native-simple-toast';

function showResponse(response) {
  if (response && response.message) {
    setTimeout(() => {
      Toast.showWithGravity(response.message, Toast.SHORT, Toast.BOTTOM);
    }, 1500);
  }
}

export { showResponse };