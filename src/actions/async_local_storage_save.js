import { AsyncStorage } from 'react-native';


const async_local_storage_save = () => async (dispatch, getState) => {
  try {
    const { savedJobs } = getState().jobs;
    await AsyncStorage.setItem('savedJobs', JSON.stringify(savedJobs, undefined, 2));
  } catch (error) {
    console.log(error);
  }
};


export { async_local_storage_save };
