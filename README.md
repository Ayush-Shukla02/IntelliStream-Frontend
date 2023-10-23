<p align="center"><img src="logo.jpeg" alt="logo" width="250" align="center"/></p>



<h1>INTELLISTREAM</h1>

FireTV IntelliStream leverages advanced AI to account for evolving preferences, and provide diverse recommendations ensuring they spend less time searching and more time immersed in content. The Frontend is built using Reactjs and backend is fully hosted on AWS.


<h2>PHASE 1 - Prototype</h2>


<h3>WORKFLOW</h3>

**User Authentication:**
AWS Amplify and AWS Cognito handle user authentication. Amplify provides a user authentication interface. Cognito User Pools act as user directories for user management and authentication. Cognito User Pools store user profiles and authentication tokens. A unique user ID from Cognito is mapped to S3 bucket data.
**System Architecture:**
Frontend communicates with AWS Lambda functions via an HTTP API Gateway. This architecture ensures efficient data flow and request handling. 
**Movie Recommendations:**
AWS Personalize provides personalized movie recommendations. A mapping file ("Final2.csv") in an S3 bucket connects movie IDs to TMDb IDs. TMDb API fetches movie details, including title, poster, genre, and rating. This data enriches the frontend for user display. 
**User Interactions:** 
User interactions include activities like watching, clicking, liking, and disliking movies.These interactions contribute to user profiles and personalized recommendations.


<h3>AWS PERSONALIZE - working and retraining</h3>

**MovieLens Dataset and AWS Personalize:**
The MovieLens dataset is leveraged to generate personalized recommendations using AWS Personalize.This dataset is stored in an unstructured format on AWS S3.
**Unstructured Data for Scalability:**
Storing data in an unstructured manner is chosen for its cost-efficiency and scalability benefits.This approach is particularly suitable for accommodating substantial data volumes.Real-time updates are not the focus, allowing for extensive data storage without time constraints.
**AWS Personalize Operation:**
AWS Personalize provides recommendations and updates data in batch mode.Personalize and event trackers work in tandem.
**Event Tracking and Data Flow:**
Event trackers collect and log user interactions, categorizing them as events.These events are sent to an AWS S3 data store for further processing.The preprocessed data is formatted for use as input in AWS Personalize.
**Machine Learning Models in AWS Personalize:**
Preprocessed data is used to train machine learning models within AWS Personalize.These models understand user preferences and generate personalized recommendations.
**Batch Mode for Data Updates:**
Data is updated in batch mode to ensure recommendations remain up-to-date.Batch recommendations are generated periodically for large sets of users in an offline process.The frequency of retraining depends on factors such as how quickly user behavior and preferences change and the volume of new data collected. The goal is to ensure that the recommendations remain relevant. 







<h2>PHASE 2 - Basic Enhancements</h2>

In order to establish a substantial competitive advantage relative to existing recommender systems, we believe that Intellistream should possess the capability to integrate evolving user emotional states when suggesting content.To accomplish this, we propose an approach leveraging user reviews for movies, accessible in the "tags.csv" dataset. We will employ sentiment analysis techniques on this dataset to understand the mood associated with each movie. Then, we'll assess the user's mood and recommend movies that match their current emotions.

**Judging Users Mood**
Naive Method: Explicitly ask the user what genre they are interested in currently and provide recommendations according to their input.
Interaction Analysis: The system can track a user's interaction with different genres over time. For instance, if a user frequently watches dramas or sad movies, it might suggest a preference for such genres, possibly reflecting a particular mood.
Rating Analysis: analyzing the ratings and reviews given by a user to different genres can provide insights into their preferences and possibly their mood.
Genre Tracking/Watch History: Observing the sequence of genres a user interacts with can also be useful in judging user mood.

**Filtering in AWS Personalize**
Filtering in AWS Personalize allows you to narrow down the set of recommended items by applying certain conditions or filters. This is particularly useful when you want to ensure that the recommendations meet specific criteria. In our use case , we can filter movies with genres which map to users’ current moods and suggest recommendations accordingly.



  






<h2>Phase 3 - suggest name for this i forhot what jissu said</h2>

After encapsulating user mood into our recommender system , we now want to judge users’ likings and preferences before recommending them content to stream.
We want to maintain a user profile which contains information about user’s interest in different genres. Doing so will enable us to suggest collaborative recommendations . 

**Key Idea:**
We're incorporating an inbuilt video player into our system to showcase movie trailers of recommended films. We're taking it a step further by conducting frame-by-frame analysis of these trailers to identify the various moods, genres, and concepts within specific scenes.By using this approach, you can create a more dynamic and interactive recommendation system that tailors suggestions based on the user's interaction with different elements of the movie trailer

**Mood and Genre Categorization:**
Categorize the moods, genres, and concepts recognized in the trailer into predefined groups. This could involve labeling scenes as "romantic," "action", "comedy," "dramatic”, and so on.
Develop a structured system of moods and genres that can be employed by the recommendation system.
**User Preference Profiling:**
Build and update user profiles based on their interactions with the movie trailer. Record the user's preferences for different moods, genres, and concepts.
**Recommendation Engine:**
Integrate the user interaction and preferences into your recommendation engine.
Use the mapping of trailer content to genres, moods, and concepts to recommend full-length movies that align with the user's preferences. For example, if a user enjoyed action-packed scenes in a trailer, the system can recommend action movies with similar scenes or moods.




<h2>PHASE 4 - Future Scope </h2>
Once Intellistream is fully implemented, it's essential to maintain an iterative approach, consistently refining based on feedback and technological advancements.

<h3>Business Relevance/Scope/Opportunity:</h3>

**Audience Expansion:** 
As Intellistream refines its recommendation engine, it could attract a broader audience, from niche movie buffs to mainstream viewers, enhancing Intellistream’s market share.

**Monetization Channels:** 
Precise recommendations mean users could be more inclined to purchase or rent premium content, providing a potential revenue boost. Additionally, partnerships with content producers can be established for exclusive early releases.

**Brand Loyalty:** 
A system that ‘understands’ user preferences can enhance brand loyalty. Satisfied users are more likely to recommend FireTV to peers, organically increasing its user base.
Personalized Ad Recommendations: Beyond content, tailor ads to individual users, ensuring they are relevant, thereby increasing click-through rates and potential purchases.

<h3>Improvements/Modifications/More Features</h3>

**Cross-device Integration:** 
Recommendations can be optimized based on user activity across other Amazon devices or services, like Kindle or Amazon Music, for a more holistic understanding of preferences.

**Predictive Analysis:** 
Use AI to predict future content trends or genres that will be popular, ensuring FireTV always stays one step ahead in content procurement and production.

**Multilingual Voice Commands:** 
Implementing voice recognition to enhance user experience by allowing user queries that follow the pattern "find me something similar to <this>." This integration must be designed to comprehend multiple languages and dialects, catering to a global audience.




