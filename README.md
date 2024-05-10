# Google Sheet Embedded App Using nuxt

## How to run the project:

### Requirements:
- See the requirements page: https://developer.youcan.shop/apps/embedded_app/getstarted#requirements
- Runing MySQL server: starting from version 5.7.8 (recomended latest)

### Getting Started 🚀:
- Clone the repo
- Create empty MYSQL database
- Copy `.env.example` into a `.env` file and fill its own values
- `cd` into the project
- Run `pnpm install` to install the dependencies
- Run `youcan auth login` to authenticate with YouCan
- Run `pnpm prisma migrate dev` to generate the database and its tables
- Run `youcan app install` to install the app on your dev store.
- Run `pnpm dev` to start the project and sync your settings with your partners app settings

## Description:
  youcan google sheet is a partner embedded app utilize
  google service and youcan service to: 
  <br>
  create, update, delete, sync orders
  to the parner Google Spread Sheets using its own OAuth2 Credentials

### MVP Demo
[![MVP demo](https://img.youtube.com/vi/j6bQNpoOLts/0.jpg)](https://youtu.be/j6bQNpoOLts)

## Infra-structure

### Backend ("/server" dir):
#### - Composables : App Logic (auto-imported)
- Service Layer : Bussiness logic
- Repository Layer : DB logic
#### - Utils : Helpers (auto-imported)
- Types
- Validator
- Schemas : Validation Schemas
- Handler : (Response, Async, Sync, Catcher) and Error Handling
#### - Routes : Dir Based Routes
  
<img src="https://github.com/abdallah-zaghloul/nuxt-google-sheet/assets/61375797/8ae26b37-e958-427c-8330-ba9de60edfa5" width="400">

### Frontend ("/" root dir):
#### SSR based
- Assets: Css
- Components
- Composables : Reusable Logic
- Layouts
- Pages
- Public: static Imgs
- Types

<br>
<img src="https://github.com/eihabkhan1/nuxt-google-sheet/assets/143792300/fb275cba-0002-42bb-bed7-6eafc2b610a0" width="400">
<br>
<img src="https://github.com/abdallah-zaghloul/nuxt-google-sheet/assets/61375797/acc5a924-4217-4d6c-a6ac-8ba97d175b60" width="400">


## Request Cycle:
both frontend and backend is decoupled
- frontend: based on nuxt
- backend: based on nitroJS
- they can be (separated/attached at same time) :
  - separated to microServices
  - attached and share something like:
    error state (useError, sendError)
    acc to the below pic  
  
<img src="https://github.com/abdallah-zaghloul/nuxt-google-sheet/assets/61375797/19a79135-94fd-4e87-9bdd-834c27ab7223" width="400">

## Response Shape :
same as nuxt response 

```
{
  "statusCode": number,
  "statusMessage": string,
  "data": any,
  "stack": [] //error stack empty if debug is disabled
}
```
available Status/Http codes:
- 422: unprocessable entity (validation)
- 404: not found
- 200: success
- 500: internal server (global error)
