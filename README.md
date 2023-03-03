# Weather-widget

> Stack: Vue 3, Typescript, Vite, Pinia(store), Composition API, Vuetify, Tailwind.css

## Project description

### __Features__

Weather-widget is SPA for display weather for selected locations where the following features are implemented:

* Determining the current user's lactation
* Add, remove and reorder saved locations
* Displaying weather information for the selected location
* Local storage synchronization

### __Usage__

To use the widget you need to embed the following code on the page

```
<weather-widget ></weather-widget>
<script src="${path-to-js}"></script>
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
