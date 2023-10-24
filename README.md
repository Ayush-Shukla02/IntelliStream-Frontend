<p align="center">
  <img src="logo.jpeg" alt="IntelliStream Logo" width="250"/>
</p>

# 🎬 INTELLISTREAM 🎬

**FireTV IntelliStream** leverages advanced AI to account for evolving preferences, providing diverse recommendations, ensuring users spend less time searching and more time immersed in content. The frontend is powered by Reactjs and the backend is fully hosted on AWS.

---

## 🖼️ FrontEnd Demo 🖼️

_TODO: Insert screenshots here_

---

## 🚀 PHASE 1 - Prototype 🚀

### Workflow:

<p align="center">
  <img src="public/readme/auth.png" alt="Authentication Flow" width="750"/>
</p>

- **User Authentication:** AWS Amplify & AWS Cognito manage user auth. Cognito User Pools store user profiles & tokens. Unique user IDs from Cognito map to S3 data.
  
- **System Architecture:** Frontend communicates with AWS Lambda functions via HTTP API Gateway for efficient data flow.

- **Movie Recommendations:** AWS Personalize provides movie recommendations. Movie details are fetched from TMDb API.

- **User Interactions:** Activities like watching, clicking, and liking influence user profiles and personalized recommendations.

<p align="center">
  <img src="public/readme/recommendation.png" alt="Recommendation Flow" width="750"/>
</p>

### AWS PERSONALIZE - Working and Retraining:

- **Dataset:** Uses the MovieLens dataset stored on AWS S3.

- **Unstructured Data for Scalability:** Data is stored unstructured for scalability.

- **AWS Personalize Operation:** Recommendations and updates are in batch mode.

- **Event Tracking:** Tracks user interactions and logs them as events. Preprocessed data then feeds into AWS Personalize.

- **Machine Learning Models:** AWS Personalize trains models for personalized recommendations.

- **Batch Mode for Data Updates:** Recommendations stay updated in batch mode.

<p align="center">
  <img src="public/readme/interaction.png" alt="User Interaction" width="750"/>
</p>

---

## ⚙️ PHASE 2 - Basic Enhancements ⚙️

Proposing an approach leveraging user reviews for movies to integrate evolving user emotional states into recommendations.

### Judging Users Mood:

- **Naive Method:** Directly ask users their current genre preference.
  
- **Interaction Analysis:** Track genre interactions over time.
  
- **Rating Analysis:** Understand preferences through ratings and reviews.
  
- **Genre Tracking/Watch History:** Track sequence of genre interactions.
  
- **Filtering in AWS Personalize:** Filter movies that match users’ current moods.

---

## 🌟 Phase 3 - Advanced Mood Insights 🌟

Delve deeper into understanding user's likings and preferences.

### Key Idea:

- **Video Player for Trailers:** Introduce an inbuilt video player to showcase movie trailers. Analyze trailers frame-by-frame for moods, genres, and concepts.

- **Mood and Genre Categorization:** Categorize recognized elements in trailers.

- **User Preference Profiling:** Update user profiles based on trailer interactions.

- **Recommendation Engine:** Recommendations based on trailer content.

---

## 🌌 PHASE 4 - Future Scope 🌌

### Business Relevance/Scope/Opportunity:

- **Audience Expansion:** Attract a broader audience.

- **Monetization Channels:** Boost revenue through precise recommendations.

- **Brand Loyalty:** Enhance user retention.

- **Personalized Ad Recommendations:** Tailor ads to individual users.

### Improvements/Modifications/More Features:

- **Cross-device Integration:** Integrate activity from other Amazon devices.

- **Predictive Analysis:** Predict future content trends.

- **Multilingual Voice Commands:** Implement multilingual voice recognition.

