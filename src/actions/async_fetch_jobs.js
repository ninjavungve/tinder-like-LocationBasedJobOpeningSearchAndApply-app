import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import { NavigationActions } from 'react-navigation';
import qs from 'qs';
import { load_jobs, set_loading, set_error_message } from './index';

const JOB_SEARCH_API_URL = 'http://api.indeed.com/ads/apisearch?';

const API_KEY = '2518541344335953';
const SEARCH_RADIUS_MILES = 10;
const SEARCH_QUERY = 'javascript';

const JOB_QUERY_PARAMS = {
  publisher: API_KEY,
  format: 'json',
  v: '2',
  latlong: 1,
  radius: SEARCH_RADIUS_MILES,
  q: SEARCH_QUERY,
};

const createJobApiURL = (zipcode) => {
  const queryParams = qs.stringify({ ...JOB_QUERY_PARAMS, l: zipcode });
  return JOB_SEARCH_API_URL + queryParams;
};


const async_fetch_jobs = callback => async (dispatch, getState) => {
  try {
    dispatch(set_loading(true));
    const { latitude, longitude } = getState().jobs.location;
  // const { data: { myVal } } = await axios.get
    const zipcode = await reverseGeocode({ latitude, longitude });

    const { data: { results: jobs } } = await axios.get(createJobApiURL(zipcode));
    dispatch(load_jobs(jobs));
    callback();
  } catch (error) {
    dispatch(set_error_message(error));
  } finally {
    dispatch(set_loading(false));
  }
};

export { async_fetch_jobs };
