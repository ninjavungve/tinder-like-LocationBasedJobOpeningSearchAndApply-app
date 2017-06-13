import { AsyncStorage } from 'react-native';
import { set_saved_job } from './index';


const async_local_storage_load = () => async (dispatch) => {
  try {
    const savedJobs = JSON.parse(AsyncStorage.getItem('savedJobs'));
    savedJobs.forEach((job) => {
      dispatch(set_saved_job(job));
    });
  } catch (error) {
    console.log(error);
  }
};


export { async_local_storage_load };
