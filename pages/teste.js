<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HodlCoin - Miniapp</title>
    <style>
        :root {
            --bg-color: #121212;
            --primary-color: #00BFFF; /* Azul claro para modernidade */
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
            width: 150px; /* Ajuste o tamanho conforme necessário */
            max-width: 80%; /* Para não estourar em telas menores */
            height: auto;
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

        .service-button img {
            height: 24px; /* Altura padrão para os logos nos botões */
            margin-right: 10px;
        }

        .service-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 191, 255, 0.2);
        }

        .social-media {
            margin-top: auto; /* Empurra para o final da página */
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
            width: 36px; /* Largura para os logos sociais */
            height: auto;
            margin-bottom: 5px;
            transition: transform 0.2s;
        }

        .social-link:hover .social-icon {
            transform: scale(1.2);
        }
    </style>
</head>
<body>

    <img src="/logo.png" alt="Logo HodlCoin" class="logo">

    <div class="button-section">
        <a href="https://fundocrypto.vercel.app/..." class="service-button">
            <img src="/carteira.png" alt="Carteira" style="height: 24px; margin-right: 10px;"> FUNDO CRYPTO
        </a>
        <a href="https://hodlcoin.vercel.app/pix" class="service-button">
            <img src="/pix.png" alt="Pix" style="height: 24px; margin-right: 10px;"> COMPRE COM PIX
        </a>
    </div>

    <div class="social-media">
        <p class="social-media-title">Nossas Redes</p>
        <div class="social-media-links">
            <a href="https://t.me/+x8EDDJAWO2YwODVh" class="social-link" target="_blank">
                <img src="/telegram.png" alt="Telegram" class="social-icon">
                Telegram
            </a>
            <a href="https://x.com/hodlcoin_bnb" class="social-link" target="_blank">
                <img src="/x.png" alt="X" class="social-icon">
                X
            </a>
        </div>
    </div>

</body>
</html>
