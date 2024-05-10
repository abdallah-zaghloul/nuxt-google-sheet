# Google Sheet Embedded App Using nuxt
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

<img src="https://github.com/abdallah-zaghloul/nuxt-google-sheet/assets/61375797/acc5a924-4217-4d6c-a6ac-8ba97d175b60" width="400">


## Request Cycle:
both frontend and backend is decoupled
- frontend: based on nuxt
- backend: based on nitroJS
- they can be (separated/attached at same time) :
  - separated to microServices
  - attached and share something like:
    error state: useError, sendError
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

## How to run the project:

### requirements:
- nodeJs +V 18
- pnpm package manager
- mysql 8.0
- youcan CLI

### steps:
- should have a configured youcan partner app
  acc to this [instructions](https://developer.youcan.shop/apps/theme_extension/getstarted#set-up-youcan-cli)
- copy .env.example & fill its variables
- ```pnpm install```
- ```youcan auth login```
- ```pnpm prisma migrate dev```
- ```pnpm dev```