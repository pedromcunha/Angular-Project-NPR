												Trailer Parke
=========================================================================================================
This Application was created by Pedro M. Cunha. The Google Search API and the Youtube API (two public facing APIs) have been integrated into the application. Below I'll explain my process and guide you through the challenges you may face building your own application that uses these APIs. I'd also like to point out that this web application uses the Angular framework.

											Researching The API
=========================================================================================================
My first step was to research the Youtube API, which was my main source of data for this project. I spent a healthy amount of time looking at this page: 

https://developers.google.com/youtube/2.0/developers_guide_protocol_api_query_parameters

That page which is on the google developers website will guide you to crafting the perfect url for your query. I know for me it was tough to get the right video for my trailers but if you take note of the term used in every video you should find what you're looking for. My results were more accurate when I used the 'movies' category (very obvious to me now but not in the beggining as I was using an invalid category name).

Along with the Youtube API I also used the Google autocomplete API. It was very easy to implement and I'm still getting around to perfecting it because sometimes unrelated topics will appear. In the end I made sure the query was above a certain number of characters (5) before allowing autocomplete to trigger. You can read more about the API here:

http://www.google.com/support/enterprise/static/gsa/docs/admin/70/gsa_doc_set/xml_reference/query_suggestion.html

											Building The Components
=========================================================================================================
Now we get to the juicy part. I'm a bit rusty with my Angular (having been accustomed to jQuery for the past 4 months) but I stuck it out. Angular is a great framework, if you know what you're doing. I started building the application on a single javascript file but then it obviously got too big and messy. One important thing to note is that you should always think about the future of your application. The key to scaling an application is the file structure and adhereance to the framework it's built upon. I had to refactor my code to fit these requirements. I quickly modularized all of my code and then restructured the javascript into four major components: controllers, directives and filters (the last one should be services but I didn't need any at the time of creating this application). Although the files looked slimmer and alarming (I felt like my app wasn't big enough), that is sometimes the point. Smaller and more organized code base is always better for maintenance. 

											Four (or three?) Major Components
=========================================================================================================
I would say probably the most important file in this application is the controller module file. In that file I built the core 'engine' of the application. You have the controller responsible for fetching the youtube urls and truncating them to the proper url (thanks to rejection from safari and firefox). Then you have the controller responsible for containing and interacting with the genres. Finally, the last controller dealt with the auto complete functionality of the input box.

For the filters I ended up having to make a filter that capitalized the first letter of the genres (that way if more genres or categories were created in youtube I could always use the same filter).

In terms of directives I created a directive that waited to an enter key and then ran a function. It's a great little directive that's light and can be reused in many situations.

The rest of the application is a little bit of SaSS (ok, all of it is SaSS) and some custom font files. I'm not much of an artist but I tried my best.

											Looking Forward
=========================================================================================================
I had a ton of fun building this little app and I'd like to continue it in the future. I think I've laid a solid ground for it to be built upon. In the next iteration I'd like to integrate the rotten tomatoes API, which you can check out here: http://developer.rottentomatoes.com/

My reasons for wanting to put in this API is because I think that the rating functionality is great. I can see many ways of integrating that into the app. Such as a feed on the right hand side showing the user the hottest movies on rotten tomatoes. A user may then check out the trailer for the movie. It would also help to potentially switch the google autocomplete api for the rotten tomatoes api because their focus will be towards movies and shows. 

I was also thinking about adding some mobile media queries in the SaSS and creating a mobile version of this application. Haven't thought much more about that other than it would be a neat idea. 

 											Testing the App
=========================================================================================================
If anyone reading this would like to try out the app there is a github page hosting it currently: http://pedromcunha.github.io/Trailer-Parke/

If you'd like to email me with any feedback please contact me at pedro.spinsomewebs@gmail.com. I look forward to hearing from anyone interested in collaborating or just talking about angular. 

Thanks for reading!