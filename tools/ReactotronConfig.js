import Reactotron from "reactotron-react-native";
import { NativeModules } from 'react-native'

export function configure() {
  configureReactotron();
  connectConsoleToReactotron();
}

function configureReactotron() {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = scriptURL.split("://")[1].split(":")[0];
    Reactotron.configure({
      name: "League of Legends",
      host: scriptHostname,
    })
    .useReactNative()
    .connect();  
  // clear log on start
  Reactotron.clear();
}

function connectConsoleToReactotron() {
  console.log = log;
}

function log(message, ...args) {
  Reactotron.display({
    name: "LOG",
    preview: message,
    value: { message, args },
  });
}