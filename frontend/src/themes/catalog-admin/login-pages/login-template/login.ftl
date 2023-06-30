<#import "layout.ftl" as layout>
<@layout.registrationLayout title=msg("doLogIn"); section >
    <#if section = 'scripts'>
        <script type="text/javascript">
            var pageProps = {
                loginEnabled: ${realm.password?string},
                loginAction: "${url.loginAction?no_esc}",
                <#if usernameEditEnabled??>
                    usernameEditEnabled: true,
                <#else>
                    usernameEditEnabled: false,
                </#if>
                <#if !realm.loginWithEmailAllowed>
                    usernameLabel: "${msg("username")}",
                <#elseif !realm.registrationEmailAsUsername>
                    usernameLabel: "${msg("usernameOrEmail")}",
                <#else>
                    usernameLabel: "${msg("email")}",
                </#if>
                usernameValue: "${(login.username!'')}",
                passwordLabel: "${msg("password")}",
                enabledRememberMe: ${realm.rememberMe?string},
                <#if login.rememberMe??>
                    enabledLoginRememberMe: ${login.rememberMe?string},
                </#if>
                rememberMeLabel: "${msg("rememberMe")}",
                resetPasswordAllowed: ${realm.resetPasswordAllowed?string},
                resetPasswordUrl: "${url.loginResetCredentialsUrl}",
                resetPasswordLabel: "${msg("doForgotPassword")}",
                <#if auth.selectedCredential?has_content>
                    selectedCredential: "${auth.selectedCredential}",
                </#if>
                <#if realm.password && social.providers??>
                    socialProviders: [
                        <#list social.providers as p>
                            {
                                loginUrl: "${p.loginUrl?no_esc}",
                                alias: "${p.alias}",
                                providerId: "${p.providerId}",
                                displayName: "${p.displayName}",
                            },
                        </#list>
                    ],
                </#if>
            }
        </script>
        <%= htmlWebpackPlugin.tags.headTags  %>
    </#if>
</@layout.registrationLayout >