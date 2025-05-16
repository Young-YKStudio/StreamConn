let callbackURL = `${process.env.APP_URL}`

// TODO: add nickname to the following email
export const ForgotPasswordEmail = (id, token) => {
  let resetUrl = `${process.env.APP_URL}/resetPassword/${id}/${token}`
  return `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="mail-container" style="width: 100%; background-color: #fdfdfd;">
      <div
        style="
          min-width: 400px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          border: 1px solid lightgray;
          background-color: white;
          margin: 2em auto;
          padding: 1em 3em;
          border-radius: 5px;
        "
      >
      <div style="margin-top: 1em;">
        <h3>Stream Connect</h3>
      </div>
        <h1
          style="
            font-family: roboto;
            font-weight: bold;
            color: darkgreen;
            margin-bottom: 1em;
            margin-top: 1em;
          "
        >
          Password Reset Request
        </h1>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          You have requested a password reset.<br />
          Please go to this link to reset your password<br />
        </p>
        <a href="${resetUrl}" target='_blank'>Reset Your Password</a>

        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          Thank you, <br />
          <span style="color: darkgreen; font-weight: bold; line-height: 3em;"
            >Stream Connect</span
          >
        </p>
      </div>
      <div
        style="
          min-width: 400px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          margin: 0em 2em;
          padding: 1em 2em;
          text-align: center;
          font-family: roboto;
          margin: 0 auto;
        "
      >
        <p style="font-size: 0.75em; color: gray;">
          This email was sent to {customer nickname} to update you about
          resetting password in
          <a
            href=${callbackURL}
            style="text-decoration: none; color: #dc5a41;"
            >streamconn.com</a
          >
          <br />
          Qeustions, comments, and support for Sushiville are available to
          <a
            href="mailto: info@streamconn.com"
            style="text-decoration: none; color: #dc5a41;"
            >info@streamconn.com</a
          >
        </p>
      </div>
    </div>

  </body>
  `
}

export const resettedPassword = (nickname) => {
  return `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="mail-container" style="width: 100%; background-color: #fdfdfd;">
      <div
        style="
          min-width: 400px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          border: 1px solid lightgray;
          background-color: white;
          margin: 2em auto;
          padding: 1em 3em;
          border-radius: 5px;
        "
      >
      <div style="margin-top: 1em;">
        <h3>Stream Connect</h3>
      </div>
        <h1
          style="
            font-family: roboto;
            font-weight: bold;
            color: darkgreen;
            margin-bottom: 1em;
            margin-top: 1em;
          "
        >
          Your password has been updated
        </h1>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          If you haven't requested or changed your password,<br />
          please contact Stream Connect service immediately.<br />
        </p>
        <a href="${callbackURL}" target='_blank'>Stream Connect</a>

        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          Thank you, <br />
          <span style="color: darkgreen; font-weight: bold; line-height: 3em;"
            >Stream Connect</span
          >
        </p>
      </div>
      <div
        style="
          min-width: 400px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          margin: 0em 2em;
          padding: 1em 2em;
          text-align: center;
          font-family: roboto;
          margin: 0 auto;
        "
      >
        <p style="font-size: 0.75em; color: gray;">
          This email was sent to ${nickname} to update you about
          resetting password in
          <a
            href=${callbackURL}
            style="text-decoration: none; color: #dc5a41;"
            >streamconn.com</a
          >
          <br />
          Qeustions, comments, and support for Sushiville are available to
          <a
            href="mailto: info@streamconn.com"
            style="text-decoration: none; color: #dc5a41;"
            >info@streamconn.com</a
          >
        </p>
      </div>
    </div>

  </body>
  `
}