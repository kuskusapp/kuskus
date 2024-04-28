import process from "node:process"
import crypto from "node:crypto"
import { createClient } from "edgedb"

const client = createClient()

type AuthConfig = {
  token_time_to_live: string
  providers: {
    name: string
    url: string | null
    secret: string | null
    client_id: string | null
  }[]
  ui: {
    redirect_to: string
    redirect_to_on_signup: string
    app_name: string
    logo_url: string
    dark_logo_url: string
    brand_color: string
  } | null
}

async function main() {
  const inquirer = (await import("inquirer")).default
  const existingConfig = await client.queryRequiredSingle<AuthConfig>(`
SELECT cfg::Config.extensions[is ext::auth::AuthConfig] {
  *,
  providers: {
    name,
    [is ext::auth::OAuthProviderConfig].*,
  },
  ui: { * },
} limit 1
  `)

  if (existingConfig.providers.length > 0) {
    console.warn(
      `Auth is already configured with the following values:
${JSON.stringify(existingConfig, null, 2)}
`,
    )
  }

  const questions = [
    {
      type: "input",
      name: "appName",
      message: "Enter the app name:",
    },
    {
      type: "input",
      name: "authSigningKey",
      message: "Enter the signing key:",
      default: crypto.randomBytes(32).toString("hex"),
      validate: (val: string) =>
        val.length >= 32 || "The key must be at least 32 bytes long",
    },
    {
      type: "input",
      name: "tokenTTL",
      message: "Enter the token time to live:",
      default: existingConfig.token_time_to_live.toString() ?? "336 hours",
    },
  ]

  const answers = await inquirer.prompt(questions)

  let query = `
    CONFIGURE CURRENT DATABASE
    RESET ext::auth::ProviderConfig;

    CONFIGURE CURRENT DATABASE
    RESET ext::auth::AuthConfig;

    CONFIGURE CURRENT DATABASE
    RESET ext::auth::UIConfig;

    CONFIGURE CURRENT DATABASE
    RESET ext::auth::SMTPConfig;

    CONFIGURE CURRENT DATABASE SET
    ext::auth::AuthConfig::auth_signing_key := '${answers.authSigningKey}';
  `

  if (answers.tokenTTL) {
    query += `
      CONFIGURE CURRENT DATABASE SET
      ext::auth::AuthConfig::token_time_to_live := <duration>'${answers.tokenTTL}';
    `
  }

  query += `
      CONFIGURE CURRENT DATABASE
      INSERT ext::auth::EmailPasswordProviderConfig {
        require_verification := false,
      };
    `

  const hostedUi = await inquirer.prompt([
    {
      type: "input",
      name: "redirectTo",
      message: "Enter the redirect URL:",
      default:
        existingConfig.ui?.redirect_to ??
        "http://localhost:3001/auth/builtin/callback",
      required: true,
    },
    {
      type: "input",
      name: "redirectToOnSignup",
      message: "Enter the redirect URL on signup:",
      default:
        existingConfig.ui?.redirect_to_on_signup ??
        "http://localhost:3001/auth/builtin/callback?isSignUp=true",
      required: false,
    },
    {
      type: "input",
      name: "brandColor",
      message: "Enter the brand color:",
      default: existingConfig.ui?.brand_color ?? "#000000",
      required: false,
    },
    {
      type: "input",
      name: "logo_url",
      message: "Enter the brand logo",
      default:
        existingConfig.ui?.logo_url ??
        "https://avatars.githubusercontent.com/u/14262913",
    },
  ])

  query += `
      CONFIGURE CURRENT DATABASE
      INSERT ext::auth::UIConfig {
        redirect_to := '${hostedUi.redirectTo}',
        redirect_to_on_signup := '${hostedUi.redirectToOnSignup ?? hostedUi.redirectTo}',
        app_name := '${answers.appName}',
        brand_color := '${hostedUi.brandColor}',
        logo_url := '${hostedUi.logo_url}',
      };
    `

  const smtpConfig = await inquirer.prompt([
    {
      type: "input",
      name: "sender",
      message: "Sender email:",
      required: true,
    },
    {
      type: "input",
      name: "host",
      message: "SMTP Host:",
      default: "localhost",
      required: true,
    },
    {
      type: "number",
      name: "port",
      message: "SMTP Port:",
      default: 1025,
      required: true,
    },
    {
      type: "input",
      name: "username",
      message: "SMTP Username:",
    },
    {
      type: "input",
      name: "password",
      message: "SMTP Password:",
    },
  ])
  query += `
      CONFIGURE CURRENT DATABASE SET
      ext::auth::SMTPConfig::sender := '${smtpConfig.sender}';

      CONFIGURE CURRENT DATABASE SET
      ext::auth::SMTPConfig::host := '${smtpConfig.host}';

      CONFIGURE CURRENT DATABASE SET
      ext::auth::SMTPConfig::port := <int32>${smtpConfig.port};

      CONFIGURE CURRENT DATABASE SET
      ext::auth::SMTPConfig::username := '${smtpConfig.username}';

      CONFIGURE CURRENT DATABASE SET
      ext::auth::SMTPConfig::password := '${smtpConfig.password}';

      CONFIGURE CURRENT DATABASE SET
      ext::auth::SMTPConfig::security := 'TLS';

      CONFIGURE CURRENT DATABASE SET
      ext::auth::SMTPConfig::validate_certs := false;
    `

  console.log("The following query will be executed:\n", query)
  const confirm = await inquirer.prompt({
    type: "confirm",
    name: "execute",
    message: "Do you want to execute this query?",
  })

  if (confirm.execute) {
    await client.execute(query)
  } else {
    return
  }
}

main()
  .then(() => process.exit(0))
  .catch((err: Error) => {
    console.error(err)
    process.exit(1)
  })
