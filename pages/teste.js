import Head from 'next/head';

const TestePage = () => {
  return (
    <>
      <Head>
        <title>HodlCoin - Miniapp</title>
      </Head>

      <style jsx global>{`
        :root {
            --bg-color: #121212;
            --primary-color: #00BFFF;
            --text-color: #E0E0E0;
            --button-bg-color: #212121;
            --button-border-color: #333333;
            --font-family: 'Segoe UI', Roboto, sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-family);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            text-align: center;
        }

        .logo {
            width: 150px;
            margin-bottom: 40px;
        }

        .button-section {
            width: 100%;
            max-width: 400px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .service-button {
            background-color: var(--button-bg-color);
            border: 1px solid var(--button-border-color);
            color: var(--text-color);
            padding: 20px;
            border-radius: 15px;
            font-size: 1.2em;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .service-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 191, 255, 0.2);
        }

        .emoji {
            font-size: 1.5em;
            margin-right: 10px;
        }

        .social-media {
            margin-top: auto;
            width: 100%;
            max-width: 400px;
            padding-top: 50px;
        }

        .social-media-title {
            font-size: 1.4em;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .social-media-links {
            display: flex;
            justify-content: center;
            gap: 30px;
        }

        .social-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: var(--text-color);
            font-weight: 500;
        }

        .social-icon {
            font-size: 2em;
            margin-bottom: 5px;
            transition: transform 0.2s;
        }

        .social-link:hover .social-icon {
            transform: scale(1.2);
        }
      `}</style>
      
      <body>
        <img src="/logo.png" alt="Logo HodlCoin" className="logo" />

        <div className="button-section">
          <a href="#" className="service-button">
            <span className="emoji">💰</span> FUNDO CRYPTO
          </a>
        </div>

        <div className="social-media">
          <p className="social-media-title">Nossas Redes</p>
          <div className="social-media-links">
            <a href="https://t.me/+x8EDDJAWO2YwODVh" className="social-link" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">✈️</span>
              Telegram
            </a>
            <a href="https://x.com/hodlcoin_bnb" className="social-link" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">✖️</span>
              X
            </a>
          </div>
        </div>
      </body>
    </>
  );
};

export default TestePage;
