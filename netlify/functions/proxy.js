// /.netlify/function/proxy

exports.handler = function(event, context, callback) {
    console.log(event);

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg:"ciaooooo"}),
    })
}