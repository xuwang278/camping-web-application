var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Jenny Lake",
        image: "https://photosforclass.com/download/flickr-1430198323",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },   
    {
        name: "Lonely Time",
        image: "https://photosforclass.com/download/pixabay-691424?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fef3cb00b2af01c22d2524518b7444795ea76e5d004b0144593f0c37ca5eab5_960.jpg&user=Free-Photos",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }, 
    {
        name: "Wonderful Night",
        image: "https://photosforclass.com/download/pixabay-839807?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe136b80728f31c22d2524518b7444795ea76e5d004b0144593f0c37ca5eab5_960.jpg&user=Free-Photos",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err){
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed campgrounds!");
            
        //     // add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log("added a campground")
        //                 // add a few comments
        //                 Comment.create(
        //                     {
        //                         text: "This is a lovely place, but I wish there was internet",
        //                         author: "Homer"
        //                     }, function(err, comment){
        //                         if (err) {
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created new comment");
        //                         }
        //                     }    
        //                 );
        //             }
        //         });
        //     });
        // }
    });
    
    
    
    
}

module.exports = seedDB;