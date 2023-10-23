<p align="center"><img src="logo.jpeg" alt="logo" width="250" align="center"/></p>

# IntelliStream

FireTV IntelliStream leverages advanced AI to account for evolving preferences, and provide diverse recommendations ensuring they spend less time searching and more time immersed in content.

Backend fully hosted on AWS 😄 


## Recommendations using AWS Personalise
MovieLens dataset used for providing recommendations from AWS Personalise. The dataset is uploaded on Amazon S3.

- unstructured data stored on S3. Using unstructured because it can store a large volume of data and we are not worried about the time required as we are not updating real time. Personalise provides recommendations and updated in batch mode.
- aws Personalise used to provide recommendations.

- User authentication is handled by AWS Amplify and AWS Cognito. Amplify proviudes us with user Auth and Cognito User Pools are a user directory that helps you manage and authenticate users. They store user profiles and authentication tokens.
Cognito provides us with a unique user ID , which is mapped to the data stored in S3 buckets.

- our front end queiries to aws lamdba functions using a HTTP api gateway.
Personalise gives us a list of recommended movies for a user. Final2.cvs exists in S3 which maps every movie ID to a tmdb(the movie DB) ID. Now we use TMBD API to fetch movie details ( title , poster , genre , rating) and display it on the front end.

- our interactions include - watch click like dislike

personalize and event trackers work in unison with each other.
Event trackers collect and log user interactions as events. These events are  sent to our data store, Amazon S3.The event data is then preprocessed and formatted to be used as input for Amazon Personalize. The preprocessed data is used to train machine learning models within Amazon Personalize. Personalize creates models that can understand user preferences and generate personalized recommendations.
data updated in batch mode.

- in our front end , we display personalized recommendations for user , top picks and 1 more thing.

- analytics - graphical representation of how many movies per genre did person watch

- accuracy of the recommendations can be calculated simply by measuring how many times does the user watch our recommended movie.

Retrainning of data in Personalise batch mode
batch recommendations are generated for large sets of users in a periodic, offline process. This is useful when you want to refresh or create recommendations for all users simultaneously. 
The data for batch recommendations is typically retrained periodically to keep the recommendations up-to-date. The frequency of retraining depends on factors such as how quickly user behavior and preferences change and the volume of new data collected. The goal is to ensure that the recommendations remain relevant. 
After retraining, you generate batch recommendations for all users or items based on the updated models. These recommendations are then used to provide users with fresh, relevant content or product suggestions.
