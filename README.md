# GooglePlayApp
A simple website to get the details of the top selling free applications on the Google Play Store. 

The website uses data saved in the database. The Data is acquired by crawling through the page on the playstore. MongoDB is used to store the data.

The calls are implemented using Node and Express. The server hosts 3 API endpoints- 
##### - /getAllApps - to fetch all applications 
##### - /getAppById - to fetch details of a specific application
##### - /updateData - to update the data in the DB by making a fresh crawl request

#### Tech Stack- HTML/CSS/JS for Front end, Node.jS for Backend(APIs) and MongoDB for storage.

### Author - umang.kathuria16@gmail.com
