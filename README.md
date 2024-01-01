# DiveGo (Web Version) 
Built with the dream of making every dive hold the chance for an unforgettable encounter with a sea creature 

# Built With
React-js
Supabase (BAAS)
Firebase (hosting)
react-google-maps
react-alice-carousel
use-places-autocomplete
use-supercluster
exifr

# Live at
https://divegoweb.netlify.app

!["Web Version QR"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/Home.png)

# Current Features:

Map Interface that Displays Anchor Icons to represent dive sites and heat map points to show location and number of sea creature sightings 

Map will load to user's/device current location (once permission is granted) if not granted it will load to BC Canada as default

Icon Clustering to maintain map performance when large amount of data are on screen.

Google Places API integration to allow users to jump the map to other places in the world by inputting a town/city name.

Dive Site search tool, list will auto filter to dive sites in the maps current view, upon selecting a dive site the map will pan and zoom to that dive site and place a yeloow indicator for 2 seconds to help users find it.

Animal Photo Carrousel that users can use to select which animals they would like the heatmap and dive sites to show. Photos diplayed will update as the map moves to show animals that have been sighted in the maps area.

Histogram showing chart that displays frequency of sightings by month of selected sea creature(s), chart will update as the map is moved.

Dive Site submission form with "I'm at the dive site" button that takes users current location to serve as dive site GPS location.

Photo Submission form, upload a photo if it contains a created date and/or GPS EXIF data it will be used as the date and lat/lng info.

Pin drop feature, for photos with no GPS EXIF data, place the draggable pin anywhere on the map and tap the "set pin" button to relay the pins GPS location as the sea creature sightings lat/lng coordinates. 

Dive site animal photo gallery, animal sightings within a pre-determined GPS radius are displayed when tapping on a specific dive site anchor icon.

Photo flagging feature allowing users to ID incorrectly identifued sea creature photos or to make copy write claims on submitted photos

Dive Site flagging feature allowing users to report incorrect dive site names or GPS locations

How to Guide, explains most features of the app for new users. 

Login/Logout/Register system with persistent login (user stays logged in even after closing browser, unless they deliberately log out) with OAuth integrations for Google and Facebook.

Three Interactive User guides designed to get users acclimated to how to use the app fast:
Intro Guide - map navigation and how to find active areas, also completes user profile.
Dive Sites - how to use the search tool to check if a site is in the app and add a new site if not.
Sighting Submissions - how to add a sea creature sighting, inclduing how to make use of all submission features.


Backend integration with Supabase 

# Admin section for:

User dive site submission and user photo submission validation before committing data to the map for others to view

# In Progress Features:

Remaining feature that are present in the mobile verion that have not yet been added to the desktop version


# Planned Features:

Automated photo validation using machine learning 
Automated animal ID from photo machine learning 


# ScreenShots
!["Screenshot of Sign In Screen"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/screenshots/HomeScreen.png)
!["Screenshot of Map Screen"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/screenshots/MapPage.png)
!["Screenshot of Dive Site Gallery"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/screenshots/AnchorPhotos.png)
!["Screenshot of Dive Site Form"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/screenshots/SiteSubmit.png)
!["Screenshot of Photo Upload Form"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/screenshots/PhotoSubmit.png)
!["Screenshot of Guide System"](https://github.com/Freem11/divego/blob/master/wetmap/src/images/screenshots/Guide.png)


