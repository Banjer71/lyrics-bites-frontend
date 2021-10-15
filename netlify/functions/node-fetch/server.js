const fetch = require('node-fetch')

const handler = async (event, context) => {
  console.log('event: ', event)
  console.log('context: ', context)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
  const url = `https://lyrics-bites.herokuapp.com/`
  try {
    const response = await fetch(url, {
      headers,
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }

// exports.handler = async (event) => {
//   const headers = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "Content-Type",
//     "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//   };
//   if (event.httpMethod === "OPTIONS") {
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({ message: "Successful preflight call." }),
//     };
//   } else if (event.httpMethod === "POST") {
//     const { name } = JSON.parse(event.body);
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({ message: "Hello, " + name }),
//     };
//   }
// };

// let HEADERS = {
//   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
//   'Content-Type': 'application/json', //optional
//   'Access-Control-Allow-Methods': 'POST, OPTIONS',
//   'Access-Control-Max-Age': '8640'
// }

//This solves the "No ‘Access-Control-Allow-Origin’ header is present on the requested resource."

// HEADERS['Access-Control-Allow-Origin'] = '*'
// HEADERS['Vary'] = 'Origin'

// exports.handler = async function (event, context) {
//   try {
//     if (event.httpMethod === 'OPTIONS') {
//       return { statusCode: '204', HEADERS }
//     }
//     if (event.httpMethod === 'POST') {
//         const body = JSON.parse(event.body)
//         //Your code goes here

//        return {
//          statusCode: 200,
//          body: 'Success',
//          HEADERS
//        } 
 
//     }
//     return {
//       statusCode: 401,
//       HEADERS
//     }
//   } catch (e) {
//     console.error(e)
//     return {
//       statusCode: 500,
//       body: e.toString()
//     }
//   }
// }
