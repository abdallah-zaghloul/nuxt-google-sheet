<script setup lang="ts">
const VIDEO_URL = 'https://www.youtube.com/embed/bsRRVMXzMYA?si=HotQi0qlYkK-SDNg';
</script>

<template>
  <Card class="inner-card">
    <template #header>
      <h2 class="main-header">
        Setup and configure your own Google application
      </h2>
    </template>
    <template #header-accessory>
      <a class="video-link" target="_blank" href="">
        <i class="i-youcan-open-link"></i> Video Guide
      </a>
    </template>
    <template #default>
      <div class="card-body-grid">
        <div class="content">
          <h3 class="title">Create a new project</h3>
          <ol class="list">
            <li>
              Go to <a target="_blank" href=""> Google Console for developers </a> and create a new project
            </li>
            <li>
              Go to  <span>Library</span> → search for <span>Google sheets API</span> and click on it → click on <span>Enable</span>
            </li>
          </ol>
          <h3 class="title">Configure the Oauth Screen</h3>
          <ol class="list">
            <li>
              Back to your freshly created project home, on the sidebar click on the <span>OAuth consent screen</span> → Choose <span>External</span> → hit the <span>Create</span> button
            
            </li>
            <li>
              Fill the <span>Application name</span>
            
            </li>
            <li>
              In <span>Authorized domains</span> section → Type <span>youcan.shop</span> and press enter to add it → click on <span>SAVE</span>
            
            </li>
            <li>
              For Scopes, click on <span>Add or remove scopes</span> → Search for <span>Google sheets API</span> → enable the scope ending with <span>drive.file</span> → Save and continue till you reach the summary then click on <span>Back to dashboard</span>
            </li>
          </ol>
          <h3 class="title">Create credentials</h3>
          <ol class="list">
            <li>Back to your project home, on the sidebar click on <span>Credentials</span> → Choose Oauth client ID</li>
            <li>Select <span>Web application</span> → Fill a name</li>
            <li>In the <span>Authorized redirect URIs</span> click on <span>ADD URI</span>, put the link below and press <span>Enter</span> to add it <br>
            <a target="_blank" href="">https://seller-area.youcan.shop/admin/settings/integrations/google-app/connect/callback</a>
            </li>
            <li>Your will get your <span>Client ID</span> and your <span>Client secret</span></li>
          </ol>
          <h3 class="title">Configure your Google App in YouCan</h3>
          <ol class="list">
            <li>Fill in your <span>Google App Client ID</span> and your <span>Google App Secret key</span> in the form below</li>
            <li>Now go back to the <span>OAuth consent screen</span> and click on <span>Publish app</span> → <span>Confirm</span></li>
            <li>Go back to YouCan and click on <span>Connect account</span> →You will be directed to an <span>authorization page</span> where you need to connect your <span>Google Account</span></li>
            <li>Follow instructions in order to allow <span>youcan.shop</span> to access your <span>Google App</span></li>
          </ol>
        </div>
        <div class="video">
          <iframe width="560" height="315" :src="VIDEO_URL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.main-header {
  font-weight: 600;
  font-size: 16px;
}

.card-body-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card-body-grid .content {
  grid-column: span 2;
}

.title {
  font-weight: 600;
  margin: 0 0 10px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 20px;
  padding-inline-start: 16px;
}

.list a,
.list span {
  color: var(--brand-500);
  font-weight: 600;
}

.inner-card {
  background-color: #fcfcfc;
  border-color: #e5e5e5;
  box-shadow: unset;
}

.inner-card .main-header {
  font-size: 15px;
}

.video-link {
  font-size: 14px;
  color: var(--brand-500);
}
</style>
