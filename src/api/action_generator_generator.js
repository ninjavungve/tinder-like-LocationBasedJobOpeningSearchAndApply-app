const SET_TYPE_PRESTRING_LENGTH = 4;
const LOAD_TYPE_PRESTRING_LENGTH = 5;
const CLEAR_TYPE_PRESTRING_LENGTH = 6;
const SET_CASE = 'S';
const LOAD_CASE = 'L';
const ASYNC_CASE = 'A';
const CLEAR_CASE = 'C';


const action_generator_generator = (action_type, argument_type) => {
  const type = action_type;
  const type_type = type.charAt(0);
  let type_argument = '';
  let type_name = '';
  let function_body = '';
  switch (type_type) {
    case SET_CASE:
      type_name = type.substring(SET_TYPE_PRESTRING_LENGTH, type.length);
      type_argument = `${argument_type}_${type_name}`;
      function_body = `(${type_argument}) => { return { type: ${type}, payload: ${type_argument}}; }`;
      return type_argument => ({ type, payload: type_argument });
    case LOAD_CASE:
      type_name = type.substring(LOAD_TYPE_PRESTRING_LENGTH, type.length);
      type_argument = `${argument_type}_${type_name}`;
      function_body = `(${type_argument}) => { return { type: ${type}, payload: ${type_argument}}; }`;
      return type_argument => ({ type, payload: type_argument });
        // return for load;
    case CLEAR_CASE:
      type_name = type.substring(CLEAR_TYPE_PRESTRING_LENGTH, type.length);
      function_body = `() => { return { type: ${type}}; }`;
      return () => ({ type });
        // return for clear;
    default:
      break;
  }
};


export { action_generator_generator };
