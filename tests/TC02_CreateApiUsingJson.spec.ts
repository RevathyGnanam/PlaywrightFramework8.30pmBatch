import{test,expect} from '@playwright/test'
import fs from 'fs'

test('create post request using json body',async({request})=>{

   //read data from json
   const jsonFile ="testdata/post_request_body.json";
   const requestBody = JSON.parse(fs.readFileSync(jsonFile,'utf-8'))


const response = await request.post('/booking',{data:requestBody})

const responseBody =await response.json()
console.log(responseBody)

//validate status
expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)

//validate booking
const booking = responseBody.booking
expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

    //validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
            checkin: requestBody.bookingdates.checkin,
            checkout: requestBody.bookingdates.checkout,
        });

})