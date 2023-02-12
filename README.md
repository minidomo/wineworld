# IDB Group 12: WineWorld

## Group information

IDB 12 Members
- Austin Barret
- JB Ladera
- Ryan Parappuram
- Saniya Shaju
- Joshua Yin

## WineWorld: Project Proposal

Our WineWorld website allows users to explore the fascinating world of wine, vineyards, and wine regions. With a focus on promoting civic engagement, our website provides an in-depth look at the wine industry, making it an essential resource for anyone who is interested in wine, whether they're a beginner, intermediate, or seasoned wine connoisseur. WineWorld provides a wealth of information about different wines, vineyards, and wine regions, empowering users to make informed decisions about which wines to try, where to go to taste them, and what they can expect from each wine. WineWorld is an essential resource for anyone who is looking to deepen their understanding of the wine industry, and it's a great way for wine enthusiasts to connect with others who share their passion for wine.

## APIs

- Wines: https://sampleapis.com/api-list/wines
- Vineyards: https://fusion.yelp.com/  
- Regions: https://tripadvisor-content-api.readme.io/reference/overview

## Models

**Wines**
- Instances: ~10,000
- Attributes: winery, wine, average rating, number of reviews, type (red, white, etc.), location
- Media: bottle image, grid card to this wine's region
- Relations: link wine to wine region (obtained by location attribute)

**Vineyards**
- Instances: ~3,000
- Attributes: name, price level, rating, review count, country, distance from search location
- Media: cover photo, popular wines, grid cards for regions in this vineyard's country
- Relations: link vineyards to regions in the vineyard's country

**Regions**
- Instances: ~500
- Attributes: name, country, rating, review count, tags (stuff the region has) (filterable e.g. "Sights & Landmarks", "Food & Drink"), trip types (what kinds of trips this region would be good for) (filterable e.g. "Business", "Couples")
- Media: map, grid cards for popular wines and vineyards in this region
- Relations: link regions to popular wines and vineyards in this region

## Organizational technique

Similar format of previous semesters with one page per model with grid view of each model’s instances.

## Questions

1. What are the different types of wine?
2. What are some popular vineyards in a specific wine region?
3. I'm taking a trip soon, and I love wine. How can I compare different wine regions to find the best travel destination for me?
