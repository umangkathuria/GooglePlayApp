function getAllAppHandler(request, response){
    console.log("Hello! You will soon ge all the apps at this endpoint");
    response.send({
        status: "OK",
        code: 200,
        message: "Success",
        payload: [
            {
                title: 'MyJio: For Everything Jio',
                appId: 'com.jio.myjio',
                url: 'https://play.google.com/store/apps/details?id=com.jio.myjio',
                icon: 'https://lh3.googleusercontent.com/W6-GRr_DiVmMphLSzsH2Z2fGMdlM8ZLjNhKS93ALvLO3Dkfl6RejtMqlARBoA2dCw0Y',      
                developer: 'Reliance Corporate IT Park Limited',
                developerId: '8426036374624640337',
                priceText: 'FREE',
                currency: undefined,
                price: 0,
                free: true,
                summary: 'Recharges, payments, music, movies, back up, games &amp; more.',
                scoreText: '4.4',
                score: 4.3934107
              },
              {
                title: 'MyJio: For Everything Jio',
                appId: 'com.jio.myjio',
                url: 'https://play.google.com/store/apps/details?id=com.jio.myjio',
                icon: 'https://lh3.googleusercontent.com/W6-GRr_DiVmMphLSzsH2Z2fGMdlM8ZLjNhKS93ALvLO3Dkfl6RejtMqlARBoA2dCw0Y',      
                developer: 'Reliance Corporate IT Park Limited',
                developerId: '8426036374624640337',
                priceText: 'FREE',
                currency: undefined,
                price: 0,
                free: true,
                summary: 'Recharges, payments, music, movies, back up, games &amp; more.',
                scoreText: '4.4',
                score: 4.3934107
              },
              {
                title: 'MyJio: For Everything Jio',
                appId: 'com.jio.myjio',
                url: 'https://play.google.com/store/apps/details?id=com.jio.myjio',
                icon: 'https://lh3.googleusercontent.com/W6-GRr_DiVmMphLSzsH2Z2fGMdlM8ZLjNhKS93ALvLO3Dkfl6RejtMqlARBoA2dCw0Y',      
                developer: 'Reliance Corporate IT Park Limited',
                developerId: '8426036374624640337',
                priceText: 'FREE',
                currency: undefined,
                price: 0,
                free: true,
                summary: 'Recharges, payments, music, movies, back up, games &amp; more.',
                scoreText: '4.4',
                score: 4.3934107
              }
        ]
    })
}

function getAppById(request, response){
    console.log("Hello! You will soon get apps by ID at this endpoint");
    response.send({
        status: "OK",
        code: 200,
        message: "Success",
        payload: {
                title: 'MyJio: For Everything Jio',
                appId: 'com.jio.myjio',
                url: 'https://play.google.com/store/apps/details?id=com.jio.myjio',
                icon: 'https://lh3.googleusercontent.com/W6-GRr_DiVmMphLSzsH2Z2fGMdlM8ZLjNhKS93ALvLO3Dkfl6RejtMqlARBoA2dCw0Y',      
                developer: 'Reliance Corporate IT Park Limited',
                developerId: '8426036374624640337',
                priceText: 'FREE',
                currency: undefined,
                price: 0,
                free: true,
                summary: 'Recharges, payments, music, movies, back up, games &amp; more.',
                scoreText: '4.4',
                score: 4.3934107
            }
    })

}

module.exports.getAllAppHandler = getAllAppHandler;
module.exports.getAppById = getAppById