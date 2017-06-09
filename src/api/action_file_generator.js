const action_types = require('./types');
const fs = require('fs');

const SET_TYPE_PRESTRING_LENGTH = 4;
const LOAD_TYPE_PRESTRING_LENGTH = 5;
const CLEAR_TYPE_PRESTRING_LENGTH = 6;
const ASYNC_TYPE_PRESTRING_LENGTH = 6;

const SET_CASE = 'S';
const LOAD_CASE = 'L';
const ASYNC_CASE = 'A';
const CLEAR_CASE = 'C';

const action_file_generator = (action_type) => {
  const type = action_type;
  const type_type = type.charAt(0);
  let type_name = '';
  let type_argument = '';
  let function_body = ' ';
  switch (type_type) {
    case SET_CASE:
      type_name = type.substring(SET_TYPE_PRESTRING_LENGTH, type.length);
      type_argument = `${type_name}`;
      function_body = `import { ${type} } from 'types';

const ${type.toLowerCase()} = (${type_argument.toLowerCase()}) => {
           return {
               type: ${type},
               payload: ${type_argument.toLowerCase()}
                };
           };

export {${type.toLowerCase()}};`;
      return function_body;
    case LOAD_CASE:
      type_name = type.substring(LOAD_TYPE_PRESTRING_LENGTH, type.length);
      type_argument = `${type_name}`;
      function_body = `import { ${type} } from 'types';
const ${type.toLowerCase()} = (${type_argument.toLowerCase()}) => {
           return {
               type: ${type},
               payload: ${type_argument.toLowerCase()}
           };
       };
export {${type.toLowerCase()}};`;
      return function_body;
    // return for load;
    case CLEAR_CASE:
      type_name = type.substring(CLEAR_TYPE_PRESTRING_LENGTH, type.length);
      function_body = `import { ${type} } from 'types';
const ${type.toLowerCase()} = () => {
            return {
                 type: ${type}
             };
         };
export {${type.toLowerCase()}};`;
      return function_body;
    // return for clear;
    case ASYNC_CASE:
      type_name = type.substring(ASYNC_TYPE_PRESTRING_LENGTH, type.length);
      // consider using type_name to ditch 'async'
      function_body = `//import async functions here. axios, request etc
//import and destructure sync actions here

const ${type.toLowerCase()} = () => {

    //some code here
    return (dispatch, getState) => {
              // axios firebase code here
              // call sync action generators here
      };
  };

export {${type.toLowerCase()}};`;
      return function_body;
    default:
      break;
  }
};

Object.keys(action_types).forEach((action_type, index) => {
  const type = action_types[action_type];
  const fileWrite = action_file_generator(type);
  const fileName = `${__dirname}/${type.toLowerCase()}.js`;
  fs.writeFileSync(fileName, fileWrite);
});
