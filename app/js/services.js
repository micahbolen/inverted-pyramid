'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
value('version', '0.1').
value('inverted-pyramid', 

{
    "version":0.1,
    "segments": [
      { name:"Some",                 hits:25000, convRate:"100%", color:"rgb(119,107,188)" },
      { name:"Super",                hits:16500, convRate:"66%",  color:"rgb(0,116,140)"   },
      { name:"Awesome",              hits:12000, convRate:"48%",  color:"rgb(0,199,211)"   },
      { name:"Fabricated",           hits:8000,  convRate:"32%",  color:"rgb(0,176,129)"   },
      { name:"Dynamic Data Points",  hits:3500,  convRate:"14%",  color:"rgb(0,123,0)"     }
    ]
    
}

);
