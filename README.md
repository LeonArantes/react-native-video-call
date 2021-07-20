<h1 align="center">
  <div>
    <img src="./assets/video-call-icon.png" alt="Logomaker Video Call"  width="355" height="355">
  </div>
  <strong>
    React Native - Video Call
  </strong>
<br>
<br>

</h1>

<br>

<p>

Este projeto é um aplicativo de Video chamadas desenvolvido em React Native. O app conta com um backend na qual necessito conectar com a api de vídeo, e a parte mobile que de fato é o app na qual utilizei typescript. Para o backend do App utilizei a api de vídeo do [Twilio](https://www.twilio.com/) para ficar responsável pelas conexões dos dispositivos fazendo assim permitir a ligação de vídeo em tempo real. Cada chamada comporta até no máximo 50 usuários, possui uma ótima entrada e saída de áudio.
</p>

<br>

## Funcionalidades

- Criar Chamadas
- Permite a troca de cameras (frontal e traseira)
- Permite alterar qual das cameras ficará fixada em tela cheia
- Permite movimentar a miniatura da camera que fica flutuando nos cantos da tela
- Permite Ligar e desligar o microfone quando bem entender
- Encerramento da chamada

<br>
<br>

# Demonstração

<br>

[![Laroca Immobiliare](assets/video-call-preview.png)](https://vimeo.com/577112488)

<br>

___

# Como utilizar o projeto ?

<br>

## Clone o projeto

```
  git clone https://github.com/LeonArantes/react-native-video-call.git
```

<br>

## Setup e inicialização da API

Será preciso criar uma conta na [Twilio](https://www.twilio.com/) para utilizar a api de vídeo.
Crie a conta e adicione no arquivo backend/.env os seguintes campos

```
ACCOUNT_SID=XXXXXXXXXXXXXXXX
API_KEY_SID=XXXXXXXXXXXXXXXX
API_KEY_SECRET=XXXXXXXXXXXXX
```

```
  cd backend/ 
```

```
  npm install 
```

```
  npm run dev
```

<br>

## Setup e inicialização da Aplicativo

```
  cd mobile
```

```
  npm install 
```

```
  cd ios && pod install
```

```
  npx react-native run-android || npx react-native run-ios
```

___
