# Weather-widget

> Stack: Vue 3, Typescript, Vite, Pinia(store), Composition API, Vuetify, Tailwind.css

[Demo](https://gregort94.github.io)

_For the demo site to work properly, you must set the "Insecure content" option to "Allow" in your browser_
[_Chrome setup
link_](https://support.google.com/chrome/answer/95617?hl=en#zippy=%2Cchoose-which-sites-can-show-insecure-content)

## Project description

### __Features__

Weather-widget is SPA for display weather for selected locations where the following features are implemented:

* Determining the current user's lactation
* Add, remove and reorder saved locations
* Displaying weather information for the selected location
* Local storage synchronization

### __Usage__

To use the widget you need to embed the following code inside "body" tag on the page

```
<weather-widget></weather-widget>
<script src="https://gregort94.github.io/assets/index-a97ce496.js"></script>
<link rel="stylesheet" href="https://gregort94.github.io/assets/index-4db90916.css">
```

### __Api__

The following public api are used in the project:

* https://openweathermap.org - obtaining weather data
* GeoDB Cities API (via rapid.api.com) - obtaining locations data

***

## Project setup

### __Environment__

The following requirements must be met in order to deploy the project:

* Node version >= 16.0.0

### __Scaffolding__

Install dependencies

```
npm install
```

Compiles and hot-reloads for development

```
npm run dev
```

Compiles and minifies for production

```
npm run build
```
