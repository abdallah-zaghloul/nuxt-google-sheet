<script setup lang="ts">

</script>

<template>

  <div class="outer-block-body">
    <div class="google-sheet-block">
      <div class="is-grid grid-1">
        <div class="inner-block has-padding">
          <div class="block-header">
            <div class="block-title"><h2>Setup and configure your own Google application</h2></div>
            <div class="block-actions">
              <div class="block-action"><a href="https://www.youtube.com/watch?v=bsRRVMXzMYA" target="_blank"><i
                  class="yc yc-external-link"></i>
                Video guide
              </a></div>
            </div>
          </div>
          <div class="block-content is-grid grid-3">
            <div class="content"><h4 class="guide-title">Create a new project</h4>
              <ul class="guide-list">
                <li>Go to <a href="https://console.developers.google.com">Google Console for developers</a> and create a
                  new project
                </li>
                <li>Go to <span>Library</span> → search for <span>google sheets api</span> and click on it → click on
                  <span>Enable</span></li>
              </ul>
              <h4 class="guide-title">Configure the Oauth Screen</h4>
              <ul class="guide-list">
                <li>Back to your freshly created project home, on the sidebar click on the
                  <span>OAuth consent screen</span> → Choose <span>External</span> → hit the <span>create</span> button
                </li>
                <li>Fill the <span>Application name</span></li>
                <li>In <span>Authorized domains</span> section → Type <span>youcan.shop</span> and press enter to add it
                  → click on <span>SAVE</span></li>
                <li>For Scopes, click on <span>Add or remove scopes</span> → Search for <span>google sheets API</span> →
                  enable the scope ending with <span>drive.file</span> → Save and continue till you reach the summary
                  then click on <span>Back to dashboard</span></li>
              </ul>
              <h4 class="guide-title">Create credentials</h4>
              <ul class="guide-list">
                <li>Back to your project home, on the sidebar click on <span>Credentials</span> → Choose Oauth client ID
                </li>
                <li>Select <span>Web application</span> → Fill a name</li>
                <li>In the <span>Authorized redirect URIs</span> click on <span>ADD URI</span>, put the link below and
                  press <span>Enter</span> to add it <br> <span>https://seller-area.youcan.shop/admin/settings/integrations/google-app/connect/callback</span>
                </li>
                <li>Your will get your <span>client ID</span> and your <span>client secret</span></li>
              </ul>
              <h4 class="guide-title">Configure your Google App in YouCan</h4>
              <ul class="guide-list">
                <li>Fill in your <span>Google App Client ID</span> and your <span>Google App Secret key</span> in the
                  form below
                </li>
                <li>Now go back to the <span>OAuth consent screen</span> and click on <span>Publish app</span> → <span>Confirm</span>
                </li>
                <li>Go back to YouCan and click on <span>Connect account</span> →You will be directed to an <span>authorization page</span>
                  where you need to connect your <span>Google Account</span></li>
                <li>Follow instructions in order to allow <span>youcan.shop</span> to access your
                  <span>Google App</span></li>
              </ul>
            </div>
            <div class="app-video">
              <iframe src="https://www.youtube.com/embed/bsRRVMXzMYA" width="554" height="300" frameborder="0"
                      allow="gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            </div>
          </div>
        </div>
        <div class="inner-block has-padding">
          <form action="https://seller-area.youcan.shop/admin/apps/googlesheet/google-apps/connect" method="POST"><input
              type="hidden" name="_token" value="PdXkhrhnzftgWqNFVJ6xzQxySZMWpZeameDcBbCF">
            <div class="block-content">
              <div class="is-grid grid-2">
                <div class="form-group"><label class="form-label">Google App Client ID</label> <input type="text"
                                                                                                      name="google_app_settings[client_id]"
                                                                                                      placeholder="Client ID"
                                                                                                      value="886928372155-o6v47q96b8n45bhegntj0p5rptgvl5u8.apps.googleusercontent.com">
                </div>
                <div class="form-group"><label class="form-label">Google App Secret key</label> <input type="text"
                                                                                                       name="google_app_settings[client_secret]"
                                                                                                       placeholder="Client Secret Key"
                                                                                                       value="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">
                </div>
              </div>
            </div>
            <div class="block-footer">
              <div class="block-title"></div>
              <div class="block-actions">
                <button type="submit" class="button primary-button"><i class="yc yc-log-in"></i>
                  Connect account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>