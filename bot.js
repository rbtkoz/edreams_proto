    'use strict'

    const rp = require('minimal-request-promise')
    const botBuilder = require('claudia-bot-builder')
    const fbTemplate = botBuilder.fbTemplate




    function init() {
        return new fbTemplate.generic()
            .addBubble('Travel Buddy','Book flights and research destinations')
            .addImage('http://s03.s3c.es/imag/_v0/770x420/c/7/d/edreams-logo.jpg')
            .get()

    }


     function flightinfo() {

        return new fbTemplate.generic()
            .addBubble('What would you like to do today?', '') //empty
            .addButton('Buy Flights', 'https://www.edreams.net/flights/') //seat
            .addButton('Find Destinations', 'DISCOVER') //upgrade
            .get()

      //   const newMessage = new fbTemplate.Text('What would you like to do?');
      //  return newMessage
      // .addQuickReply('Buy Cheap Flights', 'https://www.edreams.net/flights/')
      // .addQuickReply('Find Destinations', 'DISCOVER')
      // .get();
    }
    


    function mainMenu() {
       
            return new fbTemplate.generic()
            .addBubble('Top Destinations', 'Recommended locations') //empty
            .addButton('NYC', 'NYC') //seat
            .addButton('Sofia', 'FLIGHT') //upgrade
            .addButton('Darwin', 'FLIGHT') //human
            .addBubble('Exotic Destinations', 'Get off the beaten track') //sofia
            .addButton('New Delhi', 'FLIGHT') //airport
            .addButton('Ho Chi Minh City', 'FLIGHT') //flight
            .addButton('Something else?','FLIGHT') // empty
            .get()
    }

    function nycContent(){
         const newMessage = new fbTemplate.Text('What are you in the mood for?');
       return newMessage
      .addQuickReply('Culture', 'FLIGHT')
      .addQuickReply('Food', 'FOOD')
      .addQuickReply('Meet People', 'FLIGHT')
      .addQuickReply('Music', 'FLIGHT')
    .get();

    }

    function food(){

         return new fbTemplate.generic()
            .addBubble('Momofuku','The best ramen you will have in NYC by @ramenfiend')
            .addImage('http://momofukufor2.com/blog/photos/2010/01/momofuku-0346.jpg')
            .addButton('Send to friends', 'FLIGHT') //YESFLIGHT
            .addButton('Directions', 'FLIGHT') //NO FLIGHT
            .get()
    }


   
    function nyc() {
        return new fbTemplate.generic()
            .addBubble('The Big Apple','')
            .addImage('https://www.gentlegiant.com/wp-content/uploads/2015/06/New-York.jpg')
            .addButton('Things to do', 'INFO') //YESFLIGHT
            .addButton('Book flight', 'https://www.edreams.net/flights/') //NO FLIGHT
            .get()
    }


    function healthContent() {

        return new fbTemplate
            .Image('http://big.assets.huffingtonpost.com/sarah-abworkout-005new.gif')
            .get();
    }



    const api = botBuilder((request, originalApiRequest) => {
        console.log(JSON.stringify(request))
        originalApiRequest.lambdaContext.callbackWaitsForEmptyEventLoop = false

        if (!request.postback)
            return rp.get(`https://graph.facebook.com/v2.6/${request.sender}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${originalApiRequest.env.facebookAccessToken}`).then(response => {
                    const user = JSON.parse(response.body)
                    return [
                        init(),
                        // new fbTemplate.ChatAction('typing_on').get(),
                        // new fbTemplate.Pause(1000).get(),
                        `Hi there ${user.first_name}.`,
                        "I am your travel buddy!",
                        flightinfo()
                    ]
                })



        if( request.text === 'FOOD')
            return [
                food()
            ]


        if(request.text === "INFO")
            return [
                nycContent()
        ]


         if (request.text === 'DISCOVER')
             return [
                'Great!',
                'Here are a few ideas based on your feed...',
                mainMenu()
            ]


        if (request.text ==='FLIGHT')
            return [
                'Sorry. I am still learning.',
                "I don't have this knowledge yet"
            ]

        if ( request.text === "NYC")
            return [
                nyc()
            ]


        if (request.text === 'BOOK') {
             fbTemplate.Receipt('Stephane Crozatier', '12345678902', 'USD', 'Visa 2345')
                  .addTimestamp(new Date(1428444852))
                  .addOrderUrl('http://petersapparel.parseapp.com/order?order_id=123456')
                  .addItem('Classic White T-Shirt')
                    .addSubtitle('100% Soft and Luxurious Cotton')
                    .addQuantity(2)
                    .addPrice(50)
                    .addCurrency('USD')
                    .addImage('http://petersapparel.parseapp.com/img/whiteshirt.png')
                  .addItem('Classic Gray T-Shirt')
                    .addSubtitle('100% Soft and Luxurious Cotton')
                    .addQuantity(1)
                    .addPrice(25)
                    .addCurrency('USD')
                    .addImage('http://petersapparel.parseapp.com/img/grayshirt.png')
                  .addShippingAddress('1 Hacker Way', '', 'Menlo Park', '94025',  'CA', 'US')
                  .addSubtotal(75.00)
                  .addShippingCost(4.95)
                  .addTax(6.19)
                  .addTotal(56.14)
                  .addAdjustment('New Customer Discount', 20)
                  .addAdjustment('$10 Off Coupon', 10)
                  .get();
  }


                    // fbTemplate.Receipt(user.first_name + ' ' + user.last_name, '1479020289', 'USD', 'Visa 2345')
                    //     .addTimestamp(new Date(1428444852))
                    //     .addItem('BCN -> JFK')
                    //     .addSubtitle('Qatar Airlines')
                    //     .addQuantity(1)
                    //     .addPrice(635)
                    //     .addCurrency('USD')
                    //     .addShippingAddress('1 Hacker Way', '', 'Menlo Park', '94025', 'CA', 'US')
                    //     .addSubtotal(535.00)
                    //     .addTax(60.19)
                    //     .addTotal(595.19)
                    //     .get();

        

        if (request.text === 'MAIN_MENU')
            return mainMenu()

        if (request.text === 'HEALTH')
            return healthContent()

        // if (request.text === 'SEAT') {


        //     var options = {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Authorization': 'ab16_flightline:4Az8vKgMwOjZHU7DsryP5InoJ19pVCa5'
        //         }
        //     };


        //     return rp.get(`https://xap.ix-io.net/api/v1/airberlin_lab_2016/bookings/1?fields%5Bbookings%5D=passengers%2Ccredit_card%2Ccustomer_address%2Cbooking_number%2Cflight_segments%2Cb_id`, options)
        //             .then(response => {
        //             const APOD = JSON.parse(response.body)
        //             return [

        //                 `"Getting your credit card number: ${APOD.booking.credit_card}`,
        //                 `Getting your booking number: ${APOD.booking.booking_number}`,
        //                 `Getting your address: ${APOD.booking.customer_address}`,
        //                 seatChange()



        //             ]
        //         }
        // )
        // }



    })

    module.exports = api
